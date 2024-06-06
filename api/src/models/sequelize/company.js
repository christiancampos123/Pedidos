module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid country ID.'
        }
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid city ID.'
        }
      }
    },
    dialCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please provide a valid dial code ID.'
        }
      }
    },
    fiscalName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a fiscal name.'
        }
      }
    },
    comercialName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a commercial name.'
        }
      }
    },
    vat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a VAT number.'
        }
      }
    },
    comercialAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fiscalAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a fiscal address.'
        }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a postal code.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address.'
        }
      }
    },
    web: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Please provide a valid URL for the website.'
        }
      }
    },
    telephone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          msg: 'Please provide a valid telephone number.'
        }
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
    tableName: 'companies',
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
        name: 'companies_countryId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      },
      {
        name: 'companies_cityId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cityId' }
        ]
      },
      {
        name: 'companies_dialCodeId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'dialCodeId' }
        ]
      }
    ]
  })

  Company.associate = function (models) {
    Company.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    Company.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' })
    Company.belongsTo(models.DialCode, { as: 'dialCode', foreignKey: 'dialCodeId' })
  }

  return Company
}
