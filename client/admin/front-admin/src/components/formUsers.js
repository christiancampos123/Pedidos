import { store } from '../redux/store.js'
import { removeImages, showImages } from '../redux/images-slice.js'

class Form extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showElement', this.handleShowElement.bind(this))
    // document.addEventListener('delete-tab', this.handleDeleteRecord.bind(this))
    this.render()
  }

  handleShowElement (event) {
    this.showElement(event.detail.element)
  }

  // handleDeleteRecord (event) {
  //   this.deleteRecord(event.detail.id)
  // }

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
  color: white;
  font-family: 'Roboto', sans-serif;
}

input,
label,
select,
textarea,
li,
span,
div,
p {
  color: hsl(0, 0%, 100%);
  font-family: 'Roboto', sans-serif;
}

.form {
    flex: 2;
}

.form-top-bar{
    display: flex;
    justify-content: center;
    background-color: white;
    height: 3rem;
    width: 100%;
    margin-bottom: 2rem;

}
.tabs{
    display: flex;
    height: 100%;
    width: 100%;
}

.tab{
    background-color: #b0b0b0;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
}

.tab:hover{
  background-color: #e5a450;
}

.tab button{
    color: blue;
    pointer-events: none;
    cursor: not-allowed;
}

.tab.active button{
    color: white;
}

.tab.active{
    background-color: #e69428;
    color: white;
}

.tab-contents{
  width: 100%;
}

.tab-content.active{
  width: 100%;
  display: block;
}

.tab-content{
  display: none;
}

.form-buttons {
  background-color: hsl(0, 0%, 100%);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem;
  padding-right: 0.5rem;
}

.create-button button svg,
.store-button button svg {
  width: 2rem;
    
}

.create-button button svg path,
.store-button button svg path {
  fill: #6db7f3;
}

.create-button button:hover svg path,
.store-button button:hover svg path {
  fill: #e69428;
}

.form-row{
  display: flex;
  gap: 1rem;
}

.form-element {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
}

.form-element-input * {
  background-color: #718be0;
  border: none;
  box-sizing: border-box;
  font-size: 1rem;
  outline: transparent;
  padding: 0.5rem;
  width: 100%;
}

textarea{
  height: 15vh;
}

.language-contents{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 5rem;
}

.form-language-bar{
  background-color: white;
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

select {
  cursor: pointer;
}

.errors-modal{
  display:none;
  background-color: grey;
}

.errors-modal.active{
  display:flex;
  flex-direction:column;
  background-color: grey;
  cursor:pointer;
  padding:0.5rem;
}

.errors-modal-title{
  margin-bottom:0.7rem;
}

ul{
  margin:0;
  padding:0;
}




        </style>
<div class="form">
  <form class="base-form">
    <div class="form-top-bar">
      <div class="tabs">
        <div class="tab active" data-tab="general">
            General
        </div>
        <div class="tab" data-tab="images">
            Imágenes
        </div>
      </div>
      <div class="form-buttons">
        <div class="create-button"  data-endpoint="">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
          </button>
        </div>
        <div class="store-button" data-endpoint="">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
          </button>
        </div>
      </div>
    </div>



    <div class="errors-modal">
    <div class=errors-modal-title> Errores</div>
      <ul>
      </ul>
    </div>
  
    <input type="hidden" name="id" value="">
    <div class="tab-contents">
      <div class="tab-content active" data-tab="general">
        <div class="form-row">
          <div class="form-element">
            <div class="form-element-label">
              <label for="title">
                Nombre
              </label>
            </div>
            <div class="form-element-input">
              <input type="text" name="name" value="">
            </div>
          </div>
      </div>
              <div class="form-row">
              <div class="form-element">
                <div class="form-element-label">
                  <label for="mail">
                    Email
                  </label>
                </div>
                <div class="form-element-input">
                  <input type="text" name="email" value="">
                </div>
              </div>
            </div>
            </div>

          </div>
      </div>

      <!-- image Gallery -->
      <div class="tab-content" data-tab="images">
      <upload-image-component name="featureImage" image-configuration='{
        "xs": {
          "widthPx": "60",
          "heightPx": "60"
        },
        "sm": {
          "widthPx": "120",
          "heightPx": "120"
        },
        "md": {
          "widthPx": "240",
          "heightPx": "240"
        },
        "lg": {
          "widthPx": "480",
          "heightPx": "480"
        }
      }' type="single"> </upload-image-component>

      </div>
    </div>
  </form>
