export const state = () => ({
  monthRanking: [],
  yearRanking: [],
});

export const mutations = {
  setMonth(state, month) {
    state.monthRanking = month;
  },
  setYear(state, year) {
    state.yearRanking = year;
  },
};
