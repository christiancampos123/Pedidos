module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/product-controller.js')
  // const authCookie = require('../middlewares/auth-cookie.js')

  router.get('/', controller.findAll)

  app.use('/api/customer/products', router)
}
