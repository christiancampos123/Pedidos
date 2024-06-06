module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/admin/user-controller.js')
  const authCookie = require('../middlewares/auth-cookie.js')

  router.post('/', [authCookie.verifyUserCookie], controller.create)
  router.get('/', [authCookie.verifyUserCookie], controller.findAll)
  router.get('/:id', [authCookie.verifyUserCookie], controller.findOne)
  router.put('/:id', [authCookie.verifyUserCookie], controller.update)
  router.delete('/:id', [authCookie.verifyUserCookie], controller.delete)

  app.use('/api/admin/users', router)
}
