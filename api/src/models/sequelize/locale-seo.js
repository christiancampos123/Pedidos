const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const LocaleSeo = sequelize.define('LocaleSeo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El alias de idioma no puede estar vacío.' },
        notNull: { msg: 'El alias de idioma no puede ser nulo.' }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La URL no puede estar vacía.' },
        notNull: { msg: 'La URL no puede ser nula.' }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El título no puede estar vacío.' },
        notNull: { msg: 'El título no puede ser nulo.' }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    redirection: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    changeFrequency: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.DECIMAL
    },
    sitemap: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
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
    tableName: 'locale_seos',
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

  LocaleSeo.associate = function (models) {
    LocaleSeo.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.LocaleSeoRedirect, { as: 'localeSeoRedirects', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.LocaleSeoSlug, { as: 'localeSeoSlugs', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.MenuItem, { as: 'menuItems', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoId' })
  }

  return LocaleSeo
}
