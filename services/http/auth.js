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

    let base64 = btoa(`${process.env.VUE_APP_CLIENT_CREDENTIAL_NAME}:${process.env.VUE_APP_CLIENT_CREDENTIAL_SECRET}`)

    let client_credentials = `Basic ${base64}`;
    let body = { grant_type: "password", username: username, password: password };

    return http.post("/oauth/token",
      body, { headers: { 'Authorization': client_credentials } })
  }
}