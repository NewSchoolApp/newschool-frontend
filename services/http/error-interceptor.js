let captureError = null

export const setCaptureError = func => {
  captureError = func
}

export const addInterceptorError = axiosInstance => {
  // Interceptor para exibir erro para o usuário
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (captureError) {
        captureError(error)
      }
      return error
    },
  )
}
