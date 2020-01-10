import { http } from "~/services/http/config"



const state = () => ({
    user: {},
    flag_session: false,   // sessão do usuário, é definida pelo status online do store.
    modules: { ADMIN: "admin", STUDANT: "aluno" }
})

const getters = {
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
}
const mutations = {
    SET_USER(state, object) {
        state.user = object;
    },
    SET_FLAG_SESSION(state, value) {
        state.flag_session = value;
    }
}
const actions = {
    validateSession({ getters }, route) {
        const { role } = getters.user;
        if (getters.flagSession) {
            return getters.modules[role] == route;
        };
        return false;

    },
    loadInfoUser({ commit }, token) {
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
                localStorage.clear();
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
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
