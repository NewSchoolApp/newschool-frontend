import Axios from "axios";
import utils from "~/utils/index";

// eslint-disable-next-line new-cap
const http = new Axios.create({
  baseURL: process.env.baseUrl
});

// Interceptor para adicionar o token no authorization header
http.interceptors.request.use(config => {
  config.headers.Authorization = utils.getToken() || "";
  return config;
});
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

  put: (path, payload = {}) => {
    return http.put(path, payload);
  },

  delete: (path, id) => {
    return http.delete(`${path}/${id}`);
  }
};
