module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-return-controller.js')

  router.post('/', controller.create)

  app.use('/api/customer/sale-return', router)
}