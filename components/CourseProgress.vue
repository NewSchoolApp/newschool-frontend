<template>
  <div class="card" @click="goTo()">
    <div class="header__info">
      <h1>{{ course.course.title }}</h1>
      <v-btn
        v-if="course.status === 'TAKEN'"
        class="btn-back"
        text
        icon        
      >
        <p id="continue__text">
          Continuar          
        </p>
      </v-btn>
      <p v-else id="continue__text">Concluído</p>
    </div>
    <div class="progress">
      <p id="value__progress">{{ course.completion }} % Concluído</p>
      <v-progress-linear
        :value="course.completion"
        height="8"
        rounded="true"
        color="#aa56ff"
      />
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
          `${process.env.endpoints.STATE_COURSE}/user/${this.$store.state.user.data.id}/course/${course.id}`,
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
              `${process.env.endpoints.CURRENT_STEP}/user/${this.$store.state.user.data.id}/course/${course.id}`,
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
    goTo(){
      if (this.course.status === "TAKEN") {
        const url = this.course.course.slug
          ? this.course.course.slug
          : this.convertToSlug(this.course.course.title);
        // eslint-disable-next-line no-undef
        $nuxt._router.push(`/aluno/curso/${url}`);
      }
      else {
        $nuxt._router.push(
        `/pagina-certificado/${this.$store.state.user.data.id}/${this.course.course.id}/false`,
        );
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
  font-family: Roboto;
  transition: 0.2 ease-in;
}
#page {
  height: 100%;
}
h1 {
  font-size: .8rem;
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
  margin-bottom: 35px;
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
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  text-align: right;
  color: #737373;
  text-transform: none;
  letter-spacing: 0em;
}
</style>
