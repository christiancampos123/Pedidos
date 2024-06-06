const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
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
    tableName: 'emails',
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

  Email.associate = function (models) {
    Email.belongsToMany(models.Customer, { through: models.SentEmail, as: 'customers', foreignKey: 'emailId' })
    Email.hasMany(models.EmailError, { as: 'emailErrors', foreignKey: 'emailId' })
    Email.hasMany(models.SentEmail, { as: 'sentEmails', foreignKey: 'emailId' })
  }

  return Email
}
