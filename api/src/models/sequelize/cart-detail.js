module.exports = function (sequelize, DataTypes) {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID del carrito".'
        }
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID del producto".'
        }
      }
    },
    localeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID del idioma".'
        }
      }
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID del precio".'
        }
      }
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "ID del impuesto".'
        }
      }
    },
    priceDiscountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Por favor, introduce un valor entero para "ID del descuento de precio".'
        }
      }
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Nombre del producto".'
        }
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Precio base".'
        }
      }
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2),
      validate: {
        isDecimal: {
          msg: 'Por favor, introduce un valor decimal para "Precio del impuesto".'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Cantidad".'
        },
        isInt: {
          msg: 'Por favor, introduce un valor entero para "Cantidad".'
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
    tableName: 'cart_details',
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
        name: 'cart_details_cartId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'cart_details_productId_fk',
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'cart_details_localeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'cart_details_priceId_fk',
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'cart_details_taxId_fk',
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      }
    ]
  })

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId' })
    CartDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    CartDetail.belongsTo(models.Locale, { as: 'locale', foreignKey: 'localeId' })
    CartDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
    CartDetail.belongsTo(models.PriceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId' })
    CartDetail.belongsTo(models.Tax, { as: 'tax', foreignKey: 'taxId' })
  }

  return CartDetail
}
