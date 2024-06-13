class MenuComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML = `
      <style>
        .menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }

        .menu-button {
          width: 75%;
          padding: 15px;
          margin: 10px 0;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          cursor: pointer;
          text-align: center;
        }

        .menu-button:nth-child(2) {
          background-color: #6c757d;
        }

        @media (max-width: 600px) {
          .menu-button {
            width: 80%;
            padding: 12px;
            font-size: 0.9rem;
          }
        }
      </style>
      <div class="menu">
        <button class="menu-button menu-button-nuevo">Nuevo Pedido</button>
        <button class="menu-button menu-button-anterior">Pedidos Anteriores</button>
      </div>
    `
    const newOrderButton = this.shadow.querySelector('.menu-button-nuevo')
    const previousOrdersButton = this.shadow.querySelector('.menu-button-anterior')

    newOrderButton.addEventListener('click', () => {
      window.location.href = '/cliente/pedidos'
    })

    previousOrdersButton.addEventListener('click', () => {
      window.location.href = '/cliente/pedidosanteriores'
    })
  }
}

customElements.define('menu-component', MenuComponent)
