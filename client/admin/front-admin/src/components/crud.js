class Crud extends HTMLElement {
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
        .crud {
          display: flex;
          gap: 5%;
          justify-content: space-between;
        }

        .table {
          flex: 1;
        }

        .form {
          flex: 2;
        }
      </style>
  
      <div class="crud">
        <section class="table">
          <slot name="table">
        </section>
        <section class="form">
          <slot name="form">
        </section>
      </div>
      `
  }
}

customElements.define('crud-component', Crud)
