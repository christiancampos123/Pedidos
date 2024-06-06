module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      surname: String,
      email: String,
      telephone: Number,
      locales: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
      },
      images: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
      },
      deletedAt: Date
    },
    { timestamps: true }
  )

  const User = mongoose.model('User', schema, 'users')
  return User
}
