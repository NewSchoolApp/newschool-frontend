<template>
  <v-layout justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>

    <v-flex ref="flex" v-else xs10 sm8 md6>
      <v-container>
        <v-row>
          <v-col cols="1">
            <v-btn @click="goBack" class="btn-back" text icon>
              <v-icon size="30">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <h2 class="page-title">Gerenciar meus cursos</h2>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <h2 class="section-title">Curso</h2>
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
              <v-file-input
                v-model="form.photo"
                :rules="photoRules"
                color="#60c"
                label="Foto de capa *"
                name="photo"
                prepend-icon=""
                required
              ></v-file-input>
            </v-col>
            <v-col cols="12" class="classes-title">
              <h2 class="section-title">Aulas</h2>
              <v-btn @click="gotoAddClass" class="btn-add-class" text icon>
                <v-icon size="30">mdi-plus-circle-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" class="classes">
              <p>Favor, adicionar uma aula</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn @click="submit" color="#60c" dark block depressed large>
                Salvar
              </v-btn>
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
            <v-btn @click="snackbar = false" color="#FFF" text>Fechar</v-btn>
          </v-snackbar>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import courses from '~/services/http/courses'
import utils from '~/utils'

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
        photo: null,
      },

      titleRules: [v => !!v || 'O título é obrigatório'],
      descriptionRules: [v => !!v || 'A descrição é obrigatória'],
      photoRules: [v => !!v || 'A foto de capa é obrigatória'],
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
        const formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('photo', this.form.photo)
        formData.append('thumbUrl', '')
        formData.append('authorId', this.$store.state.user.data.id)

        this.animateForm(true)
        courses
          .createCourse(formData)
          .then(res => {
            this.loading = false
            this.confirmSnackbar('Curso cadastrado com sucesso!', 'success')
            setTimeout(() => {
              this.goBack()
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

    gotoAddClass() {
      $nuxt._router.push('/admin/courses')
    },

    goBack() {
      window.history.length > 1 ? $nuxt._router.go(-1) : $nuxt._router.push('/')
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text
      this.snackbarStatus = status
      this.snackbar = true
    },
  },

  mounted() {
    utils
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
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 15%;
  margin-left: 10%;
  transform: translateX(-50%);
}

.classes {
  height: 40vh;
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

/* inputs */
::v-deep .theme--light.v-text-field {
  margin-top: 0;
}

::v-deep .v-input {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

::v-deep .theme--light.v-input:not(.v-input--is-disabled) input,
::v-deep
  .theme--light.v-file-input:not(.v-input--has-state)
  .v-file-input__text {
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
  color: #60c;
}

/* Botão */
::v-deep .btn-back {
  margin-top: 15px;
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

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
