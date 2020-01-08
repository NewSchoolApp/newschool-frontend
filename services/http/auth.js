import ms from 'ms'
import { http } from './config'

/**
 * @author Andrews
 *
 * Serviço de auth do sistema
 */

const getNewAccessToken = refreshToken => {
  const body = new FormData()

  const base64 = btoa(
    `${process.env.credentials.name}:${process.env.credentials.secret}`,
  )

  const clientCredentials = `Basic ${base64}`

  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', refreshToken)

  return http
    .post('/oauth/token', body, {
      headers: { Authorization: clientCredentials },
    })
    .then(res => {
      const auth = {
        accessToken: `Bearer ${res.data.accessToken}`,
        refreshToken: res.data.refreshToken,
        expiresIn: Date.now() + ms(res.data.expiresIn),
      }
      localStorage.setItem('auth', JSON.stringify(auth))
    })
    .catch(() => {
      localStorage.setItem('login_expired', true)
      // eslint-disable-next-line no-undef
      $nuxt._router.push('/login')
    })
}

export default {
  /**
   * autenticação na API do sistema
   */
  login: (username, password) => {
    const body = new FormData()

    const base64 = btoa(
      `${process.env.credentials.name}:${process.env.credentials.secret}`,
    )

    const clientCredentials = `Basic ${base64}`

    body.append('grant_type', 'password')
    body.append('username', username)
    body.append('password', password)

    return http
      .post('/oauth/token', body, {
        headers: { Authorization: clientCredentials },
      })
      .then(res => {
        // armazenando tokens no storage
        const auth = {
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }
        localStorage.setItem('auth', JSON.stringify(auth))
      })
  },

  getExternalCredentials: () => {
    const base64 = btoa(
      `${process.env.credentials.external.name}:${process.env.credentials.external.secret}`,
    )

    const clientCredentials = `Basic ${base64}`
    const body = { grant_type: 'client_credentials' }

    return http.post('oauth/token', body, {
      headers: { Authorization: clientCredentials },
    })
  },

  signUp: (form, token) => {
    return http.post('api/v1/user/student', form, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  /**
   * Método para salvar as informações do usuário no local storage
   *
   * TODO - Ramificar em um serviço específico de usuário.
   */
  getInfoUser: () => {
    const auth = JSON.parse(localStorage.getItem('auth'))

    if (auth) {
      return http
        .get('/api/v1/user/me', {
          headers: { Authorization: auth.accessToken },
        })
        .then(res => {
          const user = {
            name: res.data.name || 'Anônimo',
            type: res.data.type || 'Visitante',
            id: res.data.id || '',
            email: res.data.email || '',
            urlFacebook: res.data.urlFacebook || '',
            urlInstagram: res.data.urlInstagram || '',
          }
          localStorage.setItem('user', JSON.stringify(user))
        })
    } else {
      // eslint-disable-next-line no-undef
      $nuxt._router.push('/login')
    }
  },

  isTokenValid: () => {
    const auth = JSON.parse(localStorage.getItem('auth'))

    if (auth) {
      const { refreshToken, expiresIn } = auth
      const currentTime = Date.now()

      if (currentTime > expiresIn) {
        return getNewAccessToken(refreshToken)
      }
    } else {
      $nuxt._router.push('/login')
    }
  },

  getInfoAuth: () => {
    try {
      return JSON.parse(localStorage.getItem('auth'))
    } catch (e) {
      return {
        accessToken: ``,
        refreshToken: ``,
      }
    }
  },

  isLoginExpired: () => {
    if (typeof localStorage !== 'undefined') {
      const loginExpired = localStorage.getItem('login_expired')
      localStorage.removeItem('login_expired')
      return loginExpired
    }

    return false
  },
}
