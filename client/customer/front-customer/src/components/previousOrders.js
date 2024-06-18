class PreviousOrdersComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    // Datos de ejemplo para pedidos anteriores
    this.previousOrders = [
      { reference: '1234', price: 50, date: '2024-06-01T10:30:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '5678', price: 75, date: '2024-05-28T15:45:00' },
      { reference: '91011', price: 30, date: '2024-05-25T12:00:00' }
    ]
  }

  connectedCallback () {
    this.render()
  }

  render () {
    // Estilos CSS
    const style = document.createElement('style')
    style.textContent = `
      .container {
        width: 90%;
        max-width: 600px;
        margin: 5rem auto;
      }

      .search-input {
        width: 60%;
        margin-right: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .search-button {
        padding: 8px 16px;
        background-color: #007bff;
        width: 37%;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .orders-list {
        margin-top: 20px;
      }

      .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      .order-info {
        display: flex;
        flex-direction: column;
      }

      .order-reference {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .order-date {
        color: #ffffff;
      }

      .view-button {
        padding: 6px 12px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    `
    this.shadow.appendChild(style)

    // Contenedor principal
    const container = document.createElement('div')
    container.classList.add('container')
    this.shadow.appendChild(container)

    // Campo de texto para buscar por referencia
    const referenceInput = document.createElement('input')
    referenceInput.classList.add('search-input')
    referenceInput.placeholder = 'Buscar por referencia'
    container.appendChild(referenceInput)

    // Botón de búsqueda por referencia
    const referenceButton = document.createElement('button')
    referenceButton.classList.add('search-button')
    referenceButton.textContent = 'Buscar'
    container.appendChild(referenceButton)

    // Campo de texto para buscar por fecha
    const dateInput = document.createElement('input')
    dateInput.classList.add('search-input')
    dateInput.type = 'date'
    container.appendChild(dateInput)

    // Botón de búsqueda por fecha
    const dateButton = document.createElement('button')
    dateButton.classList.add('search-button')
    dateButton.textContent = 'Buscar'
    container.appendChild(dateButton)

    // Lista de pedidos anteriores
    const ordersList = document.createElement('div')
    ordersList.classList.add('orders-list')
    container.appendChild(ordersList)

    // Mostrar pedidos anteriores
    this.previousOrders.forEach(order => {
      const orderItem = document.createElement('div')
      orderItem.classList.add('order-item')

      const orderInfo = document.createElement('div')
      orderInfo.classList.add('order-info')

      const orderReference = document.createElement('div')
      orderReference.classList.add('order-reference')
      orderReference.textContent = `Referencia: ${order.reference}`
      orderInfo.appendChild(orderReference)

      const orderPrice = document.createElement('div')
      orderPrice.textContent = `Precio: ${order.price}€`
      orderInfo.appendChild(orderPrice)

      const orderDate = document.createElement('div')
      orderDate.classList.add('order-date')
      const formattedDate = new Date(order.date).toLocaleString()
      orderDate.textContent = `Fecha: ${formattedDate}`
      orderInfo.appendChild(orderDate)

      const viewButton = document.createElement('button')
      viewButton.classList.add('view-button')
      viewButton.textContent = 'Ver Pedido'
      viewButton.addEventListener('click', () => {
        // Lógica para ver el pedido
        alert(`Ver pedido ${order.reference}`)

        window.location.href = '/cliente/resumen'
      })

      orderItem.appendChild(orderInfo)
      orderItem.appendChild(viewButton)
      ordersList.appendChild(orderItem)
    })
  }
}

customElements.define('previous-orders-component', PreviousOrdersComponent)
