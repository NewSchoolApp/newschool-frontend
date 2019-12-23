export const state = () => ({
  list: [],
  current: {}
})

export const mutations = {
  set (state, courses) {
    state.list = courses
  },
  setCurrent (state, course) {
    state.current = course
  },
  setCurrentClasses (state, classes) {
    state.current.classes = classes
  }
}
