import Axios from 'axios';

export const http = new Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})