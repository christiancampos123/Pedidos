class LoginComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        /* Estilos del modal */
        .modal-login {
          display: flex;
          width: 90%; /* Ajuste de ancho para móviles */
          max-width: 400px; /* Máximo ancho para evitar que se extienda demasiado */
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
          box-sizing: border-box; /* Asegura que el padding y el borde no aumenten el tamaño total */
        }

        .title {
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        /* Estilos para los campos del formulario */
        .form-input {
          margin-bottom: 10px;
          width: 90%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        /* Estilos para el botón de enviar */
        .form-submit {
          margin-top: 3rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        /* Estilos para el enlace de olvidé mi contraseña */
        .forgot-password {
          margin-top: 2rem;
          text-align: center;
        }

        /* Media query para dispositivos móviles */
        @media (max-width: 600px) {
          .modal-login {
            width: 95%;
            padding: 15px;
          }

          .title {
            font-size: 1.5rem;
          }

          .form-submit {
            padding: 10px;
            margin-top: 2rem;
          }

          .forgot-password {
            margin-top: 1rem;
          }
        }
      </style>
      <div class="modal-login">
        <div class="title">LOGIN CLIENTE</div>
        <form id="login-form">
          <input type="text" name="email" class="form-input" placeholder="email">
          <input type="password" name="password" class="form-input" placeholder="Contraseña">
          <button type="submit" class="form-submit">Iniciar sesión</button>
        </form>
        <div class="forgot-password">
          <a href="http://dev-chrishop.com/admin/login/reset">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    `

    const form = this.shadow.querySelector('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitForm(form)
    })
  }

  async submitForm(form) {
    const endpoint = import.meta.env.VITE_API_URL
    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())
    alert(JSON.stringify(formDataJson))

    try {
      const result = await fetch(`${endpoint}/api/auth/customer/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
      })

      if (result.ok) {
        const data = await result.json()
        console.log(data)
        localStorage.setItem("customerAccessToken", data.customerAccessToken)
        window.location.href = data.redirection
      } else {
        const error = await result.json()
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

customElements.define('login-component', LoginComponent)
