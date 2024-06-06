class ActivacionComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (!token) {
      window.location.href = '/'
    }
    this.render()
  }

  render () {
    this.shadow.innerHTML = `
      <style>
        /* Estilos del modal */
        .modal-activate {
          display: flex;
          width: 30%;
          height: auto;
          flex-direction: column;
          align-items: center;
          position: fixed;
          z-index: 3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #activate-form{
          flex-direction: column;
          display: flex;
          width: 90%;
        }

        .title {
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        /* Estilos para los campos del formulario */
        .form-input {
          margin-bottom: 10px;
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box; /* Asegura que el padding y el borde no aumenten el tamaño total */
        }

        /* Estilos para el botón de enviar */
        .form-submit {
          margin-top: 2rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        /* Estilos para el enlace de olvidé mi contraseña */
        .forgot-password {
          margin-top: 2rem;
          text-align: center;
          margin-top: 10px;
        }
      </style>
      <div class="modal-activate">
        <div class="title">Cambiar password</div>
        <form id="activate-form">
          <input type="password" name="password1" class="form-input" placeholder="Contraseña">
          <input type="password" name="password2" class="form-input" placeholder="Repetir Contraseña">
    
          <button type="submit" class="form-submit">poner pass</button>
        </form>
      </div>
    `

    const form = this.shadow.querySelector('#activate-form')
    form.addEventListener('submit', this.handlesubmit.bind(this))
  }

  async handlesubmit (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const password = formData.get('password1')
    const password2 = formData.get('password2')

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, password })
    })
    alert(`Contraseña: ${password}\nRepetir Contraseña: ${password2}\n${token}`)
  }
}

customElements.define('activacion-component', ActivacionComponent)
