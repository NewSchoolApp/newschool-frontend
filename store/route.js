const state = () => ({
  last_accessed_route: "",
  last_access: false
});

const mutations = {
  SET_ROUTE(state, route) {
    state.last_accessed_route = route;
  },
  SET_ACCESS(state, value) {
    state.last_access = value;
  }
};
const actions = {
  saveLastRouteAccess({ commit, state }, route) {
    if (route !== "/loading") {
      if (!state.last_access) {
        commit("SET_ACCESS", true);
        commit("SET_ROUTE", route);
        console.log("cade a rota ? > ", state.last_accessed_route);
      }
    }
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
