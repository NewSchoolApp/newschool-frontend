<template>
  <div id="page">
    <HeaderBar :title="'Gerenciar Meus Cursos'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md4 style="text-align: -webkit-left;">      
        <v-container>
          <v-row>
            <v-col>
              <h3>Parte</h3>
              <v-form class="part-form" ref="part" v-model="status" lazy-validation>
                <v-text-field
                  v-model="part.title"
                  :rules="titleRules"
                  :margin-bottom="!titleRules"
                  label="Título"
                  required
                />
                <v-textarea v-model="part.description" 
                  label="Descrição" 
                  rows="1" 
                  required 
                />
                <v-text-field
                  v-model="part.youtubeUrl"
                  :rules="videoUrlRules"
                  label="Link do youtube"
                  required
                />
                <v-text-field
                  v-model="part.vimeoUrl"
                  :rules="videoUrlRules"
                  label="Link do vimeo"
                  required
                />
              </v-form>

              <resources-list name="Teste" :resources="[]" :redirect="submited" path="test" />
              <span class="new-tests-span">Favor, adicionar um teste</span>
              <v-btn class="btn-block btn-primary"
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
    path: '/admin/course/:courseId/lesson/:lessonId/part/new'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import parts from '~/services/http/parts';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data: () => ({
    title: 'Crie uma Parte',
    status: true,
    submited: false,
    loading: false,
    snackbar: false,
    snackbarText: '',
    snackbarStatus: '',
    part: {
      title: '',
      description: '',
      youtubeUrl: '',
      vimeoUrl: '',
      lessonId: '',
    },
    titleRules: [title => !!title || 'Digite um título'],
    videoUrlRules: [video => !!video || 'Insira o link do vídeo'],
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Ajude a espalhar o conhecimento criando uma Parte de um Curso da New School - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
  created() {
    this.part.lessonId = this.$route.params.lessonId;
    this.courseId = this.$route.params.courseId;
  },
  methods: {
    submit() {
      if (this.$refs.part.validate()) {
        this.animateForm(true);
        parts
          .createPart(this.part)
          .then(res => {
            this.loading = false;
            this.showConfirmSnack('Parte criada! ;)', 'success');
            this.submited = true;
            $nuxt._router.push(
              `/admin/course/${this.courseId}/lesson/${this.part.lessonId}/part/${res.data.id}/test/new`,
            );
          })
          .catch(err => {
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
