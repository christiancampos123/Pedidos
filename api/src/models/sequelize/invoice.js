const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID debe ser un número entero válido.' },
        notNull: { msg: 'El ID no puede ser nulo.' }
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID del cliente debe ser un número entero válido.' },
        notNull: { msg: 'El ID del cliente no puede ser nulo.' }
      }
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID de la venta debe ser un número entero válido.' },
        notNull: { msg: 'El ID de la venta no puede ser nulo.' }
      }
    },
    returnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID de la devolución debe ser un número entero válido.' },
        notNull: { msg: 'El ID de la devolución no puede ser nulo.' }
      }
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La referencia no puede estar vacía.' },
        notNull: { msg: 'La referencia no puede ser nula.' }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La ruta no puede estar vacía.' },
        notNull: { msg: 'La ruta no puede ser nula.' }
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
  },
  {
    sequelize,
    tableName: 'invoices',
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
        name: 'invoices_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'invoices_saleId_fk',
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'invoices_returnId_fk',
        using: 'BTREE',
        fields: [
          { name: 'returnId' }
        ]
      }
    ]
  })

  Invoice.associate = function (models) {
    Invoice.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Invoice.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })
    Invoice.belongsTo(models.Return, { as: 'return', foreignKey: 'returnId' })
  }

  return Invoice
}
