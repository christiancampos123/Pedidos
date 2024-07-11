module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-return-controller.js')
  const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  router.post('/', [authCustomerJwt.verifyCustomerToken], controller.create)

  app.use('/api/customer/sale-return', router)
}