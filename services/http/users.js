import { http } from './config'
import auth from './auth'

/**
 * @author Leonardo Balsalobre
 * 
 * Serviço de alterar dados
 */

export default {

    update: (form) => {
        const{accessToken} = auth.getInfoAuth()
        
        return http.put("api/v1/user/{id}", form, { headers: { 'Authorization': `Bearer ${accessToken}` } })
    }
}