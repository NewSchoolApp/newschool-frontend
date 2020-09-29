<template>
  <div class="card" @click="goToCourse(course)">
    <div class="header__info">
      <h1>{{ course.course.title }}</h1>
      <v-btn
        v-if="course.status === 'TAKEN'"
        class="btn-back"
        text
        icon
        @click="continueCourse(course.course)"
      >
        <p id="continue__text">
          CONTINUAR
          <v-icon>mdi-arrow-right</v-icon>
        </p>
      </v-btn>
      <p v-else class="text__success">CONCLUÍDO</p>
    </div>
    <div class="progress">
      <p id="value__progress">{{ course.completion }}%</p>
      <v-progress-linear
        :value="course.completion"
        height="7"
        rounded="true"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script>
import http from '~/services/http/generic';

export default {
  name: 'CourseProgress',
  props: ['course'],
  methods: {
    continueCourse(course) {
      this.loading = true;
      http
        .getAll(
          `${process.env.endpoints.STATE_COURSE}/user/${this.user.id}/course/${course.id}`,
        )
        .then(res => {
          // salvando o estado atual
          this.$store.commit('courses/setCurrent', res.data.course);
          delete res.data.user;
          delete res.data.course;
          this.$store.commit('courses/setCurrentState', res.data);

          // Verificando qual o próximo passo
          http
            .getAll(
              `${process.env.endpoints.CURRENT_STEP}/user/${this.user.id}/course/${course.id}`,
            )
            .then(res => {
              if (res.data.type === 'NEW_TEST') {
                this.$store.commit('courses/setCurrentTest', res.data.data);
                $nuxt._router.push(
                  `/aluno/curso/${course.id}/aula/parte/teste`,
                );
              } else {
                this.$store.commit('courses/setCurrentPart', res.data.data);
                $nuxt._router.push(`/aluno/curso/${course.id}/aula/parte`);
              }
            });
        });
    },
    goToCourse(courseAndState) {
      if (courseAndState.status === 'COMPLETED') {
        const url = courseAndState.course.slug
          ? courseAndState.course.slug
          : this.convertToSlug(courseAndState.course.title);
        // eslint-disable-next-line no-undef
        $nuxt._router.push(`/aluno/curso/${url}`);
      } else {
        this.continueCourse(courseAndState.course);
      }
    },

    convertToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
      const to = 'aaaaaeeeeeiiiiooooouuuunc------';

      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  transition: 0.2 ease-in;
}
#page {
  height: 100%;
}
h1 {
  font-size: 0.8rem;
  font-weight: 600;
  width: 55%;
}
.container__list {
  margin-bottom: 5rem;
}
.card {
  height: 8rem;
  margin: 1.3rem;
  padding: 0.9rem;
  background: #fff;
  box-shadow: 0px 12px 20px 0px #00000026;
  border-radius: 5px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.btn-back {
  width: unset !important;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
::v-deep .v-btn--icon.v-size--default {
  height: unset;
  color: #6600cc;
}
.text__success {
  font-weight: 400;
  color: #35de63;
  font-size: 13px;
}
.progress-linear {
  height: 6px;
  border-radius: 50px;
}
#value__progress {
  color: darkgray;
  padding-bottom: 5px;
}
#continue__text {
  font-size: smaller;
}
</style>
