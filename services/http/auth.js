import ms from 'ms';
import { http } from './config';
import utils from '~/utils/index';

/**
 * autenticação na API do sistema
 */
const login = (username, password) => {
  const body = utils.toFormData({
    grant_type: 'password',
    username,
    password,
  });
  const clientCredentials = utils.getPasswordCredentials();

  return http
    .post(process.env.endpoints.LOGIN, body, {
      headers: { Authorization: clientCredentials },
    })
    .then(res => {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }),
      );
    });
};

const signUp = (form, token) => {
  return http.post(process.env.endpoints.SIGN_UP, form, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const registerUserSocialLogin = socialCredentials => {
  return utils
    .getExternalCredentials()
    .then(res => signUp(socialCredentials, res.data.accessToken))
    .then(() => login(socialCredentials.email, socialCredentials.password))
    .catch(err => {
      console.error(err);
    });
};
/**
 * @author Andrews
 *
 * Serviço de auth do sistema
 */

export default {
  login,
  signUp,
  forgotPassword: form => {
    return utils.getExternalCredentials().then(res => {
      return http.post(process.env.endpoints.FORGOT_PASSWORD, form, {
        headers: { Authorization: `Bearer ${res.data.accessToken}` },
      });
    });
  },

  changePasswordRequestValidate: token => {
    return utils.getExternalCredentials().then(res => {
      return http.get(
        `${process.env.endpoints.FORGOT_PASSWORD}/${token}/validate`,
        {
          headers: { Authorization: `Bearer ${res.data.accessToken}` },
        },
      );
    });
  },

  changePassword: (form, token) => {
    return utils.getExternalCredentials().then(res => {
      return http.post(
        `${process.env.endpoints.FORGOT_PASSWORD}/${token}`,
        form,
        {
          headers: { Authorization: `Bearer ${res.data.accessToken}` },
        },
      );
    });
  },

  isTokenValid: () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      const { refreshToken, expiresIn } = auth;
      const currentTime = Date.now();
      if (currentTime > expiresIn) {
        return getNewAccessToken(refreshToken);
      } else {
        return { status: true, token: utils.getToken() };
      }
    } else {
      return { status: false, token: '' };
    }
  },

  getInfoAuth: () => {
    try {
      return JSON.parse(localStorage.getItem('auth'));
    } catch (e) {
      return {
        accessToken: ``,
        refreshToken: ``,
      };
    }
  },

  loginFacebook: facebookCredentials => {
    return http
      .post(process.env.endpoints.FACEBOOK_LOGIN, facebookCredentials)
      .then(res => {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            accessToken: `Bearer ${res.data.accessToken}`,
            refreshToken: res.data.refreshToken,
            expiresIn: Date.now() + ms(res.data.expiresIn),
          }),
        );
      })
      .catch(error => {
        if (error.response.status === 404) {
          const randomPassword = Math.random()
            .toString(36)
            .slice(-10);

          const facebookCredentialsRegister = {
            name: facebookCredentials.name,
            email: facebookCredentials.email,
            password: randomPassword,
            urlFaceebook: '',
            urlInstagram: '',
          };
          return registerUserSocialLogin(facebookCredentialsRegister);
        }
      });
  },

  loginGoogle: googleCredentials => {
    return http
      .post(process.env.endpoints.GOOGLE_LOGIN, googleCredentials)
      .then(res => {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            accessToken: `Bearer ${res.data.accessToken}`,
            refreshToken: res.data.refreshToken,
            expiresIn: Date.now() + ms(res.data.expiresIn),
          }),
        );
      })
      .catch(error => {
        if (error.response.status === 404) {
          const randomPassword = Math.random()
            .toString(36)
            .slice(-10);

          const googleCredentialsRegister = {
            name: googleCredentials.name,
            email: googleCredentials.email,
            password: randomPassword,
            urlFaceebook: '',
            urlInstagram: '',
          };
          return registerUserSocialLogin(googleCredentialsRegister);
        }
      });
  },
};
const getNewAccessToken = refreshToken => {
  const body = utils.toFormData({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const clientCredentials = utils.getPasswordCredentials();

  return http
    .post(process.env.endpoints.LOGIN, body, {
      headers: { Authorization: clientCredentials },
    })
    .then(res => {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + ms(res.data.expiresIn),
        }),
      );
      return { status: true, token: utils.getToken() };
    })
    .catch(error => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      return { status: false, token: '' };
    });
};
