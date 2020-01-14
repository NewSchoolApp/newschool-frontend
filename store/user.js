import { http } from "~/services/http/config";
import PRIVATE_MODULES_URL from "~/routes/private";

const state = () => ({
  data: {},
  flag_session: false // sessão do usuário, é definida pelo status online do store.
});

const getters = {
  flagSession: state => {
    return state.flag_session;
  },
  getUser: state => {
    return state.data;
  },
  roleModule: state => {
    const { role } = state.data;
    return PRIVATE_MODULES_URL[role];
  }
};
const mutations = {
  SET_USER(state, object) {
    state.data = object;
  },
  SET_FLAG_SESSION(state, value) {
    state.flag_session = value;
  }
};
const actions = {
  validateSession({ getters }, route) {
    const { role } = getters.getUser;
    if (getters.flagSession) {
      // eslint-disable-next-line no-unused-expressions
      PRIVATE_MODULES_URL[role] === route;
      return true;
    }
    return false;
  },
  loadInfoUser({ commit, dispatch }, config) {
    return http
      .get(process.env.endpoints.USER_ME, {
        headers: { Authorization: `Bearer ${config.token}` }
      })
      .then(res => {
        commit("SET_USER", {
          name: res.data.name || "Anônimo",
          type: res.data.type || "Visitante",
          id: res.data.id || "",
          role: res.data.role.name || ""
        });
        const moduleRoute =
          config.route === "/"
            ? `${PRIVATE_MODULES_URL[res.data.role.name]}/home`
            : config.route;
        dispatch("initSessionUser");
        // eslint-disable-next-line no-undef
        $nuxt._router.push(moduleRoute);
      });
  },
  initSessionUser({ commit }) {
    commit("SET_FLAG_SESSION", true);
  },
  clearInfoUser({ commit }) {
    commit("SET_USER", {});
    commit("SET_FLAG_SESSION", false);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
