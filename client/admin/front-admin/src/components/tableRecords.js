class TableRecords extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
    this.datas = null
    this.currentPage = 1
  }

  connectedCallback () {
    document.addEventListener('refresh-table-records', this.handleTableRecords.bind(this))
    // delete-tab
    this.loadData(this.currentPage).then(() => this.render())
  }

  handleTableRecords () {
    this.loadData(this.currentPage).then(() => this.render())
  }

  async loadData (page) {
    console.log(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}?size=10&page=${page}`)
    page = page || 1
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}?size=10&page=${page}`)
    const data = await response.json()
    this.rows = data.rows
    this.datas = data
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */
      `
        <style>

          * {
            margin: 0;
            padding: 0;
          }

          section {
            margin: 0;
            padding: 0;
          }

          .none {
            display: none;
          }

          button {
            background: transparent;
            border: none;
            cursor: pointer;
          }

          a {
            text-decoration: none;
          }

          ul {
            list-style: none;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
          }


          input,
          label,
          select,
          textarea,
          li,
          span,
          p {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
          }
                      .filter {
            align-items: center;
            background-color: hsl(0, 0%, 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0.2rem 0;
          }

          .filter-button button svg {
            width: 2rem;
          }

          .filter-button button svg path {
            fill: hsl(207, 85%, 69%);
          }

          .filter-button button:hover svg path {
            fill: hsl(34, 79%, 53%);
          }

          .table-component {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 1rem;
          }

          .table-buttons {
            background-color: hsl(207, 85%, 69%);
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
          }

          .edit-button button svg,
          .delete-button button svg {
            width: 2rem;
          }

          .edit-button button svg path,
          .delete-button button svg path {
            fill: hsl(0, 0%, 100%);
          }

          .edit-button button:hover svg path,
          .delete-button button:hover svg path {
            fill: hsl(34, 79%, 53%);
          }

                      .table-data {
            background-color: hsl(226, 64%, 66%);
            padding: 0.5rem;
          }

          .table-data ul {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .table-data ul li span {
            font-weight: 700;
          }

          .table-data ul li span:first-child::after {
            content: ":";
            margin-right: 0.5rem;
          }

          .table-records {
            max-height: 600px; /* o el valor que prefieras */
            overflow: auto;
          }

          .table-records::-webkit-scrollbar {
            width: 6px; /* Grosor de la barra de desplazamiento */
          }

          .table-records::-webkit-scrollbar-thumb {
            background-color: #888; /* Color del control deslizante */
            border-radius: 3px; /* Redondea las esquinas del control deslizante */
          }

          .table-record{
            margin-bottom:1.5rem;
          }

          .pagination {
              display: flex;
              align-items: center;
              justify-content: center;
          }

          .btn {
              padding: 8px 16px;
              margin: 0 5px;
              border: none;
              border-radius: 5px;
              background-color: #007bff;
              color: #fff;
              cursor: pointer;
              transition: background-color 0.3s ease;
          }

          .btn:hover {
              background-color: #0056b3;
          }

          .page-number {
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #f0f0f0;
              border-radius: 5px;
              margin: 0 5px;
          }

          .remaining-pages {
              margin-left: 10px;
          }

        </style>
    

        <section class="table-component">
          <section class="filter">
            <div class="filter-button">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>filter-menu</title>
                    <path
                    d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" />
                </svg>
                </button>
            </div>
            </section>

            <div class="table-records"></div>

            <div class="pagination">
              <button class="btn prev">Anterior</button>
              <div class="page-number"></div>
              <button class="btn next">Siguiente</button>
              <div class="remaining-pages"><span></span></div>
            </div>

          <!--
            <article class="table-record">
              <div class="table-buttons">
                  <div class="edit-button">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                    </button>
                  </div>
                  <div class="delete-button">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </button>
                  </div>
              </div>
              <div class="table-data">
                  <ul>
                    <li><span>Email</span>bolitakinki69@hotmail.com</li>
                    <li><span>Nombre</span>Carlos</li>
                  </ul>
              </div>
            </article>
          -->
          <div class="page-bar">
          </div>
          </section>
        `
    const contenedor = this.shadow.querySelector('.table-records')

    // console.log(this.datas.count)
    const next = this.shadow.querySelector

    this.rows.forEach(row => {
      // Crea el elemento article
      const article = document.createElement('article')
      article.classList.add('table-record')

      // Crea el div con los botones de editar y borrar
      const divButtons = document.createElement('div')
      divButtons.className = 'table-buttons'

      // Botón de editar
      const editButtonDiv = document.createElement('div')
      editButtonDiv.classList.add('edit-button')
      editButtonDiv.dataset.id = row.id
      const editButton = document.createElement('button')
      editButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>`
      editButtonDiv.appendChild(editButton)

      // Botón de borrar
      const deleteButtonDiv = document.createElement('div')
      deleteButtonDiv.classList.add('delete-button')
      deleteButtonDiv.dataset.id = row.id
      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`
      deleteButtonDiv.appendChild(deleteButton)

      // Agrega los botones al div de botones
      divButtons.appendChild(editButtonDiv)
      divButtons.appendChild(deleteButtonDiv)

      // Crea el div con los datos de la tabla
      const divData = document.createElement('div')
      divData.classList.add('table-data')
      const ul = document.createElement('ul')
      divData.appendChild(ul)

      Object.entries(row).forEach(([key, value]) => {
        const li = document.createElement('li')
        ul.appendChild(li)

        const spanKey = document.createElement('span')
        spanKey.textContent = key
        li.appendChild(spanKey)

        const spanValue = document.createElement('span')
        spanValue.textContent = value
        li.appendChild(spanValue)
      })

      // Agrega los divs al article
      article.appendChild(divButtons)
      article.appendChild(divData)

      // Agrega el article al contenedor
      contenedor.appendChild(article)

      const pageNumber = this.shadowRoot.querySelector('.remaining-pages')
      pageNumber.innerHTML = `${this.datas.meta.pages}`

      const actualPage = this.shadowRoot.querySelector('.page-number')
      actualPage.innerHTML = `${this.datas.meta.currentPage}`
      // console.log(row)
    })

    const filterButton = this.shadow.querySelector('.filter-button')

    filterButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('showFilterModal', {
      }))
    })

    const tableSection = this.shadow.querySelector('.table-component')
    tableSection?.addEventListener('click', async (event) => {
      if (event.target.closest('.edit-button')) {
        // todo
        const id = event.target.closest('.edit-button').dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`)
        const data = await response.json()
        this.rows = data.rows
        document.dispatchEvent(new CustomEvent('showElement', {
          detail: {
            element: data
          }
        }))
        // console.log(fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}?size=10&id=${id}`))
      }

      if (event.target.closest('.delete-button')) {
        // alert(event.target.closest('.delete-button').dataset.id)
        document.dispatchEvent(new CustomEvent('showDeleteModal', {
          detail: {
            id: `${this.getAttribute('endpoint')}/${event.target.closest('.delete-button').dataset.id}`
          }
        }))
      }
    })
  }
}

customElements.define('table-records-component', TableRecords)
