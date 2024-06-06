const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Fingerprint = sequelize.define('Fingerprint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Por favor, proporciona un valor entero válido para el ID del cliente.' },
        notNull: { msg: 'El ID del cliente no puede ser nulo.' }
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Por favor, proporciona un valor entero válido para el ID de la ciudad.' },
        notNull: { msg: 'El ID de la ciudad no puede ser nulo.' }
      }
    },
    fingerprint: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La huella digital no puede estar vacía.' },
        notNull: { msg: 'La huella digital no puede ser nula.' }
      }
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El navegador no puede estar vacío.' },
        notNull: { msg: 'El navegador no puede ser nulo.' }
      }
    },
    browserVersion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La versión del navegador no puede estar vacía.' },
        notNull: { msg: 'La versión del navegador no puede ser nula.' }
      }
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El sistema operativo no puede estar vacío.' },
        notNull: { msg: 'El sistema operativo no puede ser nulo.' }
      }
    },
    osVersion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La versión del sistema operativo no puede estar vacía.' },
        notNull: { msg: 'La versión del sistema operativo no puede ser nula.' }
      }
    },
    screenHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Por favor, proporciona un valor entero válido para la altura de la pantalla.' },
        notNull: { msg: 'La altura de la pantalla no puede ser nula.' }
      }
    },
    screenWidth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Por favor, proporciona un valor entero válido para el ancho de la pantalla.' },
        notNull: { msg: 'El ancho de la pantalla no puede ser nulo.' }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt') ? this.getDataValue('createdAt').toISOString().split('T')[0] : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt') ? this.getDataValue('updatedAt').toISOString().split('T')[0] : null
      }
    }
  }, {
    sequelize,
    tableName: 'fingerprints',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'fingerprints_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'fingerprints_cityId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cityId' }
        ]
      }
    ]
  })

  Fingerprint.associate = function (models) {
    Fingerprint.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Fingerprint.belongsTo(models.City, { as: 'City', foreignKey: 'cityId' })

    Fingerprint.hasMany(models.ApiTracking, { as: 'apiTrackings', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.Cart, { as: 'carts', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.Contact, { as: 'contacts', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'fingerprintId' })
  }

  return Fingerprint
}
