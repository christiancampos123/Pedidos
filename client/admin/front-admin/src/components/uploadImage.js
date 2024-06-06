import { store } from '../redux/store.js'
import { setImageGallery, removeImage, addImage } from '../redux/images-slice.js'
import isEqual from 'lodash-es/isEqual'
class UploadImage extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.images = []
  }

  connectedCallback () {
    this.render()
    this.name = this.getAttribute('name')
    this.type = this.getAttribute('type')
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      // console.log('holili', currentState)
      if (currentState.images.showedImages.length > 0 && !isEqual(this.images, currentState.images.showedImages)) {
        this.images = currentState.images.showedImages
        this.getThumbnail(this.images)
      } else if (currentState.images.showedImages.length <= 0) {
        this.images = []
        this.removeThumbnails()
      }
    })
  }

  getThumbnail (images) {
    // this.images = imagesState.images.showedImages
    // const formElementInput = this.shadow.querySelector('.form-element-input')
    // formElementInput.querySelectorAll('.image-container').forEach(container => container.remove())
    const oldImages = this.shadow.querySelectorAll('.image-container')
    oldImages?.forEach(image => {
      image.remove()
    })
    images.forEach(image => {
      if (image.name === this.name) {
        const container = document.createElement('div')
        container.classList.add('image-container')

        const img = document.createElement('img')
        img.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${image.filename}`
        img.alt = `${this.name}`
        img.dataset.nombre = image.filename

        const closeIcon = document.createElement('div')
        closeIcon.classList.add('close-icon')
        closeIcon.textContent = 'x'

        container.appendChild(img)
        container.appendChild(closeIcon)
        closeIcon.addEventListener('click', (event) => {
          // alert(image.filename)
          store.dispatch(removeImage(image))
          container.remove()
          // formElementInput.remove()
        })

        this.shadow.querySelector('.form-element-input').appendChild(container)

        store.dispatch(addImage({
          ...image,
          imageConfiguration: this.getAttribute('image-configuration')
        }))
      }
    })
  }

  // getThumbnails (imagesState) {
  //   const images = imagesState.images.showedImages
  //   const formElementInput = this.shadow.querySelector('.form-element-input')
  //   formElementInput.querySelectorAll('.image-container').forEach(container => container.remove())
  //   images.forEach(image => {
  //     if (image.name === this.name) {
  //       const container = document.createElement('div')
  //       container.classList.add('image-container')

  //       const img = document.createElement('img')
  //       img.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${image.filename}`
  //       img.alt = `${this.name}`
  //       img.dataset.uploader = `${this.name}`
  //       img.dataset.nombre = image.filename

  //       const closeIcon = document.createElement('div')
  //       closeIcon.classList.add('close-icon')
  //       closeIcon.textContent = 'x'

  //       container.appendChild(img)
  //       container.appendChild(closeIcon)
  //       closeIcon.addEventListener('click', (event) => {
  //         // store.dispatch(removeImage(image))
  //         // formElementInput.remove()
  //       })

  //       this.shadow.querySelector('.form-element-input').appendChild(container)
  //     }
  //   })
  // }

  // deleteImages (object) {
  //   store.dispatch(removeImage(object))
  //   // console.log(store.getState())
  //   // this.getThumbnail(store.getState())
  //   // this.getThumbnail(this.currentState)
  //   // const container = object.closest('.image-container')
  //   // console.log(object)
  // }

  render () {
    this.shadow.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        .image-container {
            position: relative;
            display: inline-block;
            margin: 5px;
        }
        
        .close-icon {
            position: absolute;
            top: 5px;
            right: 5px;
            width:15px;
            height:15px;
            font-size: 14px;
            background-color: rgba(255, 255, 255, 0.5);
            color: black;
            padding: 2px;
            border-radius: 50%;
            visibility: hidden; /* Por defecto, ocultar el icono de cierre */
            cursor: pointer;
            background-color:red;
            display:flex;
            align-items:center;
            justify-content:center;
        }
        
        .image-container:hover .close-icon {
            visibility: visible; /* Mostrar el icono de cierre al hacer hover */
        }

        :host:hover{
          transform:scale(1.03);
        }

        /* Estilo para los divs */
        .square {
          width: 100px;
          height: 100px;
          border: 2px solid #ffffff;
          text-align: center;
          line-height: 100px;
          margin: 10px;
          cursor: pointer;
          transition: transform 0.15s ease-in-out;
        }

        .square:hover{
          transform: scale(102%);
        }

      </style>
      
      <div class="form-row">
      <div class="form-element">
        <div class="form-element-label">
        <!--
          <label for="main-image">
            Galeria de Imagenes
          </label>
          -->
        </div>
        <div class="form-element-input">
          <div class="square">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>
          </div>
        </div>
      </div>
    </div>
      `

    // const deleteButton = this.shadow.querySelector('.form-row')

    const upButton = this.shadow.querySelector('.square')
    upButton?.addEventListener('click', () => {
      const image = {
        name: this.getAttribute('name')
      }
      store.dispatch(setImageGallery(image))
      document.dispatchEvent(new CustomEvent('showGalleryModal', {
      }))
    })
  }

  removeThumbnails () {
    const images = this.shadow.querySelectorAll('.image-container')
    images.forEach(image => {
      image.remove()
    })
  }
}

customElements.define('upload-image-component', UploadImage)
