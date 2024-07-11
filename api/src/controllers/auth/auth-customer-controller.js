const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')
const jwt = require('jsonwebtoken')
const CustomerCredential = sequelizeDb.CustomerCredential

exports.signin = async (req, res) => {
  console.log("entro signin")
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacios.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(req.body.email)) {
      return res.status(400).send({ message: 'La dirección de correo electrónico no es válida.' })
    }

    const data = await CustomerCredential.findOne({
      where: {
        email: req.body.email,
        deletedAt: null
      }
    })

    if (!data) {
      return res.status(404).send({ message: 'Usuario o contraseña incorrectaa' })
    }

    console.log("pass", req.body.password)

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    )

    // si peta coment
    if (!passwordIsValid) {
      return res.status(404).send({
        message: 'Usuario o contraseña incorrecta'
      })
    }

    // req.session.Customer = { id: data.id, admin: true }

    // const customer = await CustomerStaff.findByPk(customerStaffCredential.customerStaffId)

    const token = jwt.sign({ customerId: data.customerId, type: 'customer' }, process.env.JWT_SECRET, {
      expiresIn: 86400
    })

    res.status(200).send({
      customerAccessToken: token,
      redirection: '/cliente'
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  }
}

exports.checkSignin = (req, res) => {
  if (req.session.Customer) {
    res.status(200).send({
      redirection: '/cliente'
    })
  } else {
    res.status(401).send({
      redirection: '/cliente/login'
    })
  }
}

exports.reset = async (req, res) => {
  CustomerCredential.findOne({
    where: {
      email: req.body.email,
      deletedAt: null
    }
  }).then(async data => {
    if (!data) {
      return res.status(404).send({ message: 'Usuario no encontrado' })
    }

    await req.authorizationService.createResetPasswordToken(data.id, 'customer')

    res.status(200).send({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' })
  }).catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  })
}
