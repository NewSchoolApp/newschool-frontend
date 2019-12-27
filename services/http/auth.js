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

    let base64 = btoa(`${process.env.VUE_APP_CLIENT_CREDENTIAL_NAME}:${process.env.VUE_APP_CLIENT_CREDENTIAL_SECRET}`)

    let client_credentials = `Basic ${base64}`;

    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password)

    return http.post("/oauth/token",
      body, { headers: { 'Authorization': client_credentials } })
      .then(res => {
        // salvando propriedades da requisição no local storage
        Object.keys(res).forEach(property => {
          localStorage.setItem(property, res[property])
        })
      })
  }


}