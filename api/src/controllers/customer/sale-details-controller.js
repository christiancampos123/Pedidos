const sequelizeDb = require('../../models/sequelize');
const SaleDetail = sequelizeDb.SaleDetail;
const Op = sequelizeDb.Sequelize.Op;

exports.findAll = (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.size) || 10;
  const offset = (page - 1) * limit;
  const whereStatement = {};
  console.log(req.query.id)

  // Verificar si se proporcionó el parámetro 'id'
  if (req.query.id) {
    whereStatement.saleId = req.query.id;
  }

  SaleDetail.findAndCountAll({
    where: whereStatement,
    attributes: ['id', 'productName', 'basePrice', 'quantity', 'createdAt', 'updatedAt'],
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
      console.error(err);
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      });
    });
};
