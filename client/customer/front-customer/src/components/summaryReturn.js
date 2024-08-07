import isEqual from 'lodash-es/isEqual';
import { store } from '../redux/store.js';

class ProductSummaryComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.previousOrders = [];
    this.currentSaleId = null;
    this.customerId = null;
    this.totalBasePrice = 0;
    this.reference = null;
    this.saleReturnExists = false;
  }

  connectedCallback() {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
    });

    document.addEventListener('go-summary2', (event) => {
      this.shadow.querySelector('.summary').classList.add('visible');
      this.shadow.querySelector('.arrow-button-container').classList.remove('hide');
      this.loadData(event.detail.orderId);
    });

    this.render();
  }

  async loadData(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
      },
    })
    const data = await response.json();
    this.previousOrders = data.rows;
    this.currentSaleId = id;
    this.saleReturnExists = data.saleReturnExists;
    this.totalBasePrice = this.previousOrders.reduce((total, order) => total + order.basePrice * order.quantity, 0);
    this.updatePreviousOrders(this.previousOrders);
  }

  updatePreviousOrders(previousOrders = []) {
    const summaryContainer = this.shadow.querySelector('.summary')
    summaryContainer.innerHTML = ''

    const summaryTitle = document.createElement('div')
    summaryTitle.className = 'summary-title'
    summaryTitle.textContent = 'Pedidos Anteriores'
    summaryContainer.appendChild(summaryTitle)

    previousOrders.forEach(order => {
      const orderDiv = document.createElement('div')
      orderDiv.className = 'previous-order-item'
      orderDiv.innerHTML = `
        <span>${order.productName}</span>: ${order.basePrice}€ (Fecha: ${order.createdAt}) - Cantidad: ${order.quantity}
      `;
      summaryContainer.appendChild(orderDiv)
    });

    if (this.saleReturnExists) {
      const returnMessage = document.createElement('div')
      returnMessage.className = 'return-message'
      returnMessage.textContent = 'Este pedido ha sido devuelto.'
      summaryContainer.appendChild(returnMessage)
    } else {
      const returnButton = document.createElement('button')
      returnButton.className = 'return-button'
      returnButton.textContent = 'Procesar Devolución Completa'
      returnButton.addEventListener('click', () => this.processReturn())
      summaryContainer.appendChild(returnButton)
    }
  }


  async processReturn() {
    const saleReturn = {
      saleId: this.currentSaleId,
      totalBasePrice: this.totalBasePrice.toFixed(2),
      returnDate: new Date().toISOString().split('T')[0],
      returnTime: new Date().toISOString().split('T')[1].split('.')[0]
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpointReturn')}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleReturn)
      });

      if (response.ok) {
        const result = await response.json()
        alert('Devolución procesada exitosamente')
        this.shadow.querySelector('.arrow-button-container').classList.add('hide')
        this.shadow.querySelector('.summary').classList.remove('visible')

        const event = new CustomEvent('go-products2')
        document.dispatchEvent(event)

      } else {
        throw new Error('Error al procesar la devolución')
      }
    } catch (error) {
      console.error(error)
      alert('Hubo un error al procesar la devolución')
    }
  }

  render() {
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
        .previous-order-item {
          margin-bottom: 10px;
        }
        .return-message {
          color: red;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .return-button {
          margin-top: 10px;
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .return-button:hover {
          background-color: #218838;
        }
        .total {
          margin-top: 20px;
          font-size: 1.25rem;
          font-weight: bold;
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
    `;

    const arrowButtonContainer = document.createElement('div')
    arrowButtonContainer.className = 'arrow-button-container hide'
    this.shadow.appendChild(arrowButtonContainer)

    const arrowButton = document.createElement('button')
    arrowButton.className = 'arrow-button'
    arrowButton.innerHTML = '<span>&#x25C0;</span>'
    arrowButtonContainer.appendChild(arrowButton)

    const summaryContainer = document.createElement('div')
    summaryContainer.className = 'summary'
    this.shadow.appendChild(summaryContainer)

    this.updatePreviousOrders(this.previousOrders)

    arrowButton.addEventListener('click', () => {
      this.shadow.querySelector('.arrow-button-container').classList.add('hide')
      this.shadow.querySelector('.summary').classList.remove('visible')

      const event = new CustomEvent('go-products2')
      document.dispatchEvent(event)
    })
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}

customElements.define('summary-return-component', ProductSummaryComponent)
