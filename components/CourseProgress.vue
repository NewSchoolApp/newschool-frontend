<template>
  <v-card class="card">
    <v-col>
      <v-row justify="space-between">
        <h1>{{ course.titulo }}</h1>
        <p
          v-if="course.courseTakenData.completion < 100"
          id="continue__text"
          @click="goToCourse()"
        >
          Continuar
        </p>
      </v-row>

      <v-col>
        <p id="value__progress">
          {{ course.courseTakenData.completion }} % Concluído
        </p>
        <v-progress-linear
          :value="course.courseTakenData.completion"
          height="8"
          color="#aa56ff"
        />
        <div
          v-if="
            !course.courseTakenData.rating &&
              course.courseTakenData.completion === 100
          "
          id="rating-btn"
          text
          @click="rateCourse"
        >
          Avaliar Curso
        </div>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
import http from '~/services/http/generic';

export default {
  name: 'CourseProgress',
  props: ['course'],
  methods: {
    goToCourse() {
      this.$store.commit('courses/setCurrent', this.course);
      $nuxt._router.push(`/aluno/curso/${this.course.courseTakenData.slug}`);
    },
    rateCourse() {
      // store on vuex course data
      this.$store.commit('courses/setCurrent', this.course);

      // go to the last page of course flow passing 1 to "lateRate" flag
      $nuxt._router.push(`/aluno/curso/${this.course.slug}/fim/1`);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto;
  transition: 0.2 ease-in;
}
#page {
  height: 100%;
}
p {
  margin-bottom: 0;
}
h1 {
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
  max-width: 70%;
}
.container__list {
  margin-bottom: 5rem;
}
.card {
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
  color: var(--primary);
}
.text__success {
  font-weight: 400;
  color: #35de63;
  font-size: 13px;
}
::v-deep .v-progress-linear {
  margin-bottom: 10px;
}
::v-deep .v-progress-linear__background {
  opacity: 100%;
  background-color: #cecece !important;
}
#value__progress {
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  margin: 18px 0 4px;
}
#continue__text {
  font-size: 11px;
  font-weight: 700;
  line-height: 12px;
  text-align: right;
  color: #737373;
  text-transform: none;
  letter-spacing: 0em;
}
#rating-btn {
  display: flex;
  justify-content: flex-end;
  text-transform: none;
  height: 20px;

  font-family: Roboto;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: right;
}
.col {
  padding: 0;
}
.row {
  padding: 0 14px;
}
</style>
