class ModalDestroy extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.id = null
  }

  connectedCallback () {
    document.addEventListener('showDeleteModal', this.handleShowDeleteModal.bind(this))

    this.render()
  }

  handleShowDeleteModal (event) {
    const background = this.shadow.querySelector('.background-block')
    background.classList.add('background-block-active')
    const deleteModal = this.shadow.querySelector('.modal-delete')
    deleteModal.classList.add('modal-delete-active')
    this.id = event.detail.id
  }

  render () {
    this.shadow.innerHTML =
            /* html */
            `
        <style>
            /* modal de delete VVVVVVVV */
            .modal-delete {
            display: none;
            color:white;
            }

            .modal-delete-active {
            position: fixed;
            z-index: 3;
            height: 100vh;
            width: 100%;
            top: 0;
            left: 0;
            justify-content: center;
            align-items: center;
            display: flex;
            }

            .modal-delete-box {
            border: solid;
            border-color: white;
            background-color: hsl(226, 63%, 45%);
            padding: 1rem;
            box-shadow: 0.25rem 0.25rem 0.5rem rgb(255, 255, 255);
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
            color:white;
            }

            .modal-delete-box-buttons-accept {
            background-color: #02A8B1;
            }

            .modal-delete-box-buttons-decline {
            background-color: #D74242;
            }

            .background-block-active {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: grey;
              opacity: 0.5;
              z-index: 2;
            }



            /* modal de delete ^^^^^^^^^^ */
        </style>
    
    <div class="background-block"></div>
    <section class="modal-delete">
        <div class="modal-delete-box">
            <div class="modal-delete-box-label">
                <h3>desea eliminar?</h3>
            </div>
            <div class="modal-delete-box-buttons">
                <button class="modal-delete-box-buttons-accept modal-buttons">
                aceptar
                </button>
                <button class="modal-delete-box-buttons-decline modal-buttons">
                cancelar
                </button>
            </div>
        </div>
    </section>
        `
    const acceptButton = this.shadow.querySelector('.modal-delete-box-buttons-accept')
    const cancelButton = this.shadow.querySelector('.modal-delete-box-buttons-decline')

    acceptButton?.addEventListener('click', async (event) => {
      // alert(this.id)
      const endpoint = this.id
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 500 || response.status === 422) {
          throw response
        }

        const deleteNotification = new CustomEvent('custom-notification', {
          detail: {
            message: 'Se ha eliminado',
            color: 'red'
          }
        })

        document.dispatchEvent(deleteNotification)
        const refreshTableRecords = new CustomEvent('refresh-table-records', {
        })
        document.dispatchEvent(refreshTableRecords)
      } catch (response) {

      }
      // document.dispatchEvent(new CustomEvent('delete-tab', {
      //   detail: {
      //     id: this.id
      //   }
      // }))

      this.closeModal()
    })

    cancelButton?.addEventListener('click', () => {
      this.closeModal()
    })
  }

  closeModal () {
    const deleteModal = this.shadow.querySelector('.modal-delete')
    const background = this.shadow.querySelector('.background-block')
    background.classList.remove('background-block-active')
    deleteModal.classList.remove('modal-delete-active')
  }
}

customElements.define('modal-destroy-component', ModalDestroy)
