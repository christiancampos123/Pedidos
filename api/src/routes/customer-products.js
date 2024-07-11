module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/product-controller.js')
  const authCustomerJwt = require('../middlewares/auth-customer-jwt.js')
  // const authCookie = require('../middlewares/auth-cookie.js')

  router.get('/',[authCustomerJwt.verifyCustomerToken], controller.findAll)

  app.use('/api/customer/products', router)
}
