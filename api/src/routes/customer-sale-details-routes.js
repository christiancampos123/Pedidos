module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-details-controller.js')
  const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  router.get('/', [authCustomerJwt.verifyCustomerToken], controller.findAll)

  app.use('/api/customer/sale-details', router)
}