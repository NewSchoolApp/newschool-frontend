import { http } from '../services/http/config'
import toFormData from "../utils/toFormData"
import ms from 'ms'
import Vuex from 'vuex'

export const MODULES = {
    STUDANT: "aluno",
    ADMIN: "admin"
};

const userStore = () => {
    return new Vuex.Store({
        state: {
            role: {},
            login_expired: true,
            user_info: {}
        },
        mutations: {
            SET_USER(state, user) {
                state.user_info = user
            },
            SET_ROLE(state, role) {
                state.role = role
            },
            SET_STATUS_LOGIN(state, state_login) {
                state.login_expired = state_login
            }
        },
        actions: {

            login: (username, password, { commit }) => {
                const clientCredentials = actions.getClientCredentials("PASSWORD")
                const body = toFormData({
                    grant_type: "password",
                    username: username,
                    password: password
                })
                return http
                    .post("/oauth/token", body, {
                        headers: { Authorization: clientCredentials },
                    })
                    .then(res => {
                        localStorage.setItem("auth", JSON.stringify(
                            {
                                accessToken: `Bearer ${res.data.accessToken}`,
                                refreshToken: res.data.refreshToken,
                                expiresIn: Date.now() + ms(res.data.expiresIn),
                            }
                        ));
                        commit("SET_STATE_USER", true)
                        commit("SET_ROLE", res.data.role)
                    })
            },

            getInfoUser: ({ commit }) => {
                return http.get("/api/v1/user/me", {
                    headers: { Authorization: actions.getToken() }
                }).then(res => {
                    commit("SET_USER",
                        {
                            name: res.data.name || "Anônimo",
                            type: res.data.type || "Visitante",
                            id: res.data.id || "",
                        })
                }).catch((err) => {
                    console.error(err);
                    actions.signOut();
                })
            },

            getClientCredentials: (type) => {
                if (type == "PASSWORD") {
                    const base64 = btoa(`${process.env.credentials.name}:${process.env.credentials.secret}`)
                    return `Basic ${base64}`
                }
                if (type == "EXTERNAL") {
                    // Pegar client credentials externo
                }
            },

            getToken: () => {
                const auth = JSON.parse(localStorage.getItem('auth'))
                return auth.accessToken
            },

            getNewAccessToken: (refreshToken) => {
                const clientCredentials = getClientCredentials("PASSWORD")

                body = toFormData({
                    grant_type: "refresh_token",
                    refreshToken: refreshToken
                })

                return http
                    .post("/oauth/token", body, {
                        headers: { Authorization: clientCredentials },
                    })
                    .then(res => {
                        localStorage.setItem("auth", JSON.stringify(
                            {
                                accessToken: `Bearer ${res.data.accessToken}`,
                                refreshToken: res.data.refreshToken,
                                expiresIn: Date.now() + ms(res.data.expiresIn),
                            }
                        ));
                    })
                    .catch(() => {
                        actions.signOut();
                        return false
                    })
            },

            validateSessionUser: (route, { state }) => {
                console.log("call-me")
                if (MODULES[state.role.name] == route) {
                    return actions.isTokenValid();
                }
                actions.signOut();
                return false
            },

            isTokenValid: () => {
                const auth = JSON.parse(localStorage.getItem('auth'))

                if (auth) {
                    const { refreshToken, expiresIn } = auth
                    const currentTime = Date.now()
                    if (currentTime > expiresIn) {
                        return actions.getNewAccessToken(refreshToken)
                    }
                } else {
                    actions.signOut();
                    return false
                }
            },

            signOut: ({ commit }) => {
                localStorage.delete("auth")
                commit("SET_STATE_USER", false)
                commit("SET_USER", {})
                commit("SET_ROLE", {})
            }
        }
    })
}

export default userStore;

