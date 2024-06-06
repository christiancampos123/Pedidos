module.exports = function (sequelize, DataTypes) {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    percentage: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,
        min: 0,
        max: 100
      }
    },
    multiplier: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    current: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[0, 1, true, false]],
          msg: 'El campo "Actual" debe ser un valor booleano.'
        }
      }
    },
    startsAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    endsAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
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
    tableName: 'coupons',
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
      }
    ]
  })

  Coupon.associate = function (models) {
    Coupon.hasMany(models.Sale, { as: 'sales', foreignKey: 'couponId' })
  }

  return Coupon
}
