import { http } from './config'

/**
 * @author Leonardo Balsalobre
 * 
 * Serviço de alterar dados
 */

export default {

    update: (form, token) => {
        return http.put("api/v1/user/{id}", form, { headers: { 'Authorization': `Bearer ${token}` } })
    }
}