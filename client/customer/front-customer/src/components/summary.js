import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
import { updateCart } from './../redux/cart-slice'

class ProductSummaryComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.products = []
  }

  connectedCallback() {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (!isEqual(currentState.cart.cartProducts, this.products)) {
        this.products = currentState.cart.cartProducts
        this.updateCart(this.products)
      }

      if (currentState.cart.cartProducts.length === 0) {
        this.shadow.querySelector('.view-order-button').classList.remove('active')
      } else {
        this.shadow.querySelector('.view-order-button').classList.add('active')
      }
    })
    this.render()
  }

  updateCart(products) {
    const summaryContainer = this.shadow.querySelector('.summary')

    // Clear previous content
    summaryContainer.innerHTML = ''

    // Title
    const summaryTitle = document.createElement('div')
    summaryTitle.className = 'summary-title'
    summaryTitle.textContent = 'Resumen del Pedido'
    summaryContainer.appendChild(summaryTitle)

    // Product details
    products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.className = 'summary-item'
      productDiv.innerHTML = `
        <span>${product.name}</span>: ${product.price}€ x ${product.quantity} (${product.weight})
      `
      summaryContainer.appendChild(productDiv)
    })

    // Total calculation
    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0)

    // Total element
    const totalElement = document.createElement('div')
    totalElement.className = 'total'
    totalElement.textContent = `Total: ${total.toFixed(2)}€`
    summaryContainer.appendChild(totalElement)
  }

  render() {
    // Clear previous content
    this.shadow.innerHTML = `
      <style>
        .summary {
          position: fixed;
          top: 4rem;
          width: 95%;
          margin-left: 2.5%;
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 8rem;
          overflow: hidden;
          transition: transform 0.3s ease-out;
          transform: translateX(120%);
        }
        .summary-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .summary-item {
          margin-bottom: 10px;
        }
        .summary-item span {
          font-weight: bold;
        }
        .total {
          margin-top: 20px;
          font-size: 1.25rem;
          font-weight: bold;
        }
        .do-order-button {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 55%;
          padding: 15px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .view-order-button {
          z-index: 10;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 55%;
          padding: 15px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .arrow-button-container {
          position: fixed;
          bottom: 23px;
          left: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
        }
        .arrow-button {
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .arrow-button span {
          padding-right: 5px;
          font-size: 1.5rem;
          color: #007bff;
        }
        .visible {
          transform: translateX(0%);
        }
        .hide {
          display: none;
        }
      </style>
    `


    // Contenedor del botón de flecha
    const arrowButtonContainer = document.createElement('div')
    arrowButtonContainer.className = 'arrow-button-container hide'
    this.shadow.appendChild(arrowButtonContainer)

    // Botón de flecha
    const arrowButton = document.createElement('button')
    arrowButton.className = 'arrow-button'
    arrowButton.innerHTML = '<span>&#x25C0;</span>'
    arrowButtonContainer.appendChild(arrowButton)

    // Summary container
    const summaryContainer = document.createElement('div')
    summaryContainer.className = 'summary'
    this.shadow.appendChild(summaryContainer)

    // Inicializar el contenido del carrito
    this.updateCart(this.products)

    // View Order button
    const viewOrderButton = document.createElement('button')
    viewOrderButton.className = 'view-order-button'
    viewOrderButton.textContent = 'Ver Pedido'
    this.shadow.appendChild(viewOrderButton)

    // Hacer pedido
    const doOrderButton = document.createElement('button')
    doOrderButton.className = 'do-order-button'
    doOrderButton.textContent = 'Hacer Pedido'
    this.shadow.appendChild(doOrderButton)

    const doOrder = this.shadow.querySelector('.do-order-button')
    console.log(this.products)
    doOrder.addEventListener('click', async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken')
        },
        body: JSON.stringify({
          products: this.products
        })
      });

      const data = await response.json();
      const summary = this.shadow.querySelector(".summary");
      summary.innerHTML = '';

      const messageC = document.createElement('div');
      messageC.classList.add("messageC");
      summary.appendChild(messageC);

      const title = document.createElement("h2");
      title.textContent = `TITULO ${data.reference}`;
      messageC.appendChild(title);

      const link = document.createElement("a");
      link.href = '/cliente';

      const buttonHome = document.createElement("button");
      buttonHome.textContent = 'Ir a Home';
      link.appendChild(buttonHome);

      messageC.appendChild(link);

      doOrder.classList.add("hide");

      // window.location.href = '/cliente/pedidoexitoso' // Uncomment this if you want to redirect immediately
    });


    const viewOrder = this.shadow.querySelector('.view-order-button')
    viewOrder.addEventListener('click', () => {
      summaryContainer.classList.add('visible')
      this.shadow.querySelector('.view-order-button').classList.add('hide')
      this.shadow.querySelector('.arrow-button-container').classList.remove('hide')

      const event = new CustomEvent('go-summary')
      document.dispatchEvent(event)
    })

    arrowButton.addEventListener('click', () => {
      this.shadow.querySelector('.view-order-button').classList.remove('hide')
      this.shadow.querySelector('.arrow-button-container').classList.add('hide')
      this.shadow.querySelector('.summary').classList.remove('visible')

      const event = new CustomEvent('go-products')
      document.dispatchEvent(event)
    })
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}

customElements.define('summary-component', ProductSummaryComponent)
