module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-details-controller.js')

  router.get('/', controller.findAll)

  app.use('/api/customer/sale-details', router)
}