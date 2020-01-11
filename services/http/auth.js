import ms from 'ms'
import { http } from './config'
import utils from "~/utils/index"
/**
 * @author Andrews
 *
 * Serviço de auth do sistema
 */

export default {

  /**
   * autenticação na API do sistema
   */
  login: (username, password) => {

    const body = utils.toFormData({
      grant_type: "password",
      username: username,
      password: password
    })
    const clientCredentials = utils.getPasswordCredentials();

    return http
      .post(process.env.endpoints.LOGIN, body, {
        headers: { Authorization: clientCredentials }
      })
      .then(res => {
        localStorage.setItem('auth', JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }));
      })
  },

  signUp: (form, token) => {
    return http.post(process.env.endpoints.SIGN_UP, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  isTokenValid: () => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth) {
      const { refreshToken, expiresIn } = auth
      const currentTime = Date.now()
      if (currentTime > expiresIn) {
        return getNewAccessToken(refreshToken)
      } else {
        return { status: true, token: utils.getToken() }
      }
    } else {
      return { status: false, token: "" }
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

}
const getNewAccessToken = refreshToken => {
  const body = utils.toFormData({
    grant_type: "refresh_token",
    refresh_token: refreshToken
  })

  const clientCredentials = utils.getPasswordCredentials()

  return http
    .post(process.env.endpoints.LOGIN, body, {
      headers: { Authorization: clientCredentials },
    })
    .then(res => {
      localStorage.setItem('auth', JSON.stringify({
        accessToken: `Bearer ${res.data.accessToken}`,
        refreshToken: res.data.refreshToken,
        expiresIn: Date.now() + ms(res.data.expiresIn),
      }))

      return { status: true, token: utils.getToken() }
    })
    .catch(() => {
      return { status: false, token: "" }
    })
}
