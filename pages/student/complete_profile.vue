<template>
  <v-col id="main-col">
    <!-- header -->
    <v-row class="px-5 pb-9" justify="end" align="start">
      <v-icon color="primary" @click="gotoProfile">mdi-close-circle</v-icon>
    </v-row>
    <v-row class="px-5" justify="space-between" align="center">
      <v-icon color="primary" @click="changeTab('decrement')"
        >mdi-chevron-left</v-icon
      >
      <h3 class="text-uppercase">{{ tabNames[tab] }}</h3>
      <v-icon color="primary" @click="changeTab('increment')"
        >mdi-chevron-right</v-icon
      >
    </v-row>

    <!-- tabs -->
    <v-row class="py-6">
      <v-tabs v-model="tab" fixed-tabs height="35px">
        <v-tab class="mx-1">
          <v-icon>mdi-information-outline</v-icon>
        </v-tab>
        <v-tab class="mr-1">
          <v-icon>mdi-account-outline</v-icon>
        </v-tab>
        <v-tab class="mr-1">
          <v-icon>mdi-domain</v-icon>
        </v-tab>
        <v-tab class="mr-1">
          <v-icon>mdi-monitor</v-icon>
        </v-tab>
        <v-tab class="mr-1">
          <v-icon>mdi-account-plus-outline</v-icon>
        </v-tab>
      </v-tabs>
    </v-row>

    <v-form ref="form" lazy-validation>
      <v-tabs-items v-model="tab">
        <!-- Minhas Info -->
        <v-tab-item>
          <v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Data de Nascimento</div>
              <v-text-field
                filled
                readonly
                :value="formatedDate"
                @click="datePick = true"
              ></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Apelido</div>
              <v-text-field v-model="form.nickname" filled></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Email</div>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                filled
              ></v-text-field>
            </v-col>
          </v-col>

          <!-- data picker dialog -->
          <v-dialog v-model="datePick" persistent max-width="290">
            <v-date-picker v-model="form.birthday" no-title locale="pt-BR"
              ><v-spacer></v-spacer>
              <v-btn text color="primary" @click="datePick = false">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-tab-item>

        <!-- Quem Sou -->
        <v-tab-item>
          <v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Nome</div>
              <v-text-field
                v-model="form.name"
                filled
                :rules="requiredRules"
              ></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Gênero</div>
              <v-select v-model="form.gender" filled :items="genderItems" />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Perfil</div>
              <v-select v-model="form.profile" filled :items="profileItems" />
            </v-col>
          </v-col>
        </v-tab-item>

        <!-- Minha Quebrada -->
        <v-tab-item>
          <v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">País</div>
              <v-autocomplete
                v-model="form.country"
                :items="countries"
                filled
              />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Estado</div>
              <v-autocomplete
                v-model="form.state"
                :items="states"
                filled
                @change="getCities(form.state), (form.city = '')"
              />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Cidade</div>
              <v-autocomplete
                v-model="form.city"
                required
                :items="cities"
                filled
              />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Bairro</div>
              <v-text-field v-model="form.district" filled />
            </v-col>
          </v-col>
        </v-tab-item>

        <!-- Estudos e Trampo -->
        <v-tab-item>
          <v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Empregado</div>
              <v-radio-group
                v-model="form.employed"
                class="primary-checkbox"
                row
              >
                <v-radio label="Sim" :value="true"></v-radio>
                <v-radio label="Não" :value="false"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col v-if="form.employed" class="px-0 pb-5">
              <div class="input-label">Profissão</div>
              <v-text-field v-model="form.profession" filled></v-text-field>
            </v-col>

            <v-col class="px-0 pb-5">
              <div class="input-label">Grau de Escolaridade</div>
              <v-select
                v-model="form.schooling"
                filled
                :items="schoolingItems"
              />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Onde Estuda?</div>
              <v-autocomplete
                v-model="form.institutionName"
                filled
                :items="schools"
                hide-no-data
                hide-selected
                :loading="isLoading"
                @keyup="searchTimeOut($event.target.value)"
              ></v-autocomplete>
            </v-col>
          </v-col>
        </v-tab-item>

        <!-- Me add Aí -->
        <v-tab-item>
          <v-col class="px-6">
            <v-row class="pb-8" justify="space-between" align="center">
              <v-img
                class="social-icon"
                max-height="56"
                max-width="56"
                :src="require(`@/assets/facebookIcon.svg`)"
              />
              <v-col class="pr-8">
                <div class="connect-info">Conectado</div>
                <div class="connect-date">desde 11/11/2018</div>
              </v-col>
              <v-btn class="btn-new-white btn-connect">
                Conectar
              </v-btn>
            </v-row>

            <v-row class="pb-8" justify="space-between" align="center">
              <v-img
                class="social-icon"
                max-height="56"
                max-width="56"
                :src="require(`@/assets/instagramIcon.svg`)"
              />
              <v-col class="pr-8">
                <div class="connect-info">Conectado</div>
                <div class="connect-date">desde 11/11/2018</div>
              </v-col>
              <v-btn class="btn-new-white btn-connect">
                Conectar
              </v-btn>
            </v-row>

            <v-row class="pb-8" justify="space-between" align="center">
              <v-img
                class="social-icon"
                max-height="56"
                max-width="56"
                :src="require(`@/assets/twitterIcon.svg`)"
              />
              <v-col class="pr-8">
                <div class="connect-info">Conectado</div>
                <div class="connect-date">desde 11/11/2018</div>
              </v-col>
              <v-btn class="btn-new-white btn-connect">
                Conectar
              </v-btn>
            </v-row>

            <v-row class="pb-8" justify="space-between" align="center">
              <v-img
                class="social-icon"
                max-height="56"
                max-width="56"
                :src="require(`@/assets/tiktokIcon.svg`)"
              />
              <v-col class="pr-8">
                <div class="connect-info">Conectado</div>
                <div class="connect-date">desde 11/11/2018</div>
              </v-col>
              <v-btn class="btn-new-white btn-connect">
                Conectar
              </v-btn>
            </v-row>
          </v-col>
        </v-tab-item>
      </v-tabs-items>

      <!-- footer -->
      <v-row class="base">
        <v-btn
          class="btn-block btn-new-primary btn-shadow"
          :loading="loading"
          @click="submit"
        >
          Confirmar Alterações
        </v-btn>
      </v-row>
    </v-form>
  </v-col>
