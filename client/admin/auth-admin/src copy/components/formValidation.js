// // a la clase de input de pass un clas validate
// un event Input
// data set data minLength valor 8
// comprobar caracfteres en el input y comprobar si son los necesarios,
// si no lo son borde rojo, else nada
export default (() => {
  // Selecciona el elemento padre .data-tabs
  const dataTabs = document.querySelector('html')

  // Agrega un event listener al elemento padre
  dataTabs.addEventListener('input', (event) => {
    // Verifica si el evento proviene de un elemento de tipo input
    if (event.target.tagName === 'INPUT') {
      const input = event.target.closest('.validate')

      if (input) {
        const minLength = input.dataset.minlength
        console.log(minLength)

        if (input.value.length < parseInt(minLength) && input.value.length > 0) {
          input.classList.add('border-red')
        } else {
          input.classList.remove('border-red')
        }
      }

      if (input) {
        const letters = input.dataset.onlyletters
        console.log(letters)
        if (letters) {
          const expresionRegular = /^[a-zA-Z]+$/
          console.log(input.value)
          expresionRegular.test(input.value)
          console.log(expresionRegular.test(input.value))
          if (expresionRegular.test(input.value)) {
            input.classList.remove('border-red')
          } else {
            input.classList.add('border-red')
          }
          if (input.value.length === 0) {
            input.classList.remove('border-red')
          }
        }
      }

      if (input) {
        const mail = input.dataset.mail
        if (mail) {
          const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          console.log(input.value)
          expresionRegular.test(input.value)
          console.log(expresionRegular.test(input.value))
          if (expresionRegular.test(input.value)) {
            input.classList.remove('border-red')
          } else {
            input.classList.add('border-red')
          }
          if (input.value.length === 0) {
            input.classList.remove('border-red')
          }
        }
      }
    }
  })
})()
