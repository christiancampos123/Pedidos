class ModalErrors extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('custom-notification', (event) => {
      this.handleShowModal(event.detail.message, event.detail.color)
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */ `
        <style>
          :host{
            z-index:11;
            position:absolute;
            display:flex;
          }
          .notification-container {
            position: fixed;
            top: 10rem;
            justify-content:center;
            color: black;
            background-color:white;
            padding:1rem;
            z-index:-100;
            width: 80%;
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

customElements.define('modal-errors-component', ModalErrors)