</div>


        `

    const main = this.shadow.querySelector('.form')

    main?.addEventListener('click', async (event) => {
      event.preventDefault()
      if (event.target.closest('.errors-modal')) {
        const modalError = this.shadow.querySelector('.errors-modal')
        modalError.classList.remove('active')// Ocultar el modal al hacer clic en el botón de cierre
      }
      // Si el evento se origina dentro del botón de guardar
      if (event.target.closest('.store-button')) {
        const form = this.shadow.querySelector('.base-form')
        const formData = new FormData(form)

        const formDataJson = {}
        formDataJson.images = store.getState().images.selectedImages

        for (const [key, value] of formData.entries()) {
          if (key.includes('locales')) {
            const [prefix, locales, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            if (!(locales in formDataJson[prefix])) {
              formDataJson[prefix][locales] = {}
            }

            formDataJson[prefix][locales][field] = value ?? null
          } else if (key.includes('.')) {
            const [prefix, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            formDataJson[prefix][field] = value ?? null
          } else {
            formDataJson[key] = value ?? null
          }
        }

        const endpoint = formDataJson.id ? `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`
        console.log(endpoint)
        const method = formDataJson.id ? 'PUT' : 'POST'
        delete formDataJson.id

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (response.status === 500 || response.status === 422) {
            throw response
          }

          const data = await response.json()

          const saveNotificationEvent = new CustomEvent('custom-notification', {
            detail: {
              message: 'Se ha guardado correctamente',
              color: 'green'
            }
          })

          document.dispatchEvent(saveNotificationEvent)
        } catch (response) {
          const errors = await response.json()
          const modalError = this.shadow.querySelector('.errors-modal')
          const ulElement = modalError.querySelector('ul')
          // Eliminar todos los elementos <li> existentes dentro de <ul>
          ulElement.innerHTML = ''
          errors.message.forEach(error => {
            const modalError = this.shadow.querySelector('.errors-modal')
            const ulElement = modalError.querySelector('ul')
            // Eliminar todos los elementos <li> existentes dentro de <ul>
            // ulElement.innerHTML = ''
            const liElement = document.createElement('li')
            liElement.textContent = error.message
            ulElement.appendChild(liElement)
          })
          // const modalError = this.shadow.querySelector('.errors-modal')
          modalError.classList.add('active')
        }

        document.dispatchEvent(new CustomEvent('refresh-table-records'))
        store.dispatch(removeImages())
        this.render()
      }

      if (event.target.closest('.create-button')) {
        // borrar formulario
        this.shadow.querySelector('form').reset()
        event.preventDefault()
        const broomNotificationEvent = new CustomEvent('custom-notification', {
          detail: {
            message: 'Se ha limpiado correctamente',
            color: 'red'
          }
        })
        // TODO limpiar imagenes
        store.dispatch(removeImages())
        document.dispatchEvent(broomNotificationEvent)
      }

      // event.preventDefault()

      if (event.target.closest('.tab')) {
        if (event.target.closest('.tab').classList.contains('active')) {
          return
        }

        const tabClicked = event.target.closest('.tab')
        const tabActive = tabClicked.parentElement.querySelector('.active')

        tabClicked.classList.add('active')
        tabActive.classList.remove('active')

        this.shadow.querySelector(`.tab-content.active[data-tab="${tabActive.dataset.tab}"]`).classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab="${tabClicked.dataset.tab}"]`).classList.add('active')
      }
    })
  }

  showElement (element, parentKey = '') {
    // console.log(element)
    Object.entries(element).forEach(([key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key
      if (typeof value === 'object' && value !== null && currentKey.includes('locales')) {
        this.showElement(value, currentKey)
      }
      if (typeof value === 'object' && value !== null && currentKey.includes('images')) {
        store.dispatch(showImages(value))
      } else {
        this.paintRecord(value, currentKey)
      }
    })
  }

  paintRecord (value, currentKey) {
    try {
      // console.log(currentKey)
      const input = this.shadow.querySelector(`input[name="${currentKey}"]`)
      if (input) {
        input.value = value
      }
    } catch {

    }
    try {
      const textarea = this.shadow.querySelector(`textarea[name="${currentKey}"]`)
      if (textarea) {
        textarea.value = value
      }
    } catch {

    }
  }

  deleteRecord (id) {
    alert(id)
  }
}

customElements.define('form-component-users', Form)
