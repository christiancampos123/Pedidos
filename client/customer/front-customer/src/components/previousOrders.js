class PreviousOrdersComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    // Datos de ejemplo para pedidos anteriores
    this.previousOrders = [];
    // Copia de los pedidos originales sin filtrar
    this.filteredOrders = [];
  }

  connectedCallback() {
    document.addEventListener('go-products2', () => {
      this.shadow.querySelector('.container').classList.remove('invisible');
    });
    this.loadData().then(() => this.render());
  }

  async loadData() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
      },
    })
    const data = await response.json();
    this.previousOrders = data.rows;
    this.filteredOrders = [...this.previousOrders]; // Inicialmente, los pedidos sin filtrar son los mismos que los pedidos anteriores
  }

  render() {
    // Estilos CSS
    const style = document.createElement('style');
    style.textContent = `
      .container {
        width: 90%;
        margin: 5rem auto;
        transition: transform 0.3s ease-out;
        transform: translateX(0%);
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

      .invisible {
        transform: translateX(-120%);
      }
    `;
    this.shadow.appendChild(style);

    // Contenedor principal
    const container = document.createElement('div');
    container.classList.add('container');
    this.shadow.appendChild(container);

    // Campo de texto para buscar por referencia
    const referenceInput = document.createElement('input');
    referenceInput.classList.add('search-input');
    referenceInput.placeholder = 'Buscar por referencia';
    container.appendChild(referenceInput);

    // Botón de búsqueda por referencia
    const referenceButton = document.createElement('button');
    referenceButton.classList.add('search-button');
    referenceButton.textContent = 'Buscar';
    container.appendChild(referenceButton);

    // Campo de texto para buscar por fecha
    const dateInput = document.createElement('input');
    dateInput.classList.add('search-input');
    dateInput.type = 'text'; // Cambiar a tipo texto para aceptar formato dd/mm/yyyy
    dateInput.placeholder = 'Buscar por fecha (dd/mm/yyyy)';
    container.appendChild(dateInput);

    // Botón de búsqueda por fecha
    const dateButton = document.createElement('button');
    dateButton.classList.add('search-button');
    dateButton.textContent = 'Buscar';
    container.appendChild(dateButton);

    // Lista de pedidos anteriores
    const ordersList = document.createElement('div');
    ordersList.classList.add('orders-list');
    container.appendChild(ordersList);

    // Función para filtrar y renderizar pedidos
    const filterAndRenderOrders = () => {
      const referenceValue = referenceInput.value.trim().toLowerCase();
      const dateValue = dateInput.value.trim();

      // Filtrar los pedidos basados en la referencia y/o fecha
      this.filteredOrders = this.previousOrders.filter(order => {
        const matchesReference = order.reference.toLowerCase().includes(referenceValue);
        const matchesDate = dateValue === '' || this.formatDate(order.saleDate) === dateValue; // Comparar la fecha formateada
        return matchesReference && matchesDate;
      });

      // Limpiar la lista actual
      ordersList.innerHTML = '';

      // Mostrar pedidos filtrados
      this.filteredOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        const orderInfo = document.createElement('div');
        orderInfo.classList.add('order-info');

        const orderReference = document.createElement('div');
        orderReference.classList.add('order-reference');
        orderReference.textContent = `Referencia: ${order.reference}`;
        orderInfo.appendChild(orderReference);

        const orderPrice = document.createElement('div');
        orderPrice.textContent = `Precio: ${order.totalBasePrice}€`;
        orderInfo.appendChild(orderPrice);

        const orderDate = document.createElement('div');
        orderDate.classList.add('order-date');
        orderDate.textContent = `Fecha: ${order.saleDate}  ${order.saleTime}`;
        orderInfo.appendChild(orderDate);

        const viewButton = document.createElement('button');
        viewButton.classList.add('view-button');
        viewButton.setAttribute('data-id', order.id);
        viewButton.textContent = 'Ver Pedido';
        viewButton.addEventListener('click', () => {
          const container = this.shadow.querySelector(".container");
          container.classList.add("invisible");

          const event = new CustomEvent('go-summary2', {
            detail: {
              orderId: order.id
            }
          });
          document.dispatchEvent(event);
        });

        orderItem.appendChild(orderInfo);
        orderItem.appendChild(viewButton);
        ordersList.appendChild(orderItem);
      });

      // Si no se encontraron resultados
      if (this.filteredOrders.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.textContent = 'No se encontraron pedidos con los criterios de búsqueda seleccionados.';
        ordersList.appendChild(noResultsMessage);
      }
    };

    // Eventos de búsqueda
    referenceButton.addEventListener('click', filterAndRenderOrders);
    dateButton.addEventListener('click', filterAndRenderOrders);

    // Renderizar los pedidos sin ningún filtro inicial
    filterAndRenderOrders();
  }

  // Función para formatear la fecha de yyyy-mm-dd a dd/mm/yyyy
  formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
}

customElements.define('previous-orders-component', PreviousOrdersComponent);
