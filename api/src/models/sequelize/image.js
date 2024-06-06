const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    imageConfigurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID de la configuración de imagen debe ser un número entero válido.' },
        notNull: { msg: 'El ID de la configuración de imagen no puede ser nulo.' }
      }
    },
    entityId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: 'El ID de la entidad debe ser un número entero válido.' }
      }
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El campo "entity" no puede estar vacío.' },
        notNull: { msg: 'El campo "entity" no puede ser nulo.' }
      }
    },
    name: {
      type: DataTypes.STRING
    },
    originalFilename: {
      type: DataTypes.STRING
    },
    resizedFilename: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    alt: {
      type: DataTypes.STRING
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El campo "languageAlias" no puede estar vacío.' },
        notNull: { msg: 'El campo "languageAlias" no puede ser nulo.' }
      }
    },
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El campo "mediaQuery" no puede estar vacío.' },
        notNull: { msg: 'El campo "mediaQuery" no puede ser nulo.' }
      }
    },
    latencyMs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El valor de "latencyMs" debe ser un número entero válido.' },
        notNull: { msg: 'El campo "latencyMs" no puede ser nulo.' }
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
    tableName: 'images',
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
        name: 'images_imageConfigurationId_fk',
        using: 'BTREE',
        fields: [
          { name: 'imageConfigurationId' }
        ]
      },
      {
        name: 'images_entityId_entity_mediaQuery_index',
        using: 'BTREE',
        fields: [
          { name: 'entityId' },
          { name: 'entity' },
          { name: 'mediaQuery' }
        ]
      }
    ]
  })

  Image.associate = function (models) {
    Image.belongsTo(models.ImageConfiguration, { as: 'imageConfiguration', foreignKey: 'imageConfigurationId' })
    // Image.belongsTo(models.City, { as: 'City', foreignKey: 'cityId' })
  }

  return Image
}
