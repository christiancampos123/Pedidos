const sequelizeDb = require('../../models/sequelize');
const SaleReturn = sequelizeDb.SaleReturn;

exports.create = async (req, res) => {
  console.log(req.body)
  try {
    const { saleId, customerId, totalBasePrice } = req.body;

    const currentDateTime = new Date();
    const currentDateString = currentDateTime.toISOString().slice(0, 10).replace(/-/g, '');

    const lastSaleReturn = await SaleReturn.findOne({
      order: [['createdAt', 'DESC']]
    });

    let newReference = ''

    if (lastSaleReturn) {
      const lastReference = lastSaleReturn.reference;
      const lastDateString = lastReference.slice(0, 8);
      let lastSequenceNumber = parseInt(lastReference.slice(8), 10);

      if (currentDateString === lastDateString) {
        lastSequenceNumber += 1;
      } else {
        lastSequenceNumber = 1;
      }

      newReference = `${currentDateString}${String(lastSequenceNumber).padStart(4, '0')}`;
    } else {
      newReference = `${currentDateString}0001`;
    }

    const saleReturnData = {
      saleId,
      customerId: 1,
      reference: newReference,
      totalBasePrice: parseFloat(totalBasePrice),
      returnDate: currentDateString,
      returnTime: currentDateTime.toTimeString().slice(0, 8)
    };

    const saleReturn = await SaleReturn.create(saleReturnData);

    res.status(201).send(saleReturn);

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while creating the sale return' });
  }
};
