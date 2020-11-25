import http from '~/services/http/generic';

export const state = () => ({
  all: [],
  my: [],
  current: {},
  currentState: {},
  currentLesson: {},
  currentPart: {},
  currentTest: {},
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
};

export const actions = {
  async refreshState() {
    return http
      .getAll(
        `${process.env.endpoints.STATE_COURSE}/user/${this.state.user.data.id}/course/${this.state.courses.current.id}`,
      )
      .then(({ data }) => {
        this.commit('courses/setCurrentState', data);
        return data;
      });
  },
  async refreshCurrentStep() {
    // look for the current step
    const currentStep = await http.getAll(
      `${process.env.endpoints.CURRENT_STEP}/user/${this.state.user.data.id}/course/${this.state.courses.current.id}`,
    );

    if (currentStep.data.type === 'NEW_TEST') {
      // store data
      this.commit('courses/setCurrentTest', currentStep.data.data);

      return {
        type: 'test',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/teste`,
      };
    } else if (currentStep.data.type === 'NEW_LESSON') {
      // get parts of this lesson
      const parts = await http.getAll(
        `${process.env.endpoints.PARTS_BY_LESSON}/${currentStep.data.data.id}`,
      );

      // get data of the first part (the last index is the first part)
      const firstPart = await http.getAll(
        `${process.env.endpoints.PART_BY_ID}/${parts.data[0].id}`,
      );

      // store data
      this.commit('courses/setCurrentPart', firstPart.data);

      return {
        // no app nós nunca interagimos de forma direta com uma lesson, sendo assim esse método retornará o type lesson porém a url para interagir com o current step sera da primeira part dessa lesson
        type: 'lesson',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/parte`,
      };
    } else {
      // get part data
      const part = await http.getAll(
        `${process.env.endpoints.PART_BY_ID}/${currentStep.data.data.id}`,
      );

      // store data
      this.commit('courses/setCurrentPart', part.data);

      return {
        type: 'part',
        stepUrl: `/aluno/curso/${this.state.courses.current.slug}/aula/parte`,
      };
    }
  },
};
