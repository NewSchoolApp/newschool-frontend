export const state = () => ({
  all: [],
  my: [],
  current: {},
  currentState: {},
  currentLesson: {},
  currentPart: {},
  currentTest: {},
})
  
export const mutations = {
  setAll(state, courses) {
    state.all = courses
    console.log("___VUEX___(courses.all):", state.all)
  },
  setMy(state, courses) {
    state.my = courses
    console.log("___VUEX___(courses.my):", state.my)
  },
  setCurrent(state, course) {
    state.current = course
    console.log("___VUEX___(courses.current):", state.current)
  },
  setCurrentLesson(state, lesson) {
    state.currentLesson = lesson
    console.log("___VUEX___(courses.currentLesson):", state.currentLesson)
  },
  setCurrentPart(state, part) {
    state.currentPart = part
    console.log("___VUEX___(courses.currentPart):", state.currentPart)
  },
  setCurrentTest(state, test) {
    state.currentTest = test
    console.log("___VUEX___(courses.currentTest):", state.currentTest)
  },
  setCurrentState(state, courseState) {
    state.currentState = courseState
    console.log("___VUEX___(courses.currentState):", state.currentState)
  },
}
