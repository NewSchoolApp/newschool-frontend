<template>
  <v-layout align-center justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>

    <v-flex xs10 sm8 md6 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn class="btn-back" text icon @click="gotoCourses">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h2 class="page-title">Gerenciar meus cursos</h2>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <h2>Curso</h2>
              <v-text-field
                color="#60c"
                v-model="form.title"
                :rules="titleRules"
                label="Título"
                name="title"
                required
              ></v-text-field>
              <v-textarea
                color="#60c"
                v-model="form.description"
                label="Descrição"
                name="description"
                :rules="descriptionRules"
                required
              ></v-textarea>
            </v-col>
            <v-row>
              <v-col cols="12">
                <h2>Aulas</h2>
                <v-btn class="btn-add-class" text icon @click="gotoAddClass">
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="#60c" dark block depressed large @click="submit"
                  >Salvar</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" text-center>
                <p>Favor, adicionar uma aula</p>
              </v-col>
            </v-row>
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
          </v-row>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import courses from '../../../services/http/courses'
import auth from '../../../services/http/auth'

export default {
  data() {
    return {
      title: 'Gerenciar meus cursos',
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        title: '',
        description: '',
      },

      titleRules: [v => !!v || 'Digite um título'],
      descriptionRules: [v => !!v || 'Digite uma descrição'],
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const postObject = Object.assign({}, this.form)
        this.animateForm(true)
        courses
          .post(postObject, this.token)
          .then(res => {
            this.loading = false
            this.confirmSnackbar('Curso cadastrado com sucesso!', 'success')
            setTimeout(() => {
              this.goToCourses()
            }, 2500)
          })
          .catch(err => {
            this.confirmSnackbar(
              'Ocorreu um erro ao cadastrar o curso.',
              'error',
            )
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

    goToCourses() {
      $nuxt._router.push('/courses')
    },

    goToAddClass() {
      $nuxt._router.push('/courses')
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text
      this.snackbarStatus = status
      this.snackbar = true
    },
  },

  mounted() {
    auth
      .getExternalCredentials()
      .then(res => {
        const { data } = res
        this.token = data.accessToken
      })
      .catch(err => {
        console.error(err)
      })
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap');

/* Global */
* {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
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
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

/* inputs */
::v-deep .theme--light.v-text-field {
  margin-top: 0;
}

::v-deep .v-input {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

::v-deep .theme--light.v-input:not(.v-input--is-disabled) input {
  font-size: 12px;
  color: #60c;
}

::v-deep
  .theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #60c;
}

::v-deep .theme--light.v-label,
::v-deep .theme--light.v-icon {
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  color: #aa56ff;
}

::v-deep .theme--light.v-icon {
  font-size: 20px;
}

::v-deep .v-btn {
  margin-top: 15px;
}

::v-deep .v-btn__content {
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  line-height: 15px;
}

/* Botão */
::v-deep .btn-back {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
  font-size: 12px;
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
  color: #ff5252;
  font-size: 12px;
  margin-left: 5px;
}

.login-link {
  font-size: 12px;
  color: #6600cc;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
