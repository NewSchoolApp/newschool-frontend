<template>
  <div>
    <MenuBarBackCourse />
    <v-layout align-center justify-center>
      <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>
      <v-flex xs10 sm12 md8 ref="flex" v-else>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2 class="page-title">Aula</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="status" lazy-validation>
                <v-text-field
                  color="#60c"
                  v-model="form.title"
                  :rules="titleRules"
                  label="Título *"
                  name="title"
                  required
                ></v-text-field>
                <v-text-field
                  color="#60c"
                  v-model="form.description"
                  :rules="descriptionRules"
                  label="Descrição *"
                  name="description"
                  required
                ></v-text-field>
                <v-row class="ma-0 pt-4">
                  <h2 class="page-title" style="line-height: unset;">Parte</h2>
                  <v-btn class="ma-0 ml-4 rounded-button color-forced" outlined fab x-small>
                    <v-icon class="color-forced" size="30">mdi-plus</v-icon>
                  </v-btn>
                </v-row>

                <v-row class="ma-0 pt-4 justify-center">
                  <!-- <p class="subtitle-1 font-weight-bold">Favor, adicionar uma parte</p> -->
                  <v-alert
                    border="left"
                    width="100%"
                    colored-border
                    type="warning"
                    elevation="6"
                    color="yellow accent-4"
                    dense
                    tile
                  >Favor, adicionar uma parte.</v-alert>
                </v-row>

                <v-btn                 
                  bottom
                  color="#60c"
                  dark
                  block
                  depressed
                  large
                  @click="submit" 
                  width="100%"                 
                >Salvar</v-btn>
              </v-form>
            </v-col>

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
          
        </v-container>
      </v-flex>
       <navigation-bar />
    </v-layout>
   
  </div>
</template>

<router>
{
  path : '/admin/cadastrar-aula'
}

</router>

<script scoped>
import lessons from '../../../services/http/lessons';
import NavigationBar from '../../../components/NavigationBar.vue';
import MenuBarBackCourse from '../../../components/admin/MenuBarBackCourse.vue';

export default {
  components: {
    NavigationBar,
    MenuBarBackCourse
  },

  data() {
    return {
      status: true,
      loading: false,
      showPass: String,
      showConfirmPass: String,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        title: '',
        description: '',
        course: '',
        nextLesson: '',
      },
      titleRules: [v => !!v || 'Digite um título'],
      descriptionRules: [v => !!v || 'Digite uma descrição'],
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true)
        lessons
          .addLesson(this.form, this.token)
          .then(res => {
            this.loading = false
            this.confirmSnackbar('Aula adicionada com sucesso! ;)', 'success')
            setTimeout(() => {
              this.gotoLogin()
            }, 2500)
          })
          .catch(err => {
            this.confirmSnackbar('Ocorreu um erro.', 'error')
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

    gotoLogin() {
      $nuxt._router.push('/login')
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text
      this.snackbarStatus = status
      this.snackbar = true
    },
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
}

/* inputs */
::v-deep .theme--light.v-text-field {
  margin-top: 0;
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

.rounded-button {
  border-radius: 50px !important;
  min-width: 0 !important;
}

.msg-alert {
  font-size: 15px !important;
  font-weight: 500 !important;
  line-height: 15px !important;
  text-transform: unset !important;
  color: #737373;
}

.color-forced {
  color: #6600cc !important;
}
</style>
