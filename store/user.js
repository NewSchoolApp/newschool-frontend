import { http } from "~/services/http/config"
import PRIVATE_MODULES_URL from "~/routes/private";


const state = () => ({
    user: {},
    flag_session: false,   // sessão do usuário, é definida pelo status online do store.
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
            // return JSON.parse(PRIVATE_MODULES_URL)[role] == route;
            return true
        };
        return false;

    },
    loadInfoUser({ commit, dispatch }, token) {
        return http
            .get(process.env.endpoints.USER_ME, { headers: { Authorization: token } })
            .then(res => {
                commit("SET_USER", {
                    name: res.data.name || "Anônimo",
                    type: res.data.type || "Visitante",
                    id: res.data.id || "",
                    role: res.data.role.name || ""
                })
                dispatch("initSessionUser")
                $nuxt._router.push("/aluno/home")

            }).catch(() => {
                // localStorage.clear();
                console.log("err")
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
