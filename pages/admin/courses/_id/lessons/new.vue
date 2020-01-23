<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" xs10 sm8 md6 class="main-container">
      <h1>
        <n-link to="../edit">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>
        Gerenciar meus cursos
      </h1>

      <v-form class="lesson-form" ref="lesson" v-model="status" lazy-validation>
        <h3>Aula</h3>
        <v-text-field
          v-model="lesson.title"
          :rules="titleRules"
          :margin-bottom="!titleRules"
          color="#60c"
          label="Título"
          required
        />
        <v-textarea
          :rules="descriptionRules"
          :margin-bottom="!titleRules"
          v-model="lesson.description"
          color="#60c"
          label="Descrição"
          rows="1"
          required
        />
      </v-form>

      <resources-list
        name="Parte"
        :resources="[]"
        redirect="true"
        path="part"
      />
      <span class="new-tests-span">Favor, adicionar uma parte</span>

      <v-btn color="primary" class="save-button mb-50" @click="submit">Salvar</v-btn>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarStatus"
      :timeout="5000"
      :top="true"
      :right="true"
    >
      {{ snackbarText }}
      <v-btn color="#FFF" text @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/new'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar'
import generic from '~/services/http/generic'

export default {
  components: {
    NavigationBar,
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
    }
  },
  created() {
    this.lesson.course = this.$route.params.courseId
  },
  methods: {
    submit() {
      if (this.$refs.lesson.validate()) {
        this.animateForm(true)
        generic
          .post('/api/v1/lesson', this.lesson)
          .then(res => {
            this.loading = false
            this.showConfirmSnack('Aula criada! ;)', 'success')
            this.submited = true
            setTimeout(() => {
              this.goBack()
            }, 2500)
          })
          .catch(err => {
            this.showConfirmSnack('Ocorreu um erro.', 'error')
            setTimeout(() => {
              this.loading = false
            }, 500)
            console.error(err)
          })
      } else {
        this.animateForm(false)
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add('hide-form')
        document.querySelector('html').style.overflow = 'hidden'
        setTimeout(() => {
          this.loading = true
        }, 300)
      } else {
        this.$refs.flex.classList.add('error-form')
        setTimeout(() => {
          this.$refs.flex.classList.remove('error-form')
        }, 500)
      }
      document.querySelector('html').style.overflow = 'scroll'
    },

    showConfirmSnack(text, status) {
      this.snackbarText = text
      this.snackbarStatus = status
      this.snackbar = true
    },

    goBack() {
      window.history.length > 1 ? $nuxt._router.go(-1) : $nuxt._router.push('/')
    },
  },
}
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

.main-container {
  display: flex;
  flex-direction: column;
  padding: 2em 3em 1.5em 2em;
}

.v-input {
  width: 90%;
  height: 50px;
}

.save-button {
  height: 2.75em;
  width: 100%;
  font-weight: 900;
  margin-top: auto;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.v-button__content {
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
}

.new-tests-span {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #656565;
  width: 100%;
  text-align: center;
  display: inline-block;
}

.back-button {
  min-width: 0 !important;
  float: left;
}

.v-label {
  color: #60c;
}

.lesson-form {
  margin-top: 0;
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
</style>
