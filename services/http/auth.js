import { http } from './config'

/**
 * @author Andrews
 * 
 * Serviço de auth do sistema
 */

export default {

  /**
   * autenticação na API do sistema
   */
  login: (username, password) => {
    let body = new FormData()

    let base64 = btoa(`${process.env.credentials.name}:${process.env.credentials.secret}`)

    let client_credentials = `Basic ${base64}`;

    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password)

    return http.post("/oauth/token",
      body, { headers: { 'Authorization': client_credentials } })
      .then(res => {
        // armazenando tokens no storage
        let auth = {
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken
        }
        localStorage.setItem("auth", JSON.stringify(auth))
      })
  },

  getExternalCredentials: () => {    

    let base64 = btoa(`${process.env.credentials.external.name}:${process.env.credentials.external.secret}`)

    let client_credentials = `Basic ${base64}`;
    let body = { grant_type: "client_credentials" };

    return http.post("oauth/token",
      body, { headers: { 'Authorization': client_credentials } })
  },

  signUp: (form, token) => {
    return http.post("api/v1/user", form, { headers: { 'Authorization': `Bearer ${token}` } })
  },

  /**
   * Método para salvar as informações do usuário no local storage
   * 
   * TODO - Ramificar em um serviço específico de usuário. 
   */
  getInfoUser: () => {
    let auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      return http.get("/api/v1/user/me", { headers: { 'Authorization': auth.accessToken } })
        .then(
          res => {
            let user = {
              name: res.data.name || "Anônimo",
              type : res.data.type || "Visitante"
            }
            localStorage.setItem("user", JSON.stringify(user));
          }
        )
    }
    else {
      $nuxt._router.push("/login");
    }

  }
}