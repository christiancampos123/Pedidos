import store from '../redux/store'
import { updateCart } from './../redux/cart-slice'

class ProductListComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.products = []
    // this.products = [
    // ].map(product => ({ ...product, quantity: 0 }))
  }

  connectedCallback() {
    this.loadData().then(() => this.render());
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
      },
    })
    this.products = await response.json();
    this.products = this.products.map(product => ({ ...product, quantity: 0 }))
    console.log(this.products)
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .products {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 3rem; /* Margin top to move the component down */
          margin-bottom: 80px; /* Space for the fixed button */
          transition: transform 0.3s ease-out;
          transform: translateX(0%);
        }
        .product {
          display: flex;
          flex-direction: column;
          width: 95%;
          padding: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #ccc;
          box-sizing: border-box;
        }
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .product-title {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .product-price {
          font-size: 1.25rem;
          color: #ffffff;
        }
        .product-details {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
        }
        .product-details span {
          margin-bottom: 5px;
        }
        .quantity-control {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        .quantity-control button {
          width: 30px;
          height: 30px;
          border: none;
          background-color: #007bff;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          margin: 0 5px;
        }
        .quantity-control span {
          font-size: 1rem;
          margin: 0 10px;
        }
        .view-order-button {
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

        .hide{
          display:none;
        }

        .invisible {
          transform: translateX(-120%);
        }
      </style>
    `
    document.addEventListener('go-summary', (event) => {
      const container = this.shadow.querySelector('.products')
      container.classList.add('invisible')
      // Aquí puedes realizar acciones adicionales en respuesta al evento
    })

    document.addEventListener('go-products', (event) => {
      const container = this.shadow.querySelector('.products')
      container.classList.remove('invisible')
      // Aquí puedes realizar acciones adicionales en respuesta al evento
    })
    // Products container
    const productsContainer = document.createElement('div')
    productsContainer.className = 'products'
    this.shadow.appendChild(productsContainer)

    // Create product elements dynamically
    this.products.forEach((product, index) => {
      const productDiv = document.createElement('div')
      productDiv.className = 'product'

      const productHeader = document.createElement('div')
      productHeader.className = 'product-header'

      const productTitle = document.createElement('div')
      productTitle.className = 'product-title'
      productTitle.textContent = product.name

      const productPrice = document.createElement('div')
      productPrice.className = 'product-price'
      productPrice.textContent = product.price.basePrice

      productHeader.appendChild(productTitle)
      productHeader.appendChild(productPrice)

      const productDetails = document.createElement('div')
      productDetails.className = 'product-details'

      const unitsSpan = document.createElement('span')
      unitsSpan.textContent = `Unidades: ${product.units}`
      productDetails.appendChild(unitsSpan)

      const weightSpan = document.createElement('span')
      weightSpan.textContent = `Peso: ${product.measurement} ${product.measurementUnit}`
      productDetails.appendChild(weightSpan)

      const quantityControl = document.createElement('div')
      quantityControl.className = 'quantity-control'

      const decreaseButton = document.createElement('button')
      decreaseButton.className = 'decrease'
      decreaseButton.textContent = '-'

      const quantitySpan = document.createElement('span')
      quantitySpan.className = 'quantity-span'
      quantitySpan.textContent = product.quantity

      const increaseButton = document.createElement('button')
      increaseButton.className = 'increase'
      increaseButton.textContent = '+'

      quantityControl.appendChild(decreaseButton)
      quantityControl.appendChild(quantitySpan)
      quantityControl.appendChild(increaseButton)

      productDetails.appendChild(quantityControl)

      productDiv.appendChild(productHeader)
      productDiv.appendChild(productDetails)

      productsContainer.appendChild(productDiv)
    })

    // Add event listener for the parent container
    productsContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const productDiv = event.target.closest('.product')
        const productIndex = Array.from(productsContainer.children).indexOf(productDiv)
        const product = this.products[productIndex]

        if (event.target.classList.contains('decrease')) {
          if (product.quantity > 0) {
            product.quantity--
            const quantitySpan = productDiv.querySelector('.quantity-span')
            quantitySpan.textContent = product.quantity
            store.dispatch(updateCart({
              id: product.id,
              quantity: product.quantity,
              name: product.name,
              unit: product.unit,  // Asegúrate de que estas propiedades existan en tu objeto de producto
              units: product.units,
              price: product.price.basePrice,  // Ajusta según la estructura de tu objeto de producto
              weight: `${product.measurement} ${product.measurementUnit}`,  // Igualmente, ajusta según tu estructura
            }));
          }
        } else if (event.target.classList.contains('increase')) {
          product.quantity++
          const quantitySpan = productDiv.querySelector('.quantity-span')
          quantitySpan.textContent = product.quantity
          store.dispatch(updateCart({
            id: product.id,
            quantity: product.quantity,
            name: product.name,
            unit: product.unit,  // Asegúrate de que estas propiedades existan en tu objeto de producto
            units: product.units,
            price: product.price.basePrice,  // Ajusta según la estructura de tu objeto de producto
            weight: `${product.measurement} ${product.measurementUnit}`,  // Igualmente, ajusta según tu estructura
          }));
        }
      }
      console.log(store.getState())
    })

    // // View Order button
    // const viewOrderButton = document.createElement('button')
    // viewOrderButton.className = 'view-order-button'
    // viewOrderButton.textContent = 'Ver Pedido'

    // this.shadow.appendChild(viewOrderButton)

    // const viewOrder = this.shadow.querySelector('.view-order-button')
  }
}

customElements.define('products-component', ProductListComponent)
