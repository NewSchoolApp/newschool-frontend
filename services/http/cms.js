import Axios from 'axios';

const http = Axios.create({
  baseURL: process.env.CMS.URL,
});

http.interceptors.request.use(config => {
   config.headers.Authorization = "Bearer " + process.env.CMS.Token;
   return config;
});

export default {
  get: path => {
    return http.get(path);
  },
  post: (path, payload = {}) => {
    return http.post(path, payload);
  },
};
