module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-controller.js')
  const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  router.post('/', [authCustomerJwt.verifyCustomerToken], controller.create)
  router.get('/', [authCustomerJwt.verifyCustomerToken], controller.findAll)

  app.use('/api/customer/sales', router)
}