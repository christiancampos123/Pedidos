class PageComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.basePath = this.getAttribute('base-path') || ''
  }

  connectedCallback () {
    this.render()
    window.onpopstate = () => this.handleRouteChange()
  }

  handleRouteChange () {
    this.render()
  }

  render () {
    const path = window.location.pathname
    this.getTemplate(path)
  }

  async getTemplate (path) {
    const routes = {
      '/cliente': 'home.html',
      '/cliente/pedidos': 'pedidos.html',
      '/cliente/resumen': 'resumen.html',
      '/cliente/pedidoexitoso': 'exito.html',
      '/cliente/pedidosanteriores': 'pedidosAnteriores.html'
    }

    const filename = routes[path] || '404.html'

    await this.loadPage(filename)
  }

  async loadPage (filename) {
    const response = await fetch(`${this.basePath}/pages/${filename}`)
    const html = await response.text()

    document.startViewTransition(() => {
      this.shadowRoot.innerHTML = `
        <style>
          .order-component {
            display: none;
          }
          .summary-component {
            display: none;

          }
        </style>
        ${html}
      `
      document.documentElement.scrollTop = 0
    })
  }
}

customElements.define('page-component', PageComponent)