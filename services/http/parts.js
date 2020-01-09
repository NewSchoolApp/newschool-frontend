import { http } from './config'
import auth from './auth'

/**
 * @author Rafael Nunes
 * Serviço de Parts
 */
export default {
    getById: (id) => {
        const { accessToken } = auth.getInfoAuth()
        return http.get(`api/v1/part/${id}`, { headers: { 'Authorization': accessToken } })
    },

    getByLesson: async (lessonId)  => {
        const { accessToken } = auth.getInfoAuth()
        return http.get(`api/v1/part/lesson/${lessonId}`, { headers: { 'Authorization': accessToken } })
    },

    savePart: (part) => {
        const { accessToken } = auth.getInfoAuth()
        return http.post('api/v1/part/', part, { headers: { 'Authorization': accessToken } })
    }
}
