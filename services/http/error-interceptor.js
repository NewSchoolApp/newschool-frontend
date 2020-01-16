let captureError = null

export const setCaptureError = func => {
  captureError = func
}

const getErrorMessageFromStatusAndUrl = (status, url) => {
  if (status === 500) {
    return 'Ocorreu um erro'
  }
  return null
}

const hasResponseMessage = error =>
  error.response && error.response.data && error.response.data.message

const hasResponseStatusAndRequestUrl = error =>
  error.response &&
  error.response.status &&
  error.request &&
  error.request.responseURL

export const getErrorMessage = error => {
  if (hasResponseMessage(error)) {
    return error.response.data.message
  }
  if (hasResponseStatusAndRequestUrl(error)) {
    const messageFromStatus = getErrorMessageFromStatusAndUrl(
      error.response.status,
      error.request.responseURL,
    )
    if (messageFromStatus) {
      return messageFromStatus
    }
  }
  return error.message
}

export const addInterceptorError = axiosInstance => {
  // Interceptor para exibir erro para o usuário
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (captureError) {
        captureError(error)
      }
      return Promise.reject(error)
    },
  )
}
