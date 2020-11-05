export const state = () => ({
  list: [],
});

export const mutations = {
  set(state, notifications) {
    state.list = notifications;
  },
};