</template>

<router>
{
  path : '/aluno/cadastro-completo/:tab?',
}
</router>

<script>
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      tab: 0,
      datePick: false,
      completeProfile: false,
      form: {
        id: '',
        name: '',
        profile: '',
        email: '',
        nickname: '',
        birthday: '', // "2020-11-11T20:42:01.435Z"
        gender: '',
        schooling: '',
        institutionName: '',
        profession: '',
        address: '',
        city: '',
        state: '',
        urlFacebook: '',
        urlInstagram: '',
        // variáveis ainda não utilizadas no back
        employed: false,
        country: '',
        district: '',
        socialLinks: {
          facebook: {
            connected: false,
            since: '',
          },
          instagram: {
            connected: false,
            since: '',
          },
          twitter: {
            connected: false,
            since: '',
          },
          tiktok: {
            connected: false,
            since: '',
          },
        },
      },
      tabNames: [
        'Minhas Info',
        'Quem Sou',
        'Minha Quebrada',
        'Estudos e Trampo',
        'Me add Aí',
      ],
      schoolingItems: [
        'Ensino Fundamental Incompleto',
        'Ensino Fundamental Cursando',
        'Ensino Fundamental Completo',
        'Ensino Médio Incompleto',
        'Ensino Médio Cursando',
        'Ensino Médio Completo',
        'Ensino Superior Incompleto',
        'Ensino Superior Cursando',
        'Ensino Superior Completo',
        // 'Pós Graduação',
        // 'Mestrado',
      ],
      genderItems: ['Masculino', 'Feminino'],
      profileItems: [
        'Aluno',
        'Ex-Aluno',
        'Universitário',
        'Pai',
        'Investidor',
        'Outros',
      ],
      requiredRules: [v => !!v || 'O campo não pode estar em branco'],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      snackbar: {
        show: false,
        text: '',
        status: '',
      },
      schools: [],
      countries: ['Brasil'],
      states: [],
      stateAbbreviations: {},
      cities: [],
      districts: [],
    };
  },
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    formatedDate() {
      return this.form.birthday
        .split('-')
        .reverse()
        .join('/');
    },
  },
  mounted() {
    if (this.$route.params.tab) {
      this.tab = parseInt(this.$route.params.tab);
    }
    this.populateProfile();
  },
  methods: {
    populateProfile() {
      http.getAll(`/api/v1/user/${this.idUser}`).then(res => {
        const signupFields = [
          'name',
          'profile',
          'email',
          'nickname',
          'birthday', // "2020-11-11T20:42:01.435Z"
          'gender',
          'schooling',
          'profession',
          'address',
        ];

        const emptySignupFields = signupFields.filter(
          field => !res.data[field],
        );
        console.log(emptySignupFields);
        if (!emptySignupFields.length) {
          this.completeProfile = true;
        }

        // eslint-disable-next-line no-unused-expressions
        res.data.birthday
          ? (this.form.birthday = this.resolveDate(res.data.birthday))
          : {};
        // eslint-disable-next-line no-unused-expressions
        res.data.gender
          ? (this.form.gender = this.resolveGender(res.data.gender))
          : {};
        // eslint-disable-next-line no-unused-expressions
        res.data.profile
          ? (this.form.profile = this.resolveProfile({
              profile: res.data.profile,
              api: true,
            }))
          : {};
        // eslint-disable-next-line no-unused-expressions
        res.data.schooling
          ? (this.form.schooling = this.resolveSchooling({
              schooling: res.data.schooling,
              api: true,
            }))
          : {};
        this.form.nickname = res.data.nickname;
        this.form.email = res.data.email;
        this.form.name = res.data.name;
        this.form.profession = res.data.profession;
        res.data.profession === null
          ? (this.form.employed = false)
          : (this.form.employed = true);
        this.form.id = res.data.id;
        this.form.institutionName = res.data.institutionName;
        this.schools.push(res.data.institutionName);
        this.form.urlFacebook = res.data.urlFacebook;
        this.form.urlInstagram = res.data.urlInstagram;

        // populating address fields
        this.form.country = 'Brasil';
        this.getStates();
        if (res.data.address) {
          this.form.address = res.data.address;
          const resolvedAddress = this.resolveAddress({
            api: true,
            address: this.form.address,
          });
          this.form.state = resolvedAddress.state;
          // timeout needed for state input validation
          setTimeout(() => {
            this.getCities(this.form.state);
            // timeout needed for city itens to be populated
            setTimeout(() => {
              this.cities.includes(resolvedAddress.city)
                ? (this.form.city = resolvedAddress.city)
                : (this.form.city = '');
              this.form.district = resolvedAddress.district;
            }, 500);
          }, 1000);
        }
      });
    },
    getStates() {
      http
        .getAll('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => {
          res.data.forEach(element => {
            this.states.push(element.nome);
            this.stateAbbreviations[element.nome] = element.sigla;
          });
        });
    },
    getCities(stateName) {
      http
        .getAll(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.stateAbbreviations[stateName]}/municipios`,
        )
        .then(res => {
          this.cities = [];
          res.data.forEach(element => {
            this.cities.push(element.nome);
          });
        });
    },
    gotoProfile() {
      $nuxt._router.replace('/aluno/perfil');
    },
    loadClientCredentials() {
      return utils.getExternalCredentials();
    },
    searchTimeOut(school) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getSchool(school);
      }, 1200);
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
        const response = http
          .getAll(`${process.env.endpoints.SCHOOL}?name=${school}`)
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
    changeTab(operation) {
      if (operation == 'increment' && this.tab < 4) {
        this.tab++;
      } else if (operation == 'decrement' && this.tab > 0) {
        this.tab--;
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // post resolving
        const postBody = { ...this.form };
        if (this.formatedDate) {
          const date = this.formatedDate.split('/');
          postBody.birthday = new Date(
            `${date[2]}-${date[1]}-${date[0]}T03:00`,
          ).toISOString();
        } else {
          delete postBody.birthday;
        }

        postBody.profile = this.resolveProfile({
          profile: postBody.profile,
          api: false,
        });
        postBody.gender = this.resolveGender(postBody.gender);
        postBody.schooling = this.resolveSchooling({
          schooling: postBody.schooling,
          api: false,
        });
        if (!postBody.employed) {
          postBody.profession = null;
        }

        // resolving address
        postBody.address = this.resolveAddress({
          api: false,
          country: postBody.country,
          state: postBody.state,
          city: postBody.city,
          district: postBody.district,
        });

        // deleting some not implemented variables
        delete postBody.employed;
        delete postBody.district;
        delete postBody.socialLinks;

        http
          .put(`/api/v1/user`, this.idUser, postBody)
          .then(res => {
            this.loading = false;
            this.$notifier.showMessage({
              type: 'success',
            });
            const signupFields = [
              'name',
              'profile',
              'email',
              'nickname',
              'birthday', // "2020-11-11T20:42:01.435Z"
              'gender',
              'schooling',
              'profession',
              'address',
            ];

            const emptySignupFields = signupFields.filter(
              field => !postBody[field],
            );
            console.log(emptySignupFields);
            if (!emptySignupFields.length && !this.completeProfile) {
              $nuxt._router.replace('/aluno/finalizar-cadastro');
            }
          })
          .catch(() =>
            this.$notifier.showMessage({
              type: 'error',
            }),
          );
      } else {
        // mostrar snackbar de confirmação
        this.showSnackbar('Algo deu Errado!', 'red');
      }
    },
    showSnackbar(text, status) {
      this.snackbar.text = text;
      this.snackbar.status = status;
      this.snackbar.show = true;
    },
    resolveDate(date) {
      return date.split('T')[0];
    },
    resolveGender(gender) {
      const genders = {
        MALE: 'Masculino',
        FEMALE: 'Feminino',
        Masculino: 'MALE',
        Feminino: 'FEMALE',
      };
      return genders[gender];
    },
    resolveProfile({ profile, api }) {
      const profiles = {
        Aluno: 'STUDENT',
        'Ex-Aluno': 'EX_STUDENT',
        Universitário: 'UNIVERSITY',
        Pai: 'FATHER',
        Investidor: 'INVESTOR',
        Outros: 'OTHERS',
      };
      if (api) {
        return Object.keys(profiles).find(key => profiles[key] === profile);
      }
      return profiles[profile];
    },
    resolveSchooling({ schooling, api }) {
      const schoolingTypes = {
        'Ensino Fundamental Incompleto': 'ENSINO_FUNDAMENTAL_INCOMPLETO',
        'Ensino Fundamental Cursando': 'ENSINO_FUNDAMENTAL_CURSANDO',
        'Ensino Fundamental Completo': 'ENSINO_FUNDAMENTAL_COMPLETO',
        'Ensino Médio Incompleto': 'ENSINO_MEDIO_INCOMPLETO',
        'Ensino Médio Cursando': 'ENSINO_MEDIO_CURSANDO',
        'Ensino Médio Completo': 'ENSINO_MEDIO_COMPLETO',
        'Ensino Superior Incompleto': 'FACULDADE_INCOMPLETO',
        'Ensino Superior Cursando': 'FACULDADE_CURSANDO',
        'Ensino Superior Completo': 'FACULDADE_COMPLETO',
      };
      if (api) {
        return Object.keys(schoolingTypes).find(
          key => schoolingTypes[key] === schooling,
        );
      }
      return schoolingTypes[schooling];
    },
    resolveAddress({ address, country, state, city, district, api }) {
      if (api) {
        const splited = address.split(/[,-]/).map(function(item) {
          return item.trim();
        });
        return {
          country: splited[3],
          state: splited[2],
          city: splited[1],
          district: splited[0],
        };
      } else {
        // address model used on backend: "centro, Rio Claro - São Paulo, Brasil"
        return district + ', ' + city + ' - ' + state + ', ' + country;
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

/* main styles */
* {
  font-family: Roboto;
  letter-spacing: 0em;
}
body {
  position: relative;
}
#main-col {
  padding-top: 16px;
  height: 100%;
}

/* header and tabs style */
::v-deep .v-tab {
  min-width: 0 !important;
}
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  text-transform: none;
  border-bottom: 4px solid #d8bff2;
}
::v-deep .v-tab--active {
  color: transparent;
}
::v-deep .v-tab--active .v-icon {
  color: var(--primary);
}
::v-deep .v-tab:not(.v-tab--active) .v-icon {
  color: #d8bff2 !important;
}
::v-deep .mdi-chevron-right,
::v-deep .mdi-chevron-left {
  font-size: 35px;
  outline: none;
}

/* input styles */
.input-label {
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  color: var(--primary);
}
::v-deep .v-text-field {
  border-color: transparent !important;
}
::v-deep .v-input__control {
  flex-direction: initial;
  height: 40px;
}
::v-deep .v-input__slot {
  border-radius: 5px !important;
  min-height: 48px !important;
  margin: 0 0 3px;
}
::v-deep .v-input input,
::v-deep .v-select__selection--comma,
::v-deep ::placeholder {
  color: #767676 !important;
}
::v-deep .mdi-menu-down {
  font-size: 40px;
  padding-bottom: 8px;
}
::v-deep .v-input--radio-group--row {
  padding-top: 0;
  margin-top: 0;
  align-items: flex-start;
}
::v-deep .v-radio {
  padding: 0 70px 0 10px;
}
::v-deep .v-list {
  background-color: #f5f5f5;
}
::v-deep .v-text-field__details {
  padding: 0 !important;
}

/* buttons style */
.base {
  padding: 5px 24px;
}
.btn-connect {
  width: 111px !important;
  height: 23px !important;

  border-radius: 3px !important;
}
::v-deep .btn-connect .v-btn__content {
  font-size: 9px;
}

/* others */
.connect-info {
  font-family: Lato;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
}
.connect-date {
  font-family: Lato;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0em;
}
</style>
