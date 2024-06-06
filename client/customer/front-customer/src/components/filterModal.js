class FilterModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    // this.title = this.getAttribute('title')
  }

  connectedCallback () {
    document.addEventListener('showFilterModal', this.handleShowFilterModal.bind(this))

    this.render()
  }

  handleShowFilterModal (event) {
    const background = document.querySelector('.background-block')
    background.classList.add('background-block-active')
    const filterMenu = this.shadow.querySelector('.filter-modal')
    filterMenu.classList.add('filter-modal-active')
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

                /* mdoal filtro VVVVVVVV*/
                .filter-modal {
                display: none;
                }

                .filter-modal-active {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3;
                }

                .filter-modal-form {
                border: solid;
                border-color: white;
                box-shadow: 0.25rem 0.25rem 0.5rem rgb(255, 255, 255);
                position: fixed;
                display: flex;
                flex-direction: column;
                opacity: 1;
                width: 20%;
                background-color: hsl(226, 63%, 45%);
                padding: 2rem 2rem;
                }

                .filter-modal-form-title {
                display: flex;
                justify-content: center;
                margin-bottom: 2rem;
                }

                .filter-inside-buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                gap: 2rem;
                }

                .filter-inside-buttons-accept {
                background-color: #02A8B1;
                }

                .filter-inside-buttons-decline {
                background-color: #D74242;
                }




                .form-row {
                display: flex;
                gap: 2rem;
                }

                .form-element {
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
                }

                .form-element-label label {
                font-weight: 700;
                }

                .form-element-input * {
                background-color: hsl(226, 64%, 66%);
                border: none;
                box-sizing: border-box;
                font-size: 1rem;
                height: 2rem;
                outline: transparent;
                padding: 0.5rem;
                width: 100%;
                }

                .form-element-input input[type="number"]::-webkit-outer-spin-button,
                .form-element-input input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }

                .form-element-input input[type="date"]::-webkit-calendar-picker-indicator,
                .form-element-input input[type="time"]::-webkit-calendar-picker-indicator {
                filter: invert(1);
                }

                .form-element-input textarea {
                height: 20vh;
                resize: none;
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



                .modal-delete-box-label {
                padding: 2rem 6rem;

                }

                .modal-delete-box-buttons {
                display: flex;
                width: 100%;
                gap: 2rem;
                }

                .modal-buttons{
                display: flex;
                justify-content: center;
                padding: 0.7rem;
                width: 100%;
                color: white;
                }

                .modal-delete-box-buttons-accept {
                background-color: #02A8B1;
                }

                .modal-delete-box-buttons-decline {
                background-color: #D74242;
                }


            </style>
        
            <!-- ventana modal del filtro -->
            <section class="filter-modal">
            <div class="filter-modal-form">
            <label class="filter-modal-form-title" for="">
                <h2>Filtrar Tabla</h2>
            </label>
            <!-- form inside -->
            <div class="form-row">
                <div class="form-element">
                <div class="form-element-label">
                    <label for="email">
                    Nombre
                    </label>
                </div>
                <div class="form-element-input">
                    <input type="email">
                </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-element">
                <div class="form-element-label">
                    <label for="email">
                    mail
                    </label>
                </div>
                <div class="form-element-input">
                    <input type="email">
                </div>
                </div>
            </div>
            
            <section class="filter-inside-buttons">
                <button class="filter-inside-buttons-accept modal-buttons">Filtrar</button>
                <button class="filter-inside-buttons-decline modal-buttons">Cancelar</button>
            </section>
            
            </div>
            </section>

            `
    // modal
    const buttonAccept = this.shadow.querySelector('.filter-inside-buttons-accept')
    const buttonDecline = this.shadow.querySelector('.filter-inside-buttons-decline')

    buttonAccept?.addEventListener('click', () => {
      this.closeModal()
    })

    buttonDecline?.addEventListener('click', () => {
      this.closeModal()
    })
  }

  openModal () {
    const filterMenu = this.shadow.querySelector('.filter-modal')
    filterMenu.classList.add('filter-modal-active')
  }

  closeModal () {
    // const background = this.shadow.querySelector(".background-block");
    const filterMenu = this.shadow.querySelector('.filter-modal')
    const background = document.querySelector('.background-block')

    background.classList.remove('background-block-active')
    filterMenu.classList.remove('filter-modal-active')
  }
}

customElements.define('filter-modal', FilterModal)
