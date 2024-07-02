module.exports = function (sequelize, DataTypes) {
  const SaleReturn = sequelize.define('SaleReturn',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false
      },
      totalBasePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      returnTime: {
        type: DataTypes.TIME,
        allowNull: false
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
      tableName: 'sale_returns',
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
          name: 'sale_returns_saleId_fk',
          using: 'BTREE',
          fields: [
            { name: 'saleId' }
          ]
        },
        {
          name: 'sale_returns_customerId_fk',
          using: 'BTREE',
          fields: [
            { name: 'customerId' }
          ]
        }
      ]
    }
  )

  SaleReturn.associate = function (models) {
    SaleReturn.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })
    SaleReturn.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
  }

  return SaleReturn
}
