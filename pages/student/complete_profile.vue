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
        <!-- <v-tab class="mr-1">
          <v-icon>mdi-account-plus-outline</v-icon>
        </v-tab> -->
      </v-tabs>
    </v-row>

    <v-form id="form" ref="form" lazy-validation>
      <v-tabs-items v-model="tab">
        <!-- Minhas Info -->
        <v-tab-item>
          <v-col class="teste">
            <v-col class="px-0 pb-5">
              <div class="input-label">Nome</div>
              <v-text-field
                v-model="form.name"
                filled
                :rules="requiredRules"
              ></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Apelido</div>
              <v-text-field v-model="form.nickname" filled></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Whatsapp</div>
              <v-text-field
                v-model="form.phone"
                v-mask="'(##) #####-####'"
                type="tel"
                filled
              ></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Email</div>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                filled
              ></v-text-field>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Data de Nascimento</div>
              <v-text-field
                filled
                readonly
                :value="formatedDate"
                @click="datePick = true"
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
          <v-col class="teste">
            <v-col class="px-0 pb-5">
              <div class="input-label">Gênero</div>
              <v-select v-model="form.gender" filled :items="genderItems" />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Quem é você fora do app?</div>
              <v-select
                v-model="form.profile"
                filled
                hide-no-data
                :items="profileItems"
              />
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
                no-data-text="Nenhum país"
                filled
              />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Estado</div>
              <v-autocomplete
                v-model="form.state"
                :items="states"
                :filter="customFilterStates"
                no-data-text="Nenhum estado"
                filled
                @change="getCities($event)"
              ></v-autocomplete>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Cidade</div>
              <v-autocomplete
                v-model="form.city"
                :items="cities"
                :filter="customFilterCities"
                no-data-text="Nenhuma cidade"
                filled
              ></v-autocomplete>
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Bairro</div>
              <v-text-field v-model="form.district" filled />
            </v-col>

            <v-col class="px-0 pb-5">
              <div class="input-label">CEP</div>
              <v-text-field
                v-model="form.cep"
                v-mask="'#####-###'"
                type="text"
                filled
              />
            </v-col>
            <!-- <v-col class="px-0 pb-5">
              <div class="input-label">Endereço completo</div>
              <v-text-field v-model="form.address" filled />
            </v-col> -->
            <v-col class="px-0 pb-5">
              <div class="input-label">Complemento</div>
              <v-text-field v-model="form.complement" filled />
            </v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Número</div>
              <v-text-field v-model="form.houseNumber" filled />
            </v-col>
          </v-col>
        </v-tab-item>

        <!-- Estudos e Trampo -->
        <v-tab-item>
          <v-col>
            <v-col class="px-0 pb-5">
              <div class="input-label">Você está trampando?</div>
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
                :loading="isLoading"
                @keyup="searchTimeOut($event.target.value)"
              ></v-autocomplete>
            </v-col>
          </v-col>
        </v-tab-item>

        <!-- Me add Aí -->
        <!-- <v-tab-item>
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
        </v-tab-item> -->
      </v-tabs-items>
    </v-form>

    <!-- footer -->
    <v-row class="base">
      <v-btn
        class="btn-block btn-new-primary btn-shadow"
        :loading="loading"
        @click="submit"
      >
        CONFIRMAR ALTERAÇÕES
      </v-btn>
    </v-row>
  </v-col>
</template>

<router>
{
  path : '/aluno/cadastro-completo/:tab?',
}
</router>

