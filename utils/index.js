export default {

  getToken: () => {
    return JSON.parse(localStorage.getItem('auth')).accessToken
  },

  getExternalCredentials: (type) => {

    if (type == "EXTERNAL") {
      const base64 = btoa(
        `${process.env.credentials.external.name}:${process.env.credentials.external.secret}`,
      )

      const clientCredentials = `Basic ${base64}`
      const body = { grant_type: 'client_credentials' }

      return http.post(process.env.endpoints.LOGIN, body, {
        headers: { Authorization: clientCredentials },
      })
    }

    else if (type == "PASSWORD") {
      const base64 = btoa(
        `${process.env.credentials.name}:${process.env.credentials.secret}`,
      )
      return `Basic ${base64}`
    }
  },

  toFormData: (object) => {
    const form = new FormData()
    Object.keys(object).forEach(item => {
      form.append(item, object[item])
    })
    return form;
  }
}

