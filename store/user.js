import { http } from '~/services/http/config';
import { PRIVATE_MODULES_URL } from '~/routes/private';

const state = () => ({
  data: {},
  flag_session: false, // sessão do usuário, é definida pelo status online do store.
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
  },
};
const mutations = {
  SET_USER(state, object) {
    state.data = object;
  },
  SET_FLAG_SESSION(state, value) {
    state.flag_session = value;
  },
};
const actions = {
  validateSession({ getters }, route) {
    return {
      validRole: getters.roleModule === route,
      session: getters.flagSession,
    };
  },
  loadInfoUser({ commit, dispatch, getters }, config) {
    return http
      .get(process.env.endpoints.USER_ME, {
        headers: { Authorization: config.token },
      })
      .then(res => {
        const types = {
          ADMIN: 'Administrador',
          STUDENT: 'Aluno',
        };
        commit('SET_USER', {
          name: res.data.name || 'Anônimo',
          type: types[res.data.role.name] || 'Visitante',
          id: res.data.id || '',
          role: res.data.role.name || '',
          photo: res.data.photo || '',
          inviteKey: res.data.inviteKey || '',
        });
        dispatch('initSessionUser');

        const lastRouteAccessed =
          config.route === 'login'
            ? `${getters.roleModule}-home`
            : config.route;

        // eslint-disable-next-line no-undef
        $nuxt._router.push({ name: lastRouteAccessed });
      })
      .catch(() => {
        dispatch('clearInfoUser');
        localStorage.clear();
        // eslint-disable-next-line no-undef
        $nuxt._router.push('/login');
      });
  },
  initSessionUser({ commit }) {
    commit('SET_FLAG_SESSION', true);
  },
  clearInfoUser({ commit }) {
    commit('SET_USER', {});
    commit('SET_FLAG_SESSION', false);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
