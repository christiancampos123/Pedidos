class MobileHeader extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    // Read the title attribute
    const title = this.getAttribute('title') || 'Mi Aplicación'
    const logoSrc = this.getAttribute('logo-src') || 'logo.png' // Default logo source

    this.shadow.innerHTML = `
      <style>
        .header {
          position:fixed;
          top:0;
          z-index:100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        .header-title {
          font-size: 1.5rem;
        }

        .header-logo img {
          width: 40px;
          height: 40px;
        }

        @media (max-width: 600px) {
          .header {
            padding: 10px;
          }

          .header-title {
            font-size: 1.25rem;
          }

          .header-logo img {
            width: 35px;
            height: 35px;
          }
        }
      </style>
      <div class="header">
        <div class="header-title">${title}</div>
        <div class="header-logo">
          <img src="${logoSrc}" alt="Logo">
        </div>
      </div>
    `
  }
}

customElements.define('mobile-header-component', MobileHeader)
