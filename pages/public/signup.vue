<template>
  <v-layout align-center justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>

    <v-flex v-else ref="flex" xs10 sm8 md6>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="logo-container">
              <img src="~/assets/purple-logo.svg" alt="castor" />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h1 class="page-title">Cadastro</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-form ref="form" v-model="status" lazy-validation>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Digite seu nome"
                label="Qual é o seu nome?"
                name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                placeholder="Digite seu e-mail"
                :rules="emailRules"
                label="E o seu e-mail?"
                name="email"
                required
              ></v-text-field>
              <v-select
                v-model="form.profile"
                placeholder="Selecione o seu perfil!"
                :items="profile"
                :rules="nameRules"
                label="Quem é você fora do app?"
                required
                hide-no-data
              ></v-select>
              <!-- <v-text-field
                v-if="this.form.profile === 'Aluno'"
                v-model="form.institutionName"
                :items="schools"
                placeholder="Digite o nome da sua escola"
                label="Onde estuda?"
              ></v-text-field> -->
              <v-autocomplete
                v-if="this.form.profile === 'Aluno'"
                v-model="form.institutionName"
                :items="schools"
                hide-no-data
                :loading="isLoading"
                placeholder="Digite o nome da sua escola"
                label="Onde estuda?"
                @keyup="searchTimeOut($event.target.value)"
              ></v-autocomplete>
              <v-text-field
                v-model="form.password"
                placeholder="Digite sua senha"
                label="Crie sua senha"
                name="password"
                :rules="passwordRules"
                :type="showPass ? 'password' : 'text'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showPass = !showPass)"
              ></v-text-field>
              <v-text-field
                v-model="form.confirmPassword"
                placeholder="Confirme sua senha"
                :rules="confirmPasswordRules"
                :type="showConfirmPass ? 'password' : 'text'"
                :append-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showConfirmPass = !showConfirmPass)"
              ></v-text-field>

              <div class="terms">
                <v-checkbox v-model="agree" />
                <div id="terms-message">
                  Declaro que li e concordo com os
                  <span class="link" @click="termsDialog = true">
                    Termos e Condições de Uso
                  </span>
                  e com
                  <span class="link" @click="privacyDialog = true">
                    A Política de Privacidade
                  </span>
                  do New School App
                </div>
              </div>

              <v-dialog v-model="termsDialog" width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Termos
                  </v-card-title>

                  <v-card-text>
                    Os termos ainda estão sendo formulados.
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="termsDialog = false">
                      Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="privacyDialog" width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Políticas de Privacidade
                  </v-card-title>

                  <v-card-text
                    ><br />
                    Salve, salve! Que daora que você está aqui! A New School
                    acredita no poder da educação e da tecnologia para formar
                    cidadãos capazes de transformar suas próprias realidades.
                    Nós queremos impactar a vida dos jovens das periferias de
                    todo o país, formando os novos protagonistas de todas as
                    quebradas, favelas, subúrbios, comunidades, ou como quer que
                    você chame, aí no seu Estado. Quando você utiliza nossos
                    serviços, fornece algumas informações para que possamos
                    atingir as suas expectativas em relação à qualidade do nosso
                    produto, e também para que possamos fazer comunicações
                    necessárias para construir nosso relacionamento atual e
                    futuro, certo? Assim, entendemos que você está confiando em
                    nós, para proteger suas informações e essa é a nossa
                    responsa. Você está aqui para saber quais dados coletamos,
                    para que utilizamos estes dados e como estamos fazendo isso.
                    Nós vamos detalhar isso abaixo, em nossa Política de
                    Privacidade e Proteção de Dados (Política). Por favor, leia
                    esse documento atentamente, pois ele lhe ajudará a gerenciar
                    melhor todos os seus direitos, conforme a nova lei
                    brasileira 13.709/2018 (LGPD).
                    <br />
                    <br />
                    <h4>DADOS QUE COLETAMOS</h4>
                    Logo abaixo trazemos uma lista dos dados que coletamos e as
                    finalidades de tratamento.
                    <br />
                    <br />
                    <h4>PODEMOS COLETAR OU VOCÊ PODERÁ NOS FORNECER</h4>
                    Para se cadastrar no App, obrigatoriamente, você só precisa
                    mesmo fornecer seu primeiro nome e email, mas se você quiser
                    realizar o cadastro completo para ter uma experiência mais
                    daora dentro do App, pode complementar com os seguintes
                    dados: Nome completo, seu gênero, sua quebrada, seu e-mail,
                    telefone (WhatsApp), escolaridade e o seu trampo, se você
                    estiver trampando. A finalidade de recolhermos estes dados
                    pessoais é direcionar o seu acesso aos cursos, ampliar o
                    nosso relacionamento, enviar ofertas e comunicados de novos
                    cursos, lembretes de calendários, divulgar promoções e
                    descontos de parceiros, cumprir com obrigações legais e
                    alertas de segurança. Usamos esses dados, também, para
                    informar sobre novidades, funcionalidades, conteúdos,
                    notícias e eventos relacionados aos nossos serviços. Além
                    disso, os dados também são utilizados para a sua proteção,
                    seja para cumprir obrigações legais e assim assegurar seus
                    direitos ou até mesmo para prevenir alguma fraude.
                    <br />
                    <br />
                    Além disso, esclarecemos os motivos específicos pelos quais
                    precisaremos tratar os seus dados (cumprir obrigações
                    legais, atender suas expectativas e melhorar nossa relação).
                    Caso você esteja no terceiro ano do ensino médio, você pode
                    optar ou não por compartilhar seus dados com nossos
                    Parceiros, para saber todos os detalhes sobre este
                    compartilhamento, basta fazer o login em nosso App e acessar
                    a “Central LGPD”, lá explicamos tudo. E tem mais, pode rolar
                    uma internacionalização dos dados devido ao uso de recurso
                    de armazenamento em nuvem, mas tá tranquilo, independente de
                    onde for armazenados, a gente se preocupa em tomar todas as
                    medidas de segurança necessárias!
                    <br />
                    <br />
                    <h4>PRAZO E LOCAL DE ARMAZENAMENTO DOS DADOS</h4>
                    Nós guardamos seus dados por períodos diferentes, utilizando
                    diversas tecnologias, de acordo com a natureza do dado e de
                    acordo com determinações legais. Seus dados serão
                    armazenados pelo prazo em que durar a nossa relação, até
                    você pedir o apagamento ou até todos os prazos legais de
                    guarda acabarem, e quando esse prazo acabar, serão
                    definitivamente eliminados.
                    <br />
                    <br />
                    <h4>ACESSIBILIDADE DOS DADOS PESSOAIS</h4>
                    Você pode exportar uma cópia das suas informações ou
                    excluí-las a qualquer momento, desde que não envolvam
                    informações relacionadas a segredo comercial ou não haja
                    impeditivos legais para fazer isso.
                    <br />
                    <br />
                    <h4>Quais opções eu possuo?</h4>
                    <ul>
                      <li>
                        Caso você preferir não receber e-mails, correspondências
                        ou publicidades relativas aos nossos produtos e
                        serviços, basta nos informar quando você fornecer as
                        suas informações pessoais ou seguir as instruções
                        contidas em nossos sites para remover o seu nome da
                        nossa lista(s) de correspondências.
                      </li>
                      <li>
                        Você tem o direito de acessar (revisar, corrigir,
                        alterar ou apagar) as suas informações pessoais entrando
                        em contato com a gente, pelo contato@akiehnewschool.com
                      </li>
                      <li>
                        Caso você tenha criado um "perfil de usuário" em nosso
                        aplicativo, você poderá alterar as suas informações após
                        fazer o login, clicando em “quem sou”
                      </li>
                    </ul>
                    <br />
                    <br />
                    <h4>E em relação à segurança das informações?</h4>
                    <ul>
                      <li>
                        Quando você fornece informações pessoais, nós empregamos
                        determinadas medidas de segurança, tais como encriptação
                        quando apropriado.
                      </li>
                      <li>
                        As informações pessoais que você nos fornece podem vir a
                        ser transmitidas, usadas, armazenadas e de outras formas
                        processadas fora do país em que você registrou essas
                        informações, ou seja tem a possibilidade dos dados irem
                        para um pais com leis de proteção diferentes.
                      </li>
                      <li>
                        Independentemente de onde essas atividades ocorrerem,
                        tomamos medidas adequadas para assegurar que as suas
                        informações serão tratadas de forma segura.
                      </li>
                    </ul>
                    <br />
                    <br />
                    <h4>E em relação à privacidade dos meus filhos?</h4>
                    <ul>
                      <li>
                        Os nossos aplicativo destina-se apenas ao uso por
                        pessoas com mais de 16 anos. Pessoas com menos de 16
                        anos não deverão submeter informações pessoais à New
                        School sem que tenha o consentimento dos pais ou
                        responsáveis, que poderá ser acessado em nosso Termo e
                        Condições de Uso.
                      </li>
                    </ul>
                    <br />
                    <br />
                    <h4>CANAL DE CONTATO</h4>
                    Em caso de qualquer dúvida com relação às disposições da
                    Política, você poderá entrar em contato com nosso DPO
                    através do email contato@akiehnewschool.com
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="privacyDialog = false">
                      Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn class="btn-block btn-primary" @click="submit">
                Cadastrar
              </v-btn>
            </v-form>
          </v-col>
          <v-col cols="12" class="text-center">
            <a class="login-link" @click="gotoLogin">Ops, já tenho conta</a>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<router>
{
  path : '/cadastro'
}
</router>

