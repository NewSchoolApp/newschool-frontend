export const state = () => ({
  list: [],
  current: {},
  currentState: {},
  currentLesson: {},
  currentPart: {},
  currentTest: {},
})

export const mutations = {
  set(state, courses) {
    state.list = courses
  },
  setCurrent(state, course) {
    state.current = course
  },
  setCurrentClass(state, lesson) {
    state.currentLesson = lesson
  },
  setCurrentPart(state, part) {
    state.currentPart = part
  },
  setCurrentTest(state, test) {
    state.currentTest = test
  },
  setCurrentState(state, courseState) {
    state.currentState = courseState
  },
}
