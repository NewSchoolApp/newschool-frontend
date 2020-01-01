import { http } from './config'

/**
 * @author Petherson Moreno
 * Serviço de Cursos
 */
export default {
  getBySlug: (slug, token) =>
    http.get(`api/v1/course/slug/${slug}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