<script scoped>
import Axios from 'axios';
import auth from '../../services/http/auth';
import utils from '~/utils/index';
import { http } from '~/services/http/config';

export default {
  data() {
    return {
      agree: false,
      termsDialog: false,
      privacyDialog: false,
      title: 'Cadastro',
      status: true,
      loading: false,
      isLoading: false,
      inviteKey: undefined,
      showPass: String,
      showConfirmPass: String,
      schools: [],
      profile: [
        'Aluno de escola',
        'Pai de aluno',
        'Professor',
        'Estudante de faculdade',
        'Parceiro/Investidor',
        'Parei de estudar',
        'Outros',
      ],
      form: {
        name: '',
        email: '',
        password: '',
        profile: '',
        confirmPassword: '',
        schooling: '',
        institutionName: '',
        role: 'STUDENT',
      },

      nameRules: [v => !!v || 'O campo não pode estar em branco'],
      passwordRules: [
        v => !!v || 'Digite a senha',
        v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caractéres',
      ],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      localStorage: {},
    };
  },
  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || 'Confirme a senha',
        () =>
          this.form.password === this.form.confirmPassword ||
          'As senhas devem ser idênticas.',
      ];
    },
  },
  mounted() {
    this.inviteKey = this.$route.params.inviteKey;

    if (window.localStorage) {
      this.localStorage = window.localStorage;
    } else {
      this.localStorage = localStorage;
    }
  },

  methods: {
    submit() {
      this.localStorage.clear();
      if (this.$refs.form.validate() && this.agree) {
        const postObject = Object.assign({}, this.form);
        const profileEnum = {
          'Aluno de escola': 'STUDENT',
          'Parei de estudar': 'EX_STUDENT',
          'Estudante de faculdade': 'UNIVERSITY',
          'Pai de aluno': 'FATHER',
          'Parceiro/Investidor': 'INVESTOR',
          Outros: 'OTHERS',
          Professor: 'OTHERS',
        };
        const { profile } = postObject;
        postObject.profile = profileEnum[profile];

        delete postObject.confirmPassword;
        this.animateForm(true);
        this.loadClientCredentials()
          .then(res => {
            const token = res.data.accessToken;
            auth
              .signUp(postObject, token, this.inviteKey)
              .then(res => {
                this.$notifier.showMessage({
                  type: 'success',
                  message: 'Cadastro efetuado!',
                });
                setTimeout(() => {
                  if (!this.inviteKey) {
                    this.gotoLogin();
                  } else {
                    this.loading = false;
                    window.location =
                      'https://play.google.com/store/apps/details?id=com.newschool.app';
                  }
                }, 2500);
              })
              .catch(err => {
                if (err.response.status == 409) {
                  this.$notifier.showMessage({
                    type: 'error',
                    message: 'Email já cadastrado',
                  });
                } else {
                  this.$notifier.showMessage({
                    type: 'error',
                    message: 'Poxa algo deu errado',
                  });
                }

                setTimeout(() => {
                  this.loading = false;
                }, 500);
              });
          })
          .catch(() => {
            $nuxt._router.push('/login');
          });
      } else {
        this.animateForm(false);
      }
    },
    searchTimeOut(school) {
      if (!school) {
        this.schools = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getSchool(school);
      }, 800);
    },

    getSchool(school) {
      if (!school) {
        this.schools = [];
        return;
      }
      if (this.isLoading) return;

      this.isLoading = true;
      this.loadClientCredentials().then(res => {
        const token = res.data.accessToken;
        http
          .get(`${process.env.endpoints.SCHOOL}?name=${school}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
            if (!res.data.length) {
              this.isLoading = false;
              this.schools.unshift(school.toUpperCase());
            }
            res.data.forEach(school => this.schools.push(school.nome));
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
          });
      });
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

    showPassword() {
      this.eyeIcon === 'mdi-eye'
        ? (this.eyeIcon = 'mdi-eye-off')
        : (this.eyeIcon = 'mdi-eye');
    },

    showConfirmPassword() {
      this.eyeIcon2 === 'mdi-eye'
        ? (this.eyeIcon2 = 'mdi-eye-off')
        : (this.eyeIcon2 = 'mdi-eye');
    },

    gotoLogin() {
      $nuxt._router.push('/login');
    },
    loadClientCredentials() {
      return utils.getExternalCredentials();
    },
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Cadastra-se no aplicativo da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
};
</script>

<style scoped>
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
  color: var(--primary);
  width: 100%;
}

/* Logo */
.logo-container {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
}

.logo-container img {
  width: 48px;
}

/* Form */
.v-form {
  width: 100%;
}

::v-deep .theme--light.v-icon {
  color: var(--primary);
}

::v-deep .v-btn {
  margin-top: 15px;
}

::v-deep .v-card__actions {
  padding: 0;
}

::v-deep .v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitl {
  color: var(--primary);
  font-size: 14px;
}

::v-deep .v-messages__message {
  color: #ff5252;
  font-size: 14px;
  margin-left: 5px;
}

.login-link {
  font-size: 14px;
  color: var(--primary);
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}

.terms {
  font-family: 'Roboto';
  font-size: 15px;
  display: flex;
  align-items: baseline;
}

#terms-message {
  top: -3px;
  position: relative;
}

.link {
  font-weight: 700;
  color: var(--primary);
}
</style>
