import http from '~/services/http/generic';

export const state = () => ({
  all: [],
  my: [],
  current: {},
  currentState: {},
  currentLesson: {},
  currentPart: {},
  currentTest: {},
  currentWatching: '',
  currentPartOfWatching: '',
});

export const mutations = {
  async setAll(state, courses) {
    state.all = courses;
  },
  async setMy(state, courses) {
    state.my = courses;
  },
  async setCurrent(state, course) {
    state.current = course;
  },
  async setCurrentLesson(state, lesson) {
    state.currentLesson = lesson;
  },
  async setCurrentPart(state, part) {
    state.currentPart = part;
  },
  async setCurrentTest(state, test) {
    state.currentTest = test;
  },
  async setCurrentState(state, courseState) {
    state.currentState = courseState;
  },
  async setCurrentWatching(state, watching) {
    state.currentWatching = watching;
  },
  async setCurrentPartOfWatching(state, partOfWatching) {
    state.currentPartOfWatching = partOfWatching;
  },
};

export const actions = {
  async refreshAllCourses() {
    const allCourses = await http.getAll(process.env.endpoints.COURSE);
    this.commit(
      'courses/setAll',
      allCourses.data.sort((a, b) => (a.id > b.id ? -1 : 1)),
    );
  },
  async refreshMyCourses() {
    const myCourses = await http.getAll(
      `${process.env.endpoints.MY_COURSES}${this.state.user.data.id}`,
    );
    this.commit('courses/setMy', myCourses.data);
  },
  async refreshCurrentStep() {
    // look for the current step
    const currentStep = await http.getAll(
      `${process.env.endpoints.CURRENT_STEP}/user/${this.state.user.data.id}/course/${this.state.courses.current.id}`,
    );

    if (currentStep.data.doing === 'TEST') {
      // store data
      this.commit('courses/setCurrentTest', currentStep.data.test);
      this.commit('courses/setCurrentPart', '');

      return {
        type: 'TEST',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/teste`,
      };
    } else if (currentStep.data.doing === 'LESSON') {
      // get parts of this lesson
      const parts = await http.getAll(
        `${process.env.endpoints.PARTS_BY_LESSON}/${currentStep.data.part.id}`,
      );

      // get data of the first part (the last index is the first part)
      const firstPart = await http.getAll(
        `${process.env.endpoints.PART_BY_ID}/${
          parts.data.find(part => part.sequenceNumber === 1).id
        }`,
      );

      // store data
      this.commit('courses/setCurrentPart', firstPart.data);
      this.commit('courses/setCurrentTest', '');

      return {
        // no app nós nunca interagimos de forma direta com uma lesson, sendo assim esse método retornará o type lesson porém a url para interagir com o current step sera da primeira part dessa lesson
        type: 'LESSON',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/parte`,
      };
    } else if (currentStep.data.doing === 'PART') {
      // get part data
      const part = await http.getAll(
        `${process.env.endpoints.PART_BY_ID}/${currentStep.data.part.id}`,
      );

      // store data
      this.commit('courses/setCurrentPart', part.data);
      this.commit('courses/setCurrentTest', '');

      return {
        type: 'PART',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/parte`,
      };
    } else if (currentStep.data.doing === 'CHALLENGE') {
      return {
        type: 'CHALLENGE',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/pre-challenge`,
        // stepUrl: `/aluno/curso/${this.state.courses.current.slug}/fim`,
      };
    } else if (currentStep.data.doing === 'COMPLETED') {
      return {
        type: 'COMPLETED',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/fim`,
      };
    } else {
      console.log(
        'ERROR: unexpected CurrentStep type!',
        currentStep.data.doing,
      );
    }
  },
};
