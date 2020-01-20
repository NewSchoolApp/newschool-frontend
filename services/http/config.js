import Axios from 'axios'
<<<<<<< HEAD

export const http = new Axios.create({
  baseURL: process.env.baseUrl,
})
=======
import { addInterceptorError } from './error-interceptor'

export const http = Axios.create({
  baseURL: process.env.baseUrl,
})
addInterceptorError(http)
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
