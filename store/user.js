import { http } from "~/services/http/config"
import Vuex from 'vuex'

const userStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: {},
            flag_session: false,   // sessão do usuário, é definida pelo status online do store.
            modules: { ADMIN: "admin", STUDANT: "aluno" }
        }),

        getters: {
            flagSession: state => {
                return state.flag_session;
            },
            user: state => {
                return state.user;
            },
            modules: state => {
                return state.modules;
            },
            roleModule: state => {
                const { role } = state.user
                return state.modules[role];
            }
        },
        mutations: {
            SET_USER(state, object) {
                state.user = object;
            },
            SET_FLAG_SESSION(state, value) {
                state.flag_session = value;
            }
        },
        actions: {
            validateSession({ getters }, route) {
                const { role } = getters.user;
                if (getters.flagSession) {
                    return getters.modules[role] == route;
                };
                return false;

            },
            loadInfoUser(token, { commit }) {
                return http
                    .get(process.env.endpoints.USER_ME, { headers: { Authorization: token } })
                    .then(res => {
                        commit("SET_USER", {
                            name: res.data.name || "Anônimo",
                            type: res.data.type || "Visitante",
                            id: res.data.id || "",
                            role: res.data.role.name || ""
                        })
                    }).catch(() => {
                        $nuxt._router.push('/login')
                    })
            },
            initSessionUser({ commit }) {
                commit("SET_FLAG_SESSION", true);
            },
            clearInfoUser({ commit }) {
                commit("SET_USER", {});
                commit("SET_FLAG_SESSION", false)
            }
        }
    })
}

export default userStore