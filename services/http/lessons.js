import { http } from './config'
import auth from './auth'

/**
 * @author Rafael Nunes
 * Serviço de Lessons
 */
export default {
  getById: (id) => {
    const { accessToken } = auth.getInfoAuth()
    return http.get(`/api/v1/lesson/${id}`, { headers: { 'Authorization': accessToken } })
  },

  getByCourse: (courseId) => {
    const { accessToken } = auth.getInfoAuth()
    return http.get(`api/v1/lesson/course/${courseId}`, { headers: { 'Authorization': accessToken } })
  },

  createLesson: (lesson) => {
    const { accessToken } = auth.getInfoAuth()
    return http.post('api/v1/lesson', lesson, {
      headers: { Authorization: `${accessToken}` },
    })
  },
  updateLesson: (lesson) => {
    const { accessToken } = auth.getInfoAuth()
    return http.put(`api/v1/lesson/${lesson.id}`, lesson, { headers: { 'Authorization': accessToken } })
  }
}
