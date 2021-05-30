import Axios from 'axios';
import { addInterceptorError } from './error-interceptor';
import utils from '~/utils/index';

const http = Axios.create({
  baseURL: process.env.baseUrl,
});

// Interceptor para adicionar o token no authorization header
http.interceptors.request.use(config => {
  config.headers.Authorization = utils.getToken();
  return config;
});

// Interceptor para gaurd e redirecionamento
// TODO criar um arquivo específico para interceptors
// http.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response.statusCode === 401) {
//       localStorage.clear();
//       $nuxt._router.push('/login');
//     } else {
//       return Promise.reject(error);
//     }
//     return config;
//   },
// );

addInterceptorError(http);
/**
 * @author Andrews
 *
 * Serviço genérico para requisições http
 */
export default {
  getAll: path => {
    return http.get(path);
  },

  getById: (path, id) => {
    return http.get(`${path}/${id}`);
  },

  post: (path, payload = {}) => {
    return http.post(path, payload);
  },

  put: (path, id, payload = {}) => {
    return http.put(`${path}/${id}`, payload);
  },

  putByURL: path => {
    return http.put(path);
  },

  delete: (path, id) => {
    return http.delete(`${path}/${id}`);
  },
};
