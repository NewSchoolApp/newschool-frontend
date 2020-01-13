import { http } from './config'
import auth from './auth'

/**
 * @author Vinicius Dalmazzo
 * 
 * Serviço de alterar dados do usuário
 */

export default {

    addLesson: (form) => {
        const{accessToken} = auth.getInfoAuth();
        
        return http.put(`api/v1/lesson`, form, { headers: { 'Authorization': `${accessToken}` } });
    },

    updateLesson: (form) => {
        const {accessToken} = auth.getInfoAuth();

        return http.put(
            'api/v1/user/lesson',
            form,
            { headers: { 'Authorization': `${accessToken}` } }
        )
    }
}