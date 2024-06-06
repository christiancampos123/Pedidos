export default (() => {
  const images = document.querySelectorAll('.image-placeholder')

  images.forEach(image => {
    image.addEventListener('click', () => {
      // Crear un div modal
      const modal = document.createElement('div')
      modal.classList.add('modal')

      // Agregar el contenido del div clickeado al modal
      modal.textContent = image.textContent

      // Agregar el modal al cuerpo del documento
      document.body.appendChild(modal)

      // Agregar un evento de clic al modal para cerrarlo al hacer clic fuera de él
      modal.addEventListener('click', () => {
        document.body.removeChild(modal)
      })
    })
  })
})()
