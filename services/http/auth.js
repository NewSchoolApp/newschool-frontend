<<<<<<< HEAD
import ms from 'ms'
import { http } from './config'
import utils from '~/utils/index'
=======
import ms from "ms";
import { http } from "./config";
import utils from "~/utils/index";
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
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
<<<<<<< HEAD
      grant_type: 'password',
      username,
      password,
    })
    const clientCredentials = utils.getPasswordCredentials()
=======
      grant_type: "password",
      username,
      password
    });
    const clientCredentials = utils.getPasswordCredentials();
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e

    return http
      .post(process.env.endpoints.LOGIN, body, {
        headers: { Authorization: clientCredentials },
      })
      .then(res => {
<<<<<<< HEAD
        localStorage.setItem(
          'auth',
          JSON.stringify({
            accessToken: `Bearer ${res.data.accessToken}`,
            refreshToken: res.data.refreshToken,
            expiresIn: Date.now() + ms(res.data.expiresIn),
          }),
        )
=======
        localStorage.setItem('auth', JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }));
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
      })
  },

  signUp: (form, token) => {
    return http.post(process.env.endpoints.SIGN_UP, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  forgotPassword: form => {
<<<<<<< HEAD
    const email = utils.toFormData(form)
=======
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
    return utils.getExternalCredentials().then(res => {
      return http.post(process.env.endpoints.FORGOT_PASSWORD, form, {
        headers: { Authorization: `Bearer ${res.data.accessToken}` }
      });
    });
  },

  changePasswordRequestValidate: token => {
    return utils.getExternalCredentials().then(res => {
      return http.get(`${process.env.endpoints.FORGOT_PASSWORD}/${token}/validate`, {
        headers: { Authorization: `Bearer ${res.data.accessToken}` }
      })
    })
  },

  changePassword: (form, token) => {
    return utils.getExternalCredentials().then(res => {
      return http.post(`${process.env.endpoints.FORGOT_PASSWORD}/${token}`, form, {
        headers: { Authorization: `Bearer ${res.data.accessToken}` }
      })
    })
  },

  isTokenValid: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      const { refreshToken, expiresIn } = auth;
      const currentTime = Date.now();
      if (currentTime > expiresIn) {
        return getNewAccessToken(refreshToken);
      } else {
        return { status: true, token: utils.getToken() };
      }
    } else {
<<<<<<< HEAD
      return { status: false, token: '' }
=======
      return { status: false, token: "" };
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
    }
  },

  getInfoAuth: () => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch (e) {
      return {
        accessToken: ``,
        refreshToken: ``
      };
    }
<<<<<<< HEAD
  },
}
const getNewAccessToken = refreshToken => {
  const body = utils.toFormData({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
=======
  }
};
const getNewAccessToken = refreshToken => {
  const body = utils.toFormData({
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e

  const clientCredentials = utils.getPasswordCredentials();

  return http
    .post(process.env.endpoints.LOGIN, body, {
      headers: { Authorization: clientCredentials }
    })
    .then(res => {
      localStorage.setItem(
<<<<<<< HEAD
        'auth',
        JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }),
      )

      return { status: true, token: utils.getToken() }
    })
    .catch(() => {
      return { status: false, token: '' }
=======
        "auth",
        JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn)
        })
      );
      return { status: true, token: utils.getToken() };
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
    })
    .catch(error => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      return { status: false, token: "" };
    });
};