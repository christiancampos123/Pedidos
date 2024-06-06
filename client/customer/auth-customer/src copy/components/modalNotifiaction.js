class ModalNotification extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.notificationMessage = this.getAttribute('message')
    this.timer = null // Propiedad para almacenar el identificador del temporizador
  }

  connectedCallback () {
    document.addEventListener('custom-notification', (event) => {
      this.handleShowModal(event.detail.message, event.detail.color)
    })

    this.render()
  }

  handleShowModal (customMessage, color) {
    this.hideNotification() // Oculta cualquier notificación existente

    const notificationContainer = this.shadow.querySelector('.notification-container')
    notificationContainer.querySelector('p').innerText = customMessage

    if (color === 'green') {
      notificationContainer.classList.add('show-green')
    } else if (color === 'red') {
      notificationContainer.classList.add('show-red')
    }

    // Reinicia el temporizador
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.hideNotification()
    }, 5000)
  }

  hideNotification () {
    const notificationContainer = this.shadow.querySelector('.notification-container')
    notificationContainer.classList.remove('show-green', 'show-red')
  }

  render () {
    this.shadow.innerHTML = /* html */ `
        <style>
          :host{
            z-index:11;
            position:absolute;
          }
          .notification-container {
            position: fixed;
            display:none;
            bottom: 20px;
            right: 20px;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            opacity:0;
            transition: all 0.3s ease-in-out;
            z-index:-100;
          }
  
          .notification-container.show-green {
            display:block;
            position: fixed;
            background-color: #090;
            opacity:1;
            z-index:0;
          }

          .notification-container.show-red {
            display:block;

            position: fixed;
            opacity:1;
            background-color: #900;
            z-index:0;
          }
        </style>
  
        <div class="notification-container">
          <p>${this.notificationMessage}</p>
        </div>
      `
  }
}

customElements.define('modal-notification-component', ModalNotification)
