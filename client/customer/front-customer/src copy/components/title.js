class Title extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */
      `
      <style>
        h1{
          color: hsl(0, 0%, 100%);
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
        }
      </style>
  
    <div class="top-bar-title">
        <h1>${this.title}</h1>
    </div>
      `
  }
}

customElements.define('title-component', Title)
