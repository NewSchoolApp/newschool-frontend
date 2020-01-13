import { http } from './config'
import auth from './auth'

/**
 * @author Rafael Nunes
 * Serviço de Lessons
 */
export default {
    getById: (id) => {
        const { accessToken } = auth.getInfoAuth()
        return http.get(`/api/v1/lesson/${id}`, { headers: {'Authorization': accessToken} })
    },

    getByCourse: (courseId)  => {
        const { accessToken } = auth.getInfoAuth()
        return http.get(`api/v1/lesson/course/${courseId}`, { headers: { 'Authorization': accessToken} })
    }
}
