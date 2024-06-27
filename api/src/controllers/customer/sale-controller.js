const sequelizeDb = require('../../models/sequelize');
const Product = sequelizeDb.Product;
const Sale = sequelizeDb.Sale;
const SaleDetail = sequelizeDb.SaleDetail;
const Op = sequelizeDb.Sequelize.Op;

exports.findAll = (req, res) => {
  const page = req.query.page || 1;
  const limit = 100000;
  const offset = (page - 1) * limit;
  const whereStatement = {};

  for (const key in req.query) {
    if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] };
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {};

  Sale.findAndCountAll({
    where: condition,
    attributes: ['id', 'reference', 'totalBasePrice', 'saleDate', 'saleTime', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page,
        size: limit
      };

      res.status(200).send(result);
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      });
    });
};

exports.create = async (req, res) => {
  try {
    if (req.body.products.length === 0) {
      return res.status(400).send({
        message: "no hay productos"
      });
    }

    // Utilizar map para obtener los IDs de los productos
    const productIds = req.body.products.map(product => product.id);

    // Buscar todos los productos donde el id está en la array productIds
    let products = await Product.findAll({
      where: {
        id: productIds
      },
      include: [
        {
          attributes: ['id', 'basePrice', 'deletedAt'],
          model: sequelizeDb.Price,
          as: 'price'
        }
      ]
    });

    // Calcular el total para cada producto y agregar la cantidad a los datos del producto
    products = products.map(product => {
      const quantity = req.body.products.find(p => p.id === product.id).quantity;
      product.dataValues.quantity = quantity;
      return product;
    });

    // Calcular el total de todos los productos
    let totalBasePrice = products.reduce((acc, product) => {
      const price = product.price.basePrice;
      const quantity = product.dataValues.quantity;
      return acc + (price * quantity);
    }, 0);
    totalBasePrice = totalBasePrice.toFixed(2);

    const currentDateTime = new Date();
    const currentDateString = currentDateTime.toISOString().slice(0, 10).replace(/-/g, ''); // Remover guiones de la fecha

    // Obtener la última referencia de la base de datos
    const lastSale = await Sale.findOne({
      order: [['createdAt', 'DESC']]
    });

    let newReference;
    if (lastSale) {
      const lastReference = lastSale.reference;
      const lastDateString = lastReference.slice(0, 8); // Ajustar para comparar sin guiones
      let lastSequenceNumber = parseInt(lastReference.slice(8));

      if (currentDateString === lastDateString) {
        lastSequenceNumber += 1;
      } else {
        lastSequenceNumber = 1;
      }

      newReference = `${currentDateString}${String(lastSequenceNumber).padStart(4, '0')}`;
    } else {
      newReference = `${currentDateString}0001`;
    }

    const saleData = {
      customerId: 1,
      reference: newReference,
      totalBasePrice: parseFloat(totalBasePrice).toFixed(2),
      saleDate: currentDateString,
      saleTime: currentDateTime.toTimeString().slice(0, 8)
    };

    const sale = await Sale.create(saleData);

    // Crear los detalles de la venta
    const saleDetailsData = products.map(product => {
      return {
        saleId: sale.id,
        productId: product.id,
        priceId: product.price.id,
        productName: product.name,
        basePrice: product.price.basePrice,
        quantity: product.dataValues.quantity
      };
    });

    // Insertar cada detalle de venta individualmente
    await SaleDetail.bulkCreate(saleDetailsData);

    res.status(201).send(sale);

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while creating the sale' });
  }
};
