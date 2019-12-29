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
        // salvando propriedades da requisição no local storage
        Object.keys(res).forEach(property => {
          localStorage.setItem(property, res[property])
        })
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
  }


}