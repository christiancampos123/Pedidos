const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const ImageConfiguration = sequelize.define('ImageConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La entidad no puede estar vacía.' },
        notNull: { msg: 'La entidad no puede ser nula.' }
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
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La mediaQuery no puede estar vacía.' },
        notNull: { msg: 'La mediaQuery no puede ser nula.' }
      }
    },
    widthPx: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: 'El ancho en píxeles debe ser un número entero válido.' }
      }
    },
    heightPx: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: 'La altura en píxeles debe ser un número entero válido.' }
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
    tableName: 'image_configurations',
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
        name: 'image_configurations_entity_name_mediaQuery_index',
        using: 'BTREE',
        fields: [
          { name: 'entity' },
          { name: 'name' },
          { name: 'mediaQuery' }
        ]
      }
    ]
  })

  ImageConfiguration.associate = function (models) {
    ImageConfiguration.hasMany(models.Image, { as: 'images', foreignKey: 'imageConfigurationId' })
  }

  return ImageConfiguration
}
