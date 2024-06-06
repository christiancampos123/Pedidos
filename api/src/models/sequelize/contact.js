module.exports = function (sequelize, DataTypes) {
  const Contact = sequelize.define('Contact', {
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
    fingerPrintId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "ID de la huella digital".'
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "Email".'
        },
        isEmail: {
          msg: 'Por favor, proporciona un email válido.'
        }
        // You can add more validations as needed
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "Asunto".'
        },
        len: {
          args: [2, 255], // Subject length between 2 and 255 characters
          msg: 'El asunto debe tener entre 2 y 255 caracteres.'
        }
        // You can add more validations as needed
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, proporciona un valor para "Mensaje".'
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
  },
  {
    sequelize,
    tableName: 'contacts',
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
        name: 'contacts_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
      {
        name: 'contacts_email_index',
        using: 'BTREE',
        fields: [
          { name: 'email' }
        ]
      }
    ]
  })

  Contact.associate = function (models) {
    Contact.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
    // Contact.belongsTo(models.email, { as: 'dialCode', foreignKey: 'dialCodeId' })
  }

  return Contact
}
