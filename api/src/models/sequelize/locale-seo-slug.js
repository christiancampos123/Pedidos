const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const LocaleSeoSlug = sequelize.define('LocaleSeoSlug', {
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
        isInt: { msg: 'El ID de LocaleSeo debe ser un número entero válido.' },
        notNull: { msg: 'El ID de LocaleSeo no puede ser nulo.' }
      }
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El alias de idioma no puede estar vacío.' },
        notNull: { msg: 'El alias de idioma no puede ser nulo.' }
      }
    },
    relParent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El relParent no puede estar vacío.' },
        notNull: { msg: 'El relParent no puede ser nulo.' }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El slug no puede estar vacío.' },
        notNull: { msg: 'El slug no puede ser nulo.' }
      }
    },
    key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'La clave debe ser un número entero válido.' },
        notNull: { msg: 'La clave no puede ser nula.' }
      }
    },
    parentSlug: {
      type: DataTypes.STRING
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
    keywords: {
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
    tableName: 'locale_seo_slugs',
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
        name: 'locale_seo_slugs_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  LocaleSeoSlug.associate = function (models) {
    LocaleSeoSlug.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })

    LocaleSeoSlug.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.MenuItem, { as: 'menuItems', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoSlugId' })
  }

  return LocaleSeoSlug
}
