<template>
  <div id="page">
    <HeaderBar :title="'Gerenciar Meus Cursos'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md4 style="text-align: -webkit-left;">      
        <v-container>
          <v-row>
            <v-col>
              <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>
              <h3>Curso</h3>
              <v-form class="course-form" ref="form" lazy-validation>        
                <v-text-field
                  :rules="titleRules"
                  v-model="form.title"
                  label="Título *"
                  name="title"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="descriptionRules"
                  v-model="form.description"
                  label="Descrição *"
                  name="description"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="authorNameRules"
                  v-model="form.authorName"
                  label="Professor *"
                  name="authorName"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="authorDescriptionRules"
                  v-model="form.authorDescription"
                  label="Biografia do Professor *"
                  name="authorDescription"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="workloadRules"
                  v-model="form.workload"
                  type="number"
                  label="Carga Horária *"
                  name="workload"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.thumbUrl"
                  label="URL da Imagem do Curso"
                  name="thumbUrl"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="form.photo"
                  :rules="photoRules"
                  label="Foto de Capa *"
                  name="photo"
                  prepend-icon
                  required
                ></v-file-input>

                <resources-list name="Aula" :resources="[]" redirect="true" path="lesson" />
                <span class="new-lessons-span">Favor, adicionar uma aula</span>
                
                <v-btn 
                class="btn-block btn-primary" 
                @click="submit">
                  Salvar
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
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
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
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

.v-input {
  width: 90%;
  height: 50px;    
}
.v-input input {
  color: none;
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
