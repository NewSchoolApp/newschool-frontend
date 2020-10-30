<template>
  <div id="page">
    <HeaderBar :title="'Gerenciar Meus Cursos'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md4 style="text-align: -webkit-left;">      
        <v-container>
          <v-row>
            <v-col>
              <h3>Aula</h3>
              <v-form class="lesson-form" ref="lesson" v-model="status" lazy-validation>        
                <v-text-field
                  v-model="lesson.title"
                  :rules="titleRules"
                  :margin-bottom="!titleRules"
                  label="Título"
                  required
                />
                <v-textarea
                  :rules="descriptionRules"
                  :margin-bottom="!titleRules"
                  v-model="lesson.description"
                  label="Descrição"
                  rows="1"
                  required
                />
              </v-form>

              <resources-list name="Parte" :resources="[]" redirect="true" path="part" />
              <span>Favor, adicionar uma parte</span>
              
              <v-btn 
              class="btn-block btn-primary" 
              @click="submit">
                Salvar
              </v-btn>
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
        <v-btn color="#FFF" text @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/new'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import generic from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data: () => ({
    title: 'Crie uma Aula',
    status: true,
    submited: false,
    loading: false,
    snackbar: false,
    snackbarText: '',
    snackbarStatus: '',
    lesson: {
      title: '',
      description: '',
      courseId: '',
    },
    titleRules: [title => !!title || 'Digite um título'],
    descriptionRules: [v => !!v || 'Digite uma descrição'],
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Ajude a espalhar o conhecimento criando a Aula de um Curso da New School - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
  created() {
    this.lesson.courseId = this.$route.params.courseId;
  },
  methods: {
    submit() {
      if (this.$refs.lesson.validate()) {
        this.animateForm(true);
        generic
          .post('/api/v1/lesson', this.lesson)
          .then(res => {
            this.loading = false;
            this.showConfirmSnack('Aula criada! ;)', 'success');
            this.submited = true;
            setTimeout(() => {
              $nuxt._router.push(`/admin/course/${this.lesson.courseId}/lesson/${res.data.id}/part/new`);
            }, 2500);
          })
          .catch(err => {
            this.showConfirmSnack('Ocorreu um erro.', 'error');
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

    showConfirmSnack(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },

    goBack() {
      window.history.length > 1
        ? $nuxt._router.go(-1)
        : $nuxt._router.push('/');
    },
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
</style>
