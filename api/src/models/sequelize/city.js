module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('City', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "ID".'
        }
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "ID del país".'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "Nombre".'
        },
        len: {
          args: [2, 100], // Name length between 2 and 100 characters
          msg: 'El nombre debe tener entre 2 y 100 caracteres.'
        }
        // You can add more validations as needed
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
    tableName: 'cities',
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
        name: 'cities_countryId_fk',
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      }
    ]
  })

  City.associate = function (models) {
    City.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    City.hasMany(models.Company, { as: 'companies', foreignKey: 'cityId' })
    City.hasMany(models.Fingerprint, { as: 'fingerprints', foreignKey: 'cityId' })
  }

  return City
}
