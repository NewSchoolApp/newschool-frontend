import { http } from './config'
import auth from './auth'

/**
 * @author Rafael Nunes
 * Serviço de Tests
 */
export default {
    getByPart: async (partId)  => {
        const { accessToken } = auth.getInfoAuth()
        return http.get(`api/v1/test/part/${partId}`, { headers: { 'Authorization': accessToken } })
    }
}
