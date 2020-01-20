import Axios from 'axios'
import { addInterceptorError } from './error-interceptor'

export const http = Axios.create({
  baseURL: process.env.baseUrl,
})
addInterceptorError(http)
