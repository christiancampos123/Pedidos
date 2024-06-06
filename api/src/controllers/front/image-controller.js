const mongooseDb = require('../../models/mongoose')
const Image = mongooseDb.Image

exports.findOne = async (req, res) => {
  const fileName = req.params.filename

  const options = {
    root: __dirname + '../../../storage/images/gallery/thumbnail/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  // console.log(options)
  res.sendFile(fileName, options)
}
