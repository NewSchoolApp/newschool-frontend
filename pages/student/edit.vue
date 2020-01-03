<template>
  <v-layout align-center justify-center>

    <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>

    <v-flex xs10 sm8 md6 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="btn-container">
              <img src="~/assets/btn-voltar.svg" alt="botão voltar" @click="gotoIndex"/>
            </div>
            <div class="title-container">
                 <h2 class="page-title">Alterar meus dados</h2>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="12">
              <v-text-field
                v-model="form.name"
                placeholder="Nome"
                name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                placeholder="E-mail"
                name="email"
                required
              ></v-text-field>             
              <v-text-field
                v-model="form.urlFacebook"
                placeholder="URL do Facebook"
                name="urlFacebook"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="form.urlInstagram"
                placeholder="URL do Instagram"
                name="urlInstagram"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn class="btn-block btn-submit" depressed large @click="submit">Alterar Dados</v-btn>              
            </v-col>
            <v-col cols="12">
              <v-btn class="btn-block btn-submit" depressed large @click="submit">Alterar Senha</v-btn>
            </v-col>            
          </v-form>
          <v-snackbar
            v-model="snackbar"
            :color="snackbarStatus"
            :timeout="5000"
            :top="true"
            :right="true"
          >
            {{ snackbarText }}
            <v-btn
              color="#FFF"
              text
              @click="snackbar = false"
            >
              Fechar
            </v-btn>
          </v-snackbar>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<router>
  {
    path: '/aluno/alterar'
  }
</router>

<script scoped>
import auth from "../../services/http/auth";
import  users  from '../../services/http/users';


export default {
  data() {
    return {
      status: true,
      loading: false,            
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        id: '',
        name: '',
        email: '',
        urlFacebook: '',
        urlInstagram: '',
        role: ''
      },
      nameRules: [v => !!v || "Digite seu nome"],
      emailRules: [
        v => !!v || "Digite o e-mail",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ]
    };
  },
  created(){       
    let user = this.getUser();
    this.form = { 
      ...user,
      role: 'STUDENT'
    };
  },
   methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
          users.update(this.form)
          .then(res => {     
            this.loading = false;  
            this.confirmSnackbar('Dados alterados com sucesso', 'success');
            setTimeout(() => {
              this.gotoIndex();
            }, 1500); 
          })
          .catch(err => {
            this.confirmSnackbar('Ocorreu um erro.', 'error');
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
        this.$refs.flex.classList.add("hide-form");
        document.querySelector("html").style.overflow = "hidden";
        setTimeout(() => {
          this.loading = true;
        }, 300);
      } else {
        this.$refs.flex.classList.add("error-form");
        setTimeout(() => {
          this.$refs.flex.classList.remove("error-form");
        }, 500);
      }
      document.querySelector("html").style.overflow = "scroll";
    },        

    gotoIndex() {
      $nuxt._router.push("/index");
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },

    getUser() {
      try {
        return JSON.parse(localStorage.getItem('user'))
        
      } catch (e) {
        return {
          name: '',
          email: ''
        }        
      }
    }
  },

  }

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap");

/* Global */
* {
  font-family: "Montserrat", Helvetica, Arial, sans-serif !important;
}

.flex {
  animation: intro 300ms backwards;
  animation-delay: 350ms;
}

.layout {
  background: #fff !important;
}

::v-deep ::placeholder{
  color: #6600CC!important;
}


/* Page */
.page-title {
font-family: 'Montserrat';
font-style: normal;
font-weight: 900;
font-size: 16px;
text-transform: uppercase;
line-height: 19px;
text-align: center;
color: #6600CC;
margin-top: -6%;
}


/* Botão */
.btn-container {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
}

.btn-container img {
margin-left: -4%;
width: 16px;
color:  #6600CC;
margin-top: -6%;
}


/* Form */
.v-form {
  width: 100%;
}

::v-deep .theme--light.v-label {
  font-weight: 600;
  color: #6600CC !important;
}

::v-deep .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border: 1px solid #6600CC !important;
}

::v-deep .theme--light.v-text-field:not(.v-input--has-state) > .v-input__control > .v-input__slot:hover:before {
  border-color: #6600CC !important;
}

::v-deep .theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600CC !important;
}

::v-deep .v-input__slot {
  margin-top: 20px !important;
  padding-left: 5px !important;
  width: 100%;
  border-radius: unset !important;
  background-color: #fff !important;
  box-shadow: none !important;
}

::v-deep .v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
  color: #6600CC;
}

::v-deep .theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600CC;
}

::v-deep .v-icon.v-icon.v-icon--link {
  color: #aa56ff;
  padding-right: 5px;
}

::v-deep .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #6600cc !important;
  border-radius: 5px !important;
  color: #fff !important;
  font-weight: bold !important;
}

::v-deep .login-link {
  color: #6600cc !important;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}


/* Error messages */
.v-messages__message {
  color: #ff5252 !important;
  font-size: 12px !important;
  margin-left: 5px;
}


/* Snackbar */
.v-snack__content {
  border-radius: 5px;
}
</style>