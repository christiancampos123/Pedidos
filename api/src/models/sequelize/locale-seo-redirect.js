const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const LocaleSeoRedirect = sequelize.define('LocaleSeoRedirect', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID de localeSeo debe ser un número entero válido.' }
      }
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El alias de idioma no puede estar vacío.' }
      }
    },
    group: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'El grupo no puede estar vacío.' }
      }
    },
    key: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'La clave no puede estar vacía.' }
      }
    },
    subdomain: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'El subdominio no puede estar vacío.' }
      }
    },
    oldUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'La antigua URL no puede estar vacía.' }
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
    tableName: 'locale_seo_redirects',
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
        name: 'locale_seo_redirects_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  LocaleSeoRedirect.associate = function (models) {
    LocaleSeoRedirect.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })
  }

  return LocaleSeoRedirect
}
