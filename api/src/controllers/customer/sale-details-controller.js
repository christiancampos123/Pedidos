const sequelizeDb = require('../../models/sequelize');
const SaleDetail = sequelizeDb.SaleDetail;
const SaleReturn = sequelizeDb.SaleReturn;
const Op = sequelizeDb.Sequelize.Op;

exports.findAll = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.size) || 10;
  const offset = (page - 1) * limit;
  const whereStatement = {};

  if (req.query.id) {
    whereStatement.saleId = req.query.id;
  }

  try {
    const saleDetails = await SaleDetail.findAndCountAll({
      where: whereStatement,
      attributes: ['id', 'productName', 'basePrice', 'quantity', 'createdAt', 'updatedAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const saleId = req.query.id;

    const saleReturnExists = await SaleReturn.findOne({
      where: { saleId }
    });

    const result = {
      ...saleDetails,
      saleReturnExists: saleReturnExists !== null
    };

    result.meta = {
      total: saleDetails.count,
      pages: Math.ceil(saleDetails.count / limit),
      currentPage: page,
      size: limit
    };

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    });
  }
};
