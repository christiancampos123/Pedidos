module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/admin/customer-controller.js')
  // const authCookie = require('../middlewares/auth-cookie.js')

  router.post('/', controller.create)
  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.delete)

  app.use('/api/admin/customers', router)
}
