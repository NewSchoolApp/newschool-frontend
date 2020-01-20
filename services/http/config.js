import Axios from 'axios'

export const http = new Axios.create({
  baseURL: process.env.baseUrl,
})
