import Axios from 'axios';

const http = new Axios.create({
    baseURL: process.env.baseUrl,
    headers: { post: { Authorization: getToken() } }
})

export const state = () => ({
    user: {},
    flag_session: false,   // sessão do usuário, é definida pelo status online do store.
    modules: { ADMIN: "admin", STUDANT: "aluno" }
})

export const getters = {
    flagSession: state => {
        return state.flag_session
    },
    user: state => {
        return state.user
    },
    modules: state => {
        return state.modules
    },
},

export const mutations = {
    SET_USER(state, object) {
        state.user = object
    },
    SET_FLAG_SESSION(state, value) {
        state.flag_session = value
    }
}
export const actions = {
    validateSession({ getters }, route) {

    },
    loadInfoUser({ commit, getters }) {
        return http
            .get(process.env.endpoints.USER_ME)
            .then(res => {
                commit("SET_USER", {
                    name: res.data.name || "Anônimo",
                    type: res.data.type || "Visitante",
                    id: res.data.id || "",
                    role: res.data.role || { id: "", name: "" }
                })
            }).catch(() => {
                $nuxt._router.push('/login')
            })

    }
}

const getToken = () => {
    return JSON.parse(localStorage.getItem('auth')).accessToken
}
