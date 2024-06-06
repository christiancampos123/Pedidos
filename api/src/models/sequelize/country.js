module.exports = function (sequelize, DataTypes) {
  const Country = sequelize.define('Country', {
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
    iso2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "ISO2".'
        },
        len: {
          args: [2, 2], // ISO2 should be exactly 2 characters
          msg: 'ISO2 debe tener exactamente 2 caracteres.'
        }
        // You can add more validations as needed
      }
    },
    iso3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "ISO3".'
        },
        len: {
          args: [3, 3], // ISO3 should be exactly 3 characters
          msg: 'ISO3 debe tener exactamente 3 caracteres.'
        }
        // You can add more validations as needed
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "Visible".'
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
    tableName: 'countries',
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

  Country.associate = function (models) {
    Country.hasMany(models.City, { as: 'cities', foreignKey: 'countryId' })
    Country.hasMany(models.Company, { as: 'companies', foreignKey: 'countryId' })
    Country.hasMany(models.DialCode, { as: 'dialCodes', foreignKey: 'countryId' })
    Country.hasMany(models.Tax, { as: 'taxes', foreignKey: 'countryId' })
  }

  return Country
}
