const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const LocaleSeoSlugRedirect = sequelize.define('LocaleSeoSlugRedirect', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID del slug SEO local debe ser un número entero válido.' },
        notNull: { msg: 'El ID del slug SEO local no puede ser nulo.' }
      }
    },
    languageAlias: {
      type: DataTypes.STRING
    },
    oldUrl: {
      type: DataTypes.STRING
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
    tableName: 'locale_seo_slug_redirects',
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
        name: 'locale_seo_slug_redirects_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' }
        ]
      }
    ]
  })

  LocaleSeoSlugRedirect.associate = function (models) {
    LocaleSeoSlugRedirect.belongsTo(models.LocaleSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId' })
  }

  return LocaleSeoSlugRedirect
}
