export const state = () => ({
  monthRanking:[],
  yearRanking:[],
  userPosition: {}
});

export const mutations = {
  setMonth(state, month) {
    state.monthRanking = month
  },
  setYear(state, year) {
    state.yearRanking = year
  },
  setPosition(state, position) {
    state.userPosition = position
  },
};
