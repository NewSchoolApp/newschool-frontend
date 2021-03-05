import Axios from 'axios';
import { addInterceptorError } from './error-interceptor';
import utils from '~/utils/index';

const http = Axios.create({
  baseURL: process.env.marketUrl,
});

// http.interceptors.request.use(config => {
//   config.headers.Authorization = utils.getToken();
//   return config;
// });

// addInterceptorError(http);

export default {
  getAll: path => {
    return http.get(path);
  },
  post: (path, payload = {}) => {
    return http.post(path, payload);
  },
};
