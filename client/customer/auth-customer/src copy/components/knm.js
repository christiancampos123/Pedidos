class KonamiCode extends HTMLElement {
  constructor () {
    super()
    this.codeIndex = 0
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown (event) {
    const key = event.code

    if (key === this.konamiCode[this.codeIndex]) {
      this.codeIndex++

      if (this.codeIndex === this.konamiCode.length) {
        this.triggerKonami()
        this.codeIndex = 0
      }
    } else {
      this.codeIndex = 0
    }
  }

  triggerKonami () {
    const secretEvent = new CustomEvent('custom-notification', {
      detail: {
        message: 'Desarrollado por Christian',
        color: 'green'
      }
    })

    document.dispatchEvent(secretEvent)
  }
}

customElements.define('knm-component', KonamiCode)
