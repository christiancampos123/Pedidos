const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    // console.log(images.file.length)
    // console.log('new image')
    // let fileName = ''
    const result = []
    for (const image of images.file) {
      try {
        const originalName = image.originalname
        const finalName = originalName.replace(/[\s_]/g, '-')
        image.originalname = finalName
        const filename = finalName

        const newFilename = await fs.access(path.join(__dirname, `../storage/images/gallery/original/${path.parse(filename).name}.webp`))
          .then(async () => {
          // TODO: Dar al usuario la opción de sobreescribir la imagen
            return `${path.parse(filename).name}-${new Date().getTime()}.webp`
          })
          .catch(async () => {
            return `${path.parse(filename).name}.webp`
          })

        // const fullPath = path.join(__dirname, '../storage/images/gallery/original/', newFilename)
        // console.log(fullPath)

        // Aquí guardamos la imagen con el nombre generado
        await sharp(image.buffer)
          .webp({ lossless: true })
          .toFile(path.join(__dirname, `../storage/images/gallery/original/${newFilename}`))

        await sharp(image.buffer)
          .resize(135, 135)
          .webp({ quality: 80 })
          .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${newFilename}`))
        result.push(newFilename)
      } catch (error) {
        console.log(error)
      }
    }
    return result
  }

  resizeImages = async (images) => {
    const resizedImages = {}

    for (const image of images) {
      // console.log(image)
      try {
        const originalFilename = image.filename
        const imageConfiguration = JSON.parse(image.imageConfiguration)
        const name = originalFilename.slice(0, -5)

        // Leer la imagen original
        const originalImagePath = path.join(__dirname, `../storage/images/gallery/original/${originalFilename}`)
        const originalImageBuffer = await fs.readFile(originalImagePath)

        for (const size of Object.keys(imageConfiguration)) {
          const { widthPx, heightPx } = imageConfiguration[size]
          const filePath = path.join(__dirname, `../storage/images/resized/${name}-${widthPx}x${heightPx}.webp`)
          const nameUpdate = image.name

          if (!resizedImages[size]) {
            resizedImages[size] = {}
          }

          resizedImages[size][image.name] = {}

          resizedImages[size][nameUpdate] = {
            originalFilename: `${originalFilename}`,
            filename: `${name}-${widthPx}x${heightPx}.webp`,
            title: image.title,
            alt: image.alt,
            widthPx: `${widthPx}`,
            heightPx: `${heightPx}`
          }

          try {
            // Verificar si el archivo ya existe
            await fs.access(filePath, fs.constants.F_OK)
            console.log('El archivo ya existe, no se redimensionará nuevamente.')
          } catch (error) {
            // El archivo no existe, redimensionar y guardar
            await sharp(originalImageBuffer)
              .resize(parseInt(widthPx, 10), parseInt(heightPx, 10))
              .webp({ quality: 80 })
              .toFile(filePath)
            console.log('Imagen redimensionada y guardada.')
          }
        }
      } catch (error) {
        console.error(`Error al redimensionar la imagen '${image.filename}':`, error)
      }
    }

    return resizedImages
  }

  deleteImages = async filename => {
    try {
      await fs.unlink(path.join(__dirname, `../storage/images/gallery/original/${filename}`))
      await fs.unlink(path.join(__dirname, `../storage/images/gallery/thumbnail/${filename}`))

      return 1
    } catch {
      return 0
    }
  }
}
