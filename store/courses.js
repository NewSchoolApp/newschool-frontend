export const state = () => ({
  list: [],
  current: {},
  currentClass: {},
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
  },
  setCurrentClass (state, klass) {
    state.currentClass = klass
  },
  setClassSections (state, sections) {
    state.currentClass.sections = sections
  }
}
