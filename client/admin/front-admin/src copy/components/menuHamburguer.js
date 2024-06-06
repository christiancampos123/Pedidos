class Menu extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
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

        /* boton menu y menu oculto */
        .top-bar-hamburguer {
          z-index: 2;
          position: relative;
        }

        .top-bar-hamburguer button svg {
          width: 3rem;
        }

        /* Animacion svg vvvvvvvvvvvvvv */
        .menu {
          background-color: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          padding: 0;
        }

        .menu:hover .line {
          stroke-width: 8;
          stroke: orange;
        }

        .line {
          fill: none;
          stroke: hsl(0, 0%, 100%);
          stroke-width: 6;

          transition: stroke-dasharray 400ms cubic-bezier(0.4, 0, 0.2, 1),
            stroke-dashoffset 400ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .line1 {
          stroke-dasharray: 60 207;
          stroke-width: 6;
        }

        .line2 {
          stroke-dasharray: 60 60;
          stroke-width: 6;
        }

        .line3 {
          stroke-dasharray: 60 207;
          stroke-width: 6;
        }

        .opened .line1 {
          stroke: hsl(0, 0%, 0%);
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
          stroke-width: 6;
        }

        .opened .line2 {
          stroke: hsl(0, 0%, 0%);
          stroke-dasharray: 1 60;
          stroke-dashoffset: -30;
          stroke-width: 6;
        }

        .opened .line3 {
          stroke: hsl(0, 0%, 0%);
          stroke-dasharray: 90 207;
          stroke-dashoffset: -134;
          stroke-width: 6;
        }

        /* Menu desplegable Hamburger  vvvvvvvvvvvvvv */
        .full-menu {
          background-color: rgb(84, 61, 218);
          height: 100vh;
          top: -100vh; /* Menú oculto arriba del viewport */
          display:flex;
          opacity:0;
          justify-content: center;
          left: 0;
          margin: 0;
          overflow: hidden;
          position: fixed;
          transition: top 0.3s, opacity 0.3s;
          width: 100%;
          z-index: 0;
          box-sizing: border-box;
        }


        .full-menu-active {
          opacity:1;
          display: flex;
          position: fixed;
          height: 100vh;
          justify-content: center;
          padding-top: 2rem;
          box-sizing: border-box;
          z-index: 0;
          top: 0; /* Menú visible en la parte superior del viewport */
          
        }


        /* Menu desplegable Hamburger ^^^^^^^^^^^^*/

        .menu-form {
          align-items: center;
          display: flex;
          flex-direction: column;
          width: 80%;
        }

        .menu-form-title {
          margin-bottom: 3rem;
        }

        .menu-form .form-row {
          width: 100%;
        }
        .form {
          flex: 2;
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

        .block {
          height: 10vh;
        }

        .border-red{
          border: 1px solid red;
        }

        .tab-content{
          display:none;
        }

        .display {
          display: block;
        }

        .top-bar-hamburguer-active {
          z-index: 6;
        }
      </style>
      <div class="background-block">

      </div>
    <!-- Boton de hamburguesa -->
    <div class="top-bar-hamburguer">
      <button class="menu">
        <svg viewBox="0 0 100 100">
          <path class="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
          <path class="line line2" d="M 20,50 H 80" />
          <path class="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>
      </button>
    </div>
    <!-- Menu desplegado -->
    <div class="full-menu">
      <section class="menu-form">
        <div class="menu-form-title">
          <h2>Menu desplegable</h2>
        </div>
        <div class="form-row">
          <div class="form-element">
            <div class="form-element-label">
              <label for="name">
                Nombre
              </label>
            </div>
            <div class="form-element-input">
              <input type="text">
            </div>
          </div>
          <div class="form-element">
            <div class="form-element-label">
              <label for="email">
                Email
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
              <label for="name">
                Nombre
              </label>
            </div>
            <div class="form-element-input">
              <input type="text">
            </div>
          </div>
          <div class="form-element">
            <div class="form-element-label">
              <label for="email">
                Email
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
                Email
              </label>
            </div>
            <div class="form-element-input">
              <input type="email">
            </div>
          </div>
        </div>
      </section>
    </div>

      `
    const menu = this.shadow.querySelector('.full-menu')
    const boton = this.shadow.querySelector('.top-bar-hamburguer')
    const svg = this.shadow.querySelector('.menu')

    boton?.addEventListener('click', () => {
      menu.classList.toggle('full-menu-active')
      boton.classList.toggle('top-bar-hamburguer-active')
      svg.classList.toggle('opened')
    })
  }
}

customElements.define('menu-component', Menu)
