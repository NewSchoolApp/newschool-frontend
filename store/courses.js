export const state = () => ({
  list: [],
  current: {},
  currentClass: {},
  currentSection: {},
  currentQuestion: {},
})

export const mutations = {
  set(state, courses) {
    state.list = courses
  },
  setCurrent(state, course) {
    state.current = course
  },
  setCurrentClasses(state, classes) {
    state.current.classes = classes
  },
  setCurrentClass(state, klass) {
    state.currentClass = klass
  },
  setClassSections(state, sections) {
    state.currentClass.sections = sections
  },
  setCurrentSection(state, section) {
    state.currentSection = section
  },
  setSectionQuestions(state, questions) {
    state.currentSection.questions = questions
  },
  setCurrentQuestion(state, question) {
    state.currentQuestion = question
  },
  // actions: {
  //   setState({ commit }, )
  // }
}
