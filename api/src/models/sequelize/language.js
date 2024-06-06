const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Language = sequelize.define('Language', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío.' },
        notNull: { msg: 'El nombre no puede ser nulo.' }
      }
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'El alias debe ser único.' },
      validate: {
        notEmpty: { msg: 'El alias no puede estar vacío.' },
        notNull: { msg: 'El alias no puede ser nulo.' }
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
    tableName: 'languages',
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

  Language.associate = function (models) {

  }

  return Language
}
