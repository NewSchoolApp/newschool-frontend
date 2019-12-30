import { http } from './config'

/**
 * @author Filipe Felice
 * 
 * Serviço de fale conosco
 */

export default {

  submit: (form, token) => {             
    return http.post("api/v1/message/email/contactus", form, { headers: { 'Authorization': `Bearer ${token}` } })      
  }
}