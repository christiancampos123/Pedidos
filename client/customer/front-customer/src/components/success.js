class SuccessComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    let orderNumber = 2
    // const orderNumber = this.getAttribute('order-number') || '12345'
    this.shadow.innerHTML = `
      <style>
        .box-container{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 90vh;
        }
        .success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
        }

        .message {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .order-number {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: #ffffff;
        }

        .home-button {
          padding: 15px 30px;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          text-align: center;
        }

        @media (max-width: 600px) {
          .home-button {
            padding: 12px 25px;
            font-size: 0.9rem;
          }
        }
      </style>
      <div class = "box-container">
      <div class="success">
        <div class="message">Pedido realizado con éxito:</div>
        <div class="order-number">Número del pedido: ${orderNumber}</div>
        <button class="home-button">Volver a inicio</button>
      </div>
      </div>
    `

    const homeButton = this.shadow.querySelector('.home-button')
    homeButton.addEventListener('click', () => {
      window.location.href = '/cliente'
    })
  }
}

customElements.define('success-component', SuccessComponent)
