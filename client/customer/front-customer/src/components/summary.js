class ProductSummaryComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.products = [
      {
        title: 'Producto 1',
        price: 10,
        units: 5,
        weight: 500,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 2',
        price: 20,
        units: 3,
        weight: 1000,
        unit: 'g'
      },
      {
        title: 'Producto 3',
        price: 15,
        units: 2,
        weight: 750,
        unit: 'g'
      }
    ]
  }

  connectedCallback () {
    this.render()
  }

  render () {
    // Clear previous content
    this.shadow.innerHTML = `
<style>

      .summary {
        width: 95%;
        margin-left: 2.5%;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
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
        width: 75%;
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
    `

    // Summary container
    const summaryContainer = document.createElement('div')
    summaryContainer.className = 'summary'
    this.shadow.appendChild(summaryContainer)

    // Title
    const summaryTitle = document.createElement('div')
    summaryTitle.className = 'summary-title'
    summaryTitle.textContent = 'Resumen del Pedido'
    summaryContainer.appendChild(summaryTitle)

    // Product details
    this.products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.className = 'summary-item'
      productDiv.innerHTML = `
        <span>${product.title}</span>: ${product.price}€ x ${product.units} (${product.weight} ${product.unit})
      `
      summaryContainer.appendChild(productDiv)
    })

    // Total calculation
    const total = this.products.reduce((acc, product) => acc + product.price * product.units, 0)

    // Total element
    const totalElement = document.createElement('div')
    totalElement.className = 'total'
    totalElement.textContent = `Total: ${total}€`
    summaryContainer.appendChild(totalElement)

    // hacer pedido
    const viewOrderButton = document.createElement('button')
    viewOrderButton.className = 'do-order-button'
    viewOrderButton.textContent = 'Hacer Pedido'

    this.shadow.appendChild(viewOrderButton)

    const doOrder = this.shadow.querySelector('.do-order-button')

    doOrder.addEventListener('click', () => {
      window.location.href = '/cliente/pedidoexitoso'
    })
  }
}

customElements.define('summary-component', ProductSummaryComponent)
