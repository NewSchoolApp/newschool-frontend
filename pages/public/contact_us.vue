<template>
  <div class="subtitle-2 text-center align">
      <v-layout mt-10>
          <v-flex ref="flex">
              <v-container>
                  <v-row>
                      <h2 class="page-title">Fale Conosco</h2>      
                  </v-row>
                  <v-row>
                  <v-col cols="12" mt-5>
                    <v-row>
                      <img src="../../assets/contact-us.svg" alt="imagem contato" />
                    </v-row>
                  </v-col>
                  </v-row>
                  <v-row>
                      <v-form ref="form" v-model="status" lazy-validation>
                          <v-col cols="12">
                          <v-text-field
                              :rules="nameRules"
                               v-model="form.name"
                              label="Nome"
                              name="name"
                              requiredv-model="form.name"
                          ></v-text-field>
                          <v-text-field
                              v-model="form.email"
                              :rules="emailRules"
                              label="E-mail"
                              name="email"
                              required
                          ></v-text-field>
                          <v-text-field
                              v-model="form.message"
                              :rules="messageRules"
                              label="Mensagem"
                              name="message"
                              required
                          ></v-text-field>                           
                              <v-card>
                                  <v-btn class="btn-block btn-submit" depressed large @click="submit">Enviar</v-btn>
                              </v-card>
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
  </div>
</template>

<router>
  {
    path: '/fale_conosco'
  }
</router>

<script scoped>

import auth from "../../services/http/auth";
import contactUs from "../../services/http/contact_us";

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
        name: '',
        email: '',
        message: ''
      },
      nameRules:[v => !!v || "Digite seu nome"],
      messageRules:[v => !!v || "Digite uma mensagem"],
      emailRules: [
        v => !!v || "Digite o e-mail",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ]
    };
  },

  mounted() {
    auth.getExternalCredentials().then(res => {      
        const { data } = res;
        this.token = data.accessToken;           
      })
      .catch(err => {            
        console.error(err);
      });
   },
  methods: {
    submit() {      
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        contactUs.submit(this.form, this.token)
          .then(res => {               
            this.loading = false;  
            this.confirmSnackbar('Email enviado com sucesso!', 'success');
            setTimeout(() => {
              this.gotoHome();
            }, 2500); 
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
    gotoHome() {
      $nuxt._router.push("/index");
    },
    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    }
  },
}

</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap");


.align{
    width: 100%;
    margin: 3% auto;
    text-align: center;
}



.page-title {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  color: #6600cc;
  text-align: center;

}
img, h2 {
    width: 100%;
    margin: 0 10%!important;
}
.v-text-field {
  padding-top: 0;
  margin-top: 0;
  color: #6600CC;
}

.v-form {
  width: 100%;
  color: #6600CC;
  margin-top: 9%!important
}
.theme--light.v-label {
  font-weight: 500;
  color: #aa56ff;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #aa56ff;
}

.theme--light.v-text-field:not(.v-input--has-state) > .v-input__control > .v-input__slot:hover:before {
  border-color: #6600CC;
}

.theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600CC;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #6600cc;
  border-radius: 5px;
  color: #fff;
  font-weight: normal;
  width: 100%;


  
}
.v-text-field {
  padding-top: 0;
  color: #6600CC;
  margin: 5% 8%;
  
}
.v-card{
  
    box-shadow: 0px 5px 10px gray;
    margin: 2% 4%;
}

</style>