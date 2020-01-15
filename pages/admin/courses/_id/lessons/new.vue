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
              <h2 class="section-title">Aula</h2>
              <v-text-field
                :rules="titleRules"
                v-model="lesson.title"
                color="#60c"
                label="Título *"
                name="title"
                required
              ></v-text-field>
              <v-text-field
                :rules="descriptionRules"
                v-model="lesson.description"
                color="#60c"
                label="Descrição *"
                name="description"
                required
              ></v-text-field>
              </v-col>
            <v-col cols="12" class="classes-title">
              <h2 class="section-title">
                Partes
                <v-btn @click="gotoAddClass" class="btn-add-class" text icon>
                  <v-icon size="30">mdi-plus-circle-outline</v-icon>
                </v-btn>
              </h2>
            </v-col>
            <v-col cols="12" class="classes">
              <p>Favor adicionar uma parte</p>
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
<router>
  {
    path: '/admin/course/:courseId/lesson/new'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar'
import lessons from '~/services/http/lessons'

export default {
    components: {
      NavigationBar
    },
    data: () => ({
      title: 'Crie uma Aula',
      status: true,
      submited: false,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      lesson : {
          title: '',
          description: '',
          course: '',
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
                lessons.createLesson(this.lesson)
                .then(res => {
                    this.loading = false
                    this.showConfirmSnack('Aula criada! ;)', 'success')
                    this.submited = true
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
    }
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
  width: 40%;
  margin-left: 20%;
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