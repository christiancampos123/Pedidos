module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-controller.js')

  router.post('/', controller.create)
  router.get('/', controller.findAll)

  app.use('/api/customer/sales', router)
}