<template>
  <v-layout>
    <v-flex ref="flex" class="main-container">
      <h1>
        <n-link to="../">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>Gerenciar meus cursos
      </h1>

      <v-form ref="form" lazy-validation>
        <h3>Curso</h3>
        <v-text-field
          :rules="titleRules"
          v-model="course.title"
          color="#60c"
          label="Título *"
          name="title"
          required
        ></v-text-field>
        <v-text-field
          :rules="descriptionRules"
          v-model="course.description"
          color="#60c"
          label="Descrição *"
          name="description"
          required
        ></v-text-field>
        <v-text-field
          :rules="authorNameRules"
          v-model="course.authorName"
          color="#60c"
          label="Professor *"
          name="authorName"
          required
        ></v-text-field>
        <v-text-field
          :rules="authorDescriptionRules"
          v-model="course.authorDescription"
          color="#60c"
          label="Biografia do Professor *"
          name="authorDescription"
          required
        ></v-text-field>
        <v-text-field
          :rules="workloadRules"
          v-model="course.workload"
          type="number"
          color="#60c"
          label="Carga Horária *"
          name="workload"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.thumbUrl"
          color="#60c"
          label="URL da Imagem do Curso"
          name="thumbUrl"
          required
        ></v-text-field>

        <resources-list name="Aula" :resources="lessons" redirect="true" path="lesson" />
        <span v-if="!lessons.length" class="new-tests-span">Favor, adicionar uma aula</span>

        <v-btn @click="submit" color="#60c" dark block depressed large>Salvar</v-btn>

        <v-snackbar
          v-model="snackbar"
          :color="snackbarStatus"
          :timeout="5000"
          :top="true"
          :right="true"
        >
          {{ snackbarText }}
          <v-btn @click="snackbar = false" color="#FFF" text>Fechar</v-btn>
        </v-snackbar>
      </v-form>
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:id/edit'
  }
</router>

<script scoped>
import courses from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
  data() {
    return {
      title: 'Gerenciar meus cursos',
      sendCourse: false,
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',

      titleRules: [v => !!v || 'O título é obrigatório'],
      descriptionRules: [v => !!v || 'A descrição é obrigatória'],
      authorNameRules: [v => !!v || 'O professor é obrigatório'],
      authorDescriptionRules: [
        v => !!v || 'A biografia do professor é obrigatória',
      ],
      workloadRules: [v => !!v || 'A carga horária é obrigatória'],
      // photoRules: [v => !!v || 'A foto de capa é obrigatória'],
    };
  },

  head() {
    return {
      title: this.title,
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.course['authorId'] = 'null'

        courses
          .put(process.env.endpoints.COURSE, this.course.id, this.course)
          .then(res => {
            this.loading = false;
            this.sendCourse = true;
            this.confirmSnackbar('Curso salvo!', 'success');
            this.$store.commit('courses/setCurrent', res.data);
            this.gotoAddClass(res.data.id);
          })
          .catch(err => {
            this.confirmSnackbar(
              'Ocorreu um erro ao cadastrar o curso.',
              'error',
            );
            setTimeout(() => {
              this.loading = false;
            }, 500);
            console.error(err);
          });
      } else {
        this.animateForm(false);
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add('hide-form');
        document.querySelector('html').style.overflow = 'hidden';
        setTimeout(() => {
          this.loading = true;
        }, 300);
      } else {
        this.$refs.flex.classList.add('error-form');
        setTimeout(() => {
          this.$refs.flex.classList.remove('error-form');
        }, 500);
      }
      document.querySelector('html').style.overflow = 'scroll';
    },

    gotoAddClass(courseId) {
      if (this.sendCourse) {
        $nuxt._router.push(`/admin/course/${courseId}/lesson/new`);
      } else {
        this.confirmSnackbar(
          'Você precisa salvar o curso antes de adicionar uma aula',
          'error',
        );
      }
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },
  async asyncData({ store, data, params }) {
    const _course = await courses.getById(
      process.env.endpoints.COURSE,
      params.id,
    );
    const _lessons = await courses.getById(
      process.env.endpoints.LESSON + '/course',
      params.id,
    );

    return { course: _course.data, lessons: _lessons.data };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  text-transform: uppercase;
  text-align: center;
  color: #6600cc;
}

@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}

h3 {
  font-weight: 900;
  font-size: 1em;
  line-height: 24px;
  text-transform: uppercase;
  text-align: left;
  color: #6600cc;
}

.back-button {
  min-width: 0 !important;
  float: left;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 2em 3em 78px 2em;
}

.flex {
  animation: intro 300ms backwards;
  animation-delay: 350ms;
}

.layout {
  background: #fff !important;
}

/* Page */
.page-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 90%;
  margin-left: 45%;
  transform: translateX(-50%);
  margin-top: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 60%;
  margin-left: 35%;
  transform: translateX(-50%);
}

.classes > p {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: rgb(141, 139, 139);
}

.classes-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

::v-deep
  .v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #60c;
}

::v-deep .v-label {
  font-weight: 600;
  font-size: 14px;
  color: #aa56ff;
}

::v-deep
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot::before {
  border-color: #aa56ff;
}

::v-deep
  .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252; /* cor da borda quando der estado de erro */
}

::v-deep .v-messages__message {
  text-align: right;
  margin-top: -0.3em;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
