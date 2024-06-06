module.exports = function (sequelize, DataTypes) {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "UUID".'
        },
        isUUID: {
          args: 4, // Version 4 UUID
          msg: 'Por favor, proporciona un UUID válido (versión 4).'
        }
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Por favor, proporciona un valor entero para "ID del cliente".'
        }
      }
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Por favor, proporciona un valor entero para "ID de la huella digital".'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'carts',
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
        name: 'cart_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'cart_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      }
    ]
  })

  Cart.associate = function (models) {
    Cart.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Cart.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })

    // one
    Cart.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'cartId' })
    Cart.hasMany(models.SaleError, { as: 'saleErrors', foreignKey: 'cartId' })
    Cart.hasOne(models.Sale, { as: 'sale', foreignKey: 'cartId' })
    Cart.belongsToMany(models.Product, { through: models.CartDetail, as: 'products', foreignKey: 'cartId' })
  }

  return Cart
}
