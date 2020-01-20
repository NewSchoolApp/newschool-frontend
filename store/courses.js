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
<<<<<<< HEAD
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
=======
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
>>>>>>> 04f2d68834244a8c4557aedd320e1c067c422e3e
  },
}