<script>
/* eslint-disable no-unused-expressions */
import { mask } from 'vue-the-mask';
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  directives: { mask },
  data() {
    return {
      loading: false,
      isLoading: false,
      tab: 0,
      datePick: false,
      completeProfile: false,
      genderDialog: false,
      customGender: '',
      otherGender: '',
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
        cep: '',
        complement: '',
        houseNumber: '',
        phone: '',
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
        'Estudo até o 9° ano',
        'Parei de estudar antes do 9° ano',
        'Parei de estudar entre o 1° e o 3° ano',
        'Estou entre o 1º e 2º ano',
        'Tô no terceirão',
        'Completei o terceirão',
        'Tô na facul',
        'Terminei a facul',
        // 'Pós Graduação',
        // 'Mestrado',
      ],
      genderItems: [
        'Masculino',
        'Feminino',
        'Não binário',
        'Prefiro não dizer',
      ],
      profileItems: [
        'Aluno de escola',
        'Pai de aluno',
        'Professor',
        'Estudante de faculdade',
        'Parceiro/Investidor',
        'Parei de estudar',
        'Outros',
      ],
      requiredRules: [v => !!v || 'O campo não pode estar em branco'],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      schools: [],
      countries: ['Brasil'],
      states: [],
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
        if (!emptySignupFields.length) {
          this.completeProfile = true;
        }
        res.data.birthday
          ? (this.form.birthday = this.resolveDate(res.data.birthday))
          : {};
        res.data.gender
          ? (this.form.gender = this.resolveGender(res.data.gender))
          : {};
        res.data.profile
          ? (this.form.profile = this.resolveProfile({
              profile: res.data.profile,
              api: true,
            }))
          : {};
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
        res.data.profession === ''
          ? (this.form.employed = false)
          : (this.form.employed = true);
        this.form.id = res.data.id;
        this.form.institutionName = res.data.institutionName;
        this.schools.push(res.data.institutionName);
        this.form.urlFacebook = res.data.urlFacebook;
        this.form.urlInstagram = res.data.urlInstagram;
        this.form.phone = res.data.phone;
        this.form.cep = res.data.cep;
        this.form.houseNumber = res.data.houseNumber;
        this.form.complement = res.data.complement;

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
          res.data.forEach((element, index) => {
            this.states.push({
              text: element.nome,
              abbr: element.sigla,
              id: index,
            });
          });
          this.states.sort((a, b) => {
            return a.text.localeCompare(b.text);
          });
        });
    },
    getCities(stateName) {
      const stateAbbr = this.states.find(state => state.text === stateName)
        .abbr;
      http
        .getAll(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbr}/municipios`,
        )
        .then(res => {
          this.cities = [];
          res.data.forEach(element => {
            this.cities.push(element.nome);
          });
          this.cities.sort((a, b) => {
            return a.localeCompare(b);
          });
        });
    },
    customFilterStates(item, queryText, itemText) {
      const textOne = item.text.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const textTree = item.text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .trim();

      const searchText = queryText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .trim();

      return (
        textOne.includes(searchText) ||
        textTwo.includes(searchText) ||
        textTree.includes(searchText)
      );
    },
    customFilterCities(item, queryText, itemText) {
      const textOne = item
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .trim();

      const searchText = queryText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .trim();

      return textOne.includes(searchText);
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
        return (this.loading = false);
      }
      this.schools = [];
      if (this.isLoading) return;
      this.isLoading = true;
      this.loadClientCredentials().then(res => {
        http
          .getAll(`${process.env.endpoints.SCHOOL}?name=${school}`)
          .then(res => {
            for (const response of res.data) {
              this.schools.push(response.school.toUpperCase());
            }
            if (!res.data.length) {
              this.isLoading = false;
              this.schools.push(school.toUpperCase());
            }
            this.schools.sort((a, b) => {
              return a.localeCompare(b);
            });
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
          postBody.profession = '';
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
              message: 'As mudanças foram salvas com sucesso',
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
            if (!emptySignupFields.length && !this.completeProfile) {
              $nuxt._router.replace('/aluno/finalizar-cadastro');
            }
            if (this.form.schooling === 'Tô no terceirão') {
              $nuxt._router.push('/aluno/semear');
            }
          })
          .catch(() => {
            this.$notifier.showMessage({
              type: 'error',
              message:
                'Alguma coisa nao saiu bem. Dá mais um confere nas infos.',
            }),
              (this.loading = false);
          });
      } else {
        this.$notifier.showMessage({
          type: 'error',
          message: 'Alguma coisa nao saiu bem. Dá mais um confere nas infos.',
        });
      }
    },
    resolveDate(date) {
      return date.split('T')[0];
    },
    resolveGender(gender) {
      const genders = {
        MALE: 'Masculino',
        FEMALE: 'Feminino',
        'Prefiro não dizer': 'NOT DEFINED',
        'NOT DEFINED': 'Prefiro não dizer',
        'Não binário': 'NOT BINARY',
        'NOT BINARY': 'Não binário',
        Masculino: 'MALE',
        Feminino: 'FEMALE',
      };
      return genders[gender];
    },
    resolveProfile({ profile, api }) {
      const profiles = {
        'Aluno de escola': 'STUDENT',
        'Parei de estudar': 'EX_STUDENT',
        'Estudante de faculdade': 'UNIVERSITY',
        'Pai de aluno': 'FATHER',
        'Parceiro/Investidor': 'INVESTOR',
        Outros: 'OTHERS',
        Professor: 'OTHERS',
      };
      if (api) {
        return Object.keys(profiles).find(key => profiles[key] === profile);
      }
      return profiles[profile];
    },
    selectProfile(profile) {
      if (!this.profileItems.includes(profile)) {
        this.profileItems = [];
        this.profileItems.push(profile);
      }
    },
    resolveSchooling({ schooling, api }) {
      const schoolingTypes = {
        'Estudo até o 9° ano': 'ENSINO_FUNDAMENTAL_CURSANDO',
        'Parei de estudar antes do 9° ano': 'ENSINO_FUNDAMENTAL_INCOMPLETO',
        'Parei de estudar entre o 1° e o 3° ano': 'ENSINO_MEDIO_INCOMPLETO',
        'Estou entre o 1º e 2º ano': 'ENSINO_MEDIO_CURSANDO',
        'Tô no terceirão': 'TERCEIRO_ANO',
        'Completei o terceirão': 'ENSINO_MEDIO_COMPLETO',
        'Tô na facul': 'FACULDADE_CURSANDO',
        'Terminei a facul': 'FACULDADE_COMPLETO',
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
  position: relative;
  margin: 10px 0 80px;
  flex-grow: 1;
}
#form {
  padding-bottom: 152px;
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
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
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
::v-deep .v-list-item__title {
  font-size: 13px;
}
</style>
