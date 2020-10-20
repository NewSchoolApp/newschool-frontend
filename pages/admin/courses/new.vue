<template>
  <v-layout id="page">
    <v-flex ref="flex" class="main-container">
      <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>
      <h1>
        <n-link to="/admin/listar-cursos">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>Gerenciar meus cursos
      </h1>
      <!-- Input Field --> 
      <v-form class="course-form" ref="form" lazy-validation>
        <h3>Curso</h3>
        <v-text-field
          :rules="titleRules"
          v-model="form.title"
          color="#60c"
          label="Título *"
          name="title"
          required
        ></v-text-field>
        <v-text-field
          :rules="descriptionRules"
          v-model="form.description"
          color="#60c"
          label="Descrição *"
          name="description"
          required
        ></v-text-field>
        <v-text-field
          :rules="authorNameRules"
          v-model="form.authorName"
          color="#60c"
          label="Professor *"
          name="authorName"
          required
        ></v-text-field>
        <v-text-field
          :rules="authorDescriptionRules"
          v-model="form.authorDescription"
          color="#60c"
          label="Biografia do Professor *"
          name="authorDescription"
          required
        ></v-text-field>
        <v-text-field
          :rules="workloadRules"
          v-model="form.workload"
          type="number"
          color="#60c"
          label="Carga Horária *"
          name="workload"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.thumbUrl"
          color="#60c"
          label="URL da Imagem do Curso"
          name="thumbUrl"
          required
        ></v-text-field>
        <v-file-input
          v-model="form.photo"
          :rules="photoRules"
          color="#60c"
          label="Foto de Capa *"
          name="photo"
          prepend-icon
          required
        ></v-file-input>

        <resources-list name="Aula" :resources="[]" redirect="true" path="lesson" />
        <span class="new-lessons-span">Favor, adicionar uma aula</span>
        <!-- Button Purple Solid -->
        <v-btn color="primary" class="save-button" @click="submit">Salvar</v-btn>

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
    path: '/admin/criar-curso'
  }
</router>

<script scoped>
import courses from '~/services/http/courses';
import utils from '~/utils';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  data() {
    return {
      title: 'Gerenciar meus cursos',
      sendCourse: false,
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        title: '',
        description: '',
        authorName: '',
        authorDescription: '',
        workload: '',
        thumbUrl: '',
        photo: null,
      },

      titleRules: [v => !!v || 'O título é obrigatório'],
      descriptionRules: [v => !!v || 'A descrição é obrigatória'],
      authorNameRules: [v => !!v || 'O professor é obrigatório'],
      authorDescriptionRules: [
        v => !!v || 'Campo obrigatório',
      ],
      workloadRules: [v => !!v || 'A carga horária é obrigatória'],
      photoRules: [v => !!v || 'A foto de capa é obrigatória'],
    };
  },

  head() {
    return {
      title: this.title,
    };
  },

  components: {
    HeaderBar,
    NavigationBar,
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('authorName', this.form.authorName);
        formData.append('authorDescription', this.form.authorDescription);
        formData.append('workload', this.form.workload);
        formData.append('photo', this.form.photo);
        formData.append('thumbUrl', this.form.thumbUrl);

        courses
          .createCourse(formData)
          .then(res => {
            this.loading = false;
            this.sendCourse = true;
            this.confirmSnackbar('Curso cadastrado com sucesso!', 'success');
            this.$store.commit('courses/setCurrent', res.data)
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

    goBack() {
      window.history.length > 1
        ? $nuxt._router.go(-1)
        : $nuxt._router.push('/');
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },

  mounted() {
    if (localStorage.getItem('current_course')) {
    }
    utils
      .getExternalCredentials()
      .then(res => {
        const { data } = res;
        this.token = data.accessToken;
      })
      .catch(err => {
        console.error(err);
      });
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

.v-input {
  width: 90%;
  height: 50px;
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

.new-lessons-span {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #656565;
  width: 100%;
  text-align: center;
  display: inline-block;
}
/* Button Purple Solid */
.save-button {
  height: 2.75em;
  width: 100%;
  font-weight: 600;
  margin-top: auto;
  display: flex;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
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
::v-deep .v-btn:not(.v-btn--round).v-size--large {
  margin-bottom: 50px;
}
</style>
