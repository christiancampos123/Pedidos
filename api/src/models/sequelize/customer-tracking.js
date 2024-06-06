const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const CustomerTracking = sequelize.define('CustomerTracking', {
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
        isInt: true,
        notNull: true
      }
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    eventTime: {
      type: DataTypes.DOUBLE,
      validate: {
        isNumeric: true
      }
    },
    eventName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    path: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
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
    tableName: 'customer_trackings',
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
        name: 'customer_trackings_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'customer_trackings_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoSlugId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' }
        ]
      }
    ]
  })

  CustomerTracking.associate = function (models) {
    CustomerTracking.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    CustomerTracking.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
    CustomerTracking.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })
    CustomerTracking.belongsTo(models.LocaleSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId' })
  }

  return CustomerTracking
}
