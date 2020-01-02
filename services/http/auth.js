import { ms } from 'ms'
import { http } from "./config"

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
    const body = new FormData();

    const base64 = btoa(
      `${process.env.credentials.name}:${process.env.credentials.secret}`
    );

    const client_credentials = `Basic ${base64}`;

    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);

    return http
      .post("/oauth/token", body, {
        headers: { Authorization: client_credentials }
      })
      .then(res => {
        // armazenando tokens no storage
        const auth = {
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: `Bearer ${res.data.refreshToken}`,
          tokenExpiresIn: Date.now() + ms(res.data.expiresIn)
        };
        localStorage.setItem("auth", JSON.stringify(auth));
      });
  },

  getExternalCredentials: () => {
    const base64 = btoa(
      `${process.env.credentials.external.name}:${process.env.credentials.external.secret}`
    );

    const client_credentials = `Basic ${base64}`;
    const body = { grant_type: "client_credentials" };

    return http.post("oauth/token", body, {
      headers: { Authorization: client_credentials }
    });
  },

  signUp: (form, token) => {
    return http.post("api/v1/user", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  /**
   * Método para salvar as informações do usuário no local storage
   *
   * TODO - Ramificar em um serviço específico de usuário.
   */
  getInfoUser: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      return http
        .get("/api/v1/user/me", {
          headers: { Authorization: auth.accessToken }
        })
        .then(res => {
          const user = {
            name: res.data.name || "Anônimo",
            type: res.data.type || "Visitante"
          };
          localStorage.setItem("user", JSON.stringify(user));
        });
    } else {
      $nuxt._router.push("/login");
    }
  },

  getNewAccessToken: refreshToken => {
    const body = new FormData();

    const base64 = btoa(
      `${process.env.credentials.name}:${process.env.credentials.secret}`,
    );

    const clientCredentials = `Basic ${base64}`;

    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshToken);

    return http
      .post("/oauth/token", body, {
        headers: { Authorization: clientCredentials }
      })
      .then(res => {
        const auth = {
          accessToken: `Bearer ${res.data.accessToken}`,
          refreshToken: `Bearer ${res.data.refreshToken}`,
          tokenExpiresIn: Date.now() + ms(res.data.expiresIn)
        };
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        $nuxt._router.push("/login");
      });
  },

  isTokenValid: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      const { refreshToken, tokenExpiresIn } = auth;
      const currentTime = Date.now();

      if (currentTime > tokenExpiresIn) {
        this.getNewAccessToken(refreshToken);
      }
    } else {
      $nuxt._router.push("/login");
    }
  }
};
