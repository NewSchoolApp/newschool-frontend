export const state = () => ({
  list: [],
  current: null
})

export const mutations = {
  set (state, courses) {
    state.list = courses
  },
  setCurrent (state, course) {
    state.current = course
  }
}
