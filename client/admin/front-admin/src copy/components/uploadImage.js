import { store } from '../redux/store.js'
import { setImageGallery } from '../redux/images-slice.js'

class UploadImage extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    this.name = this.getAttribute('name')
    console.log(this.name)
  }

  render () {
    this.shadow.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
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

    const upButton = this.shadow.querySelector('.square')
    upButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('showGalleryModal', {
      }))
    })
  }
}

customElements.define('upload-image-component', UploadImage)
