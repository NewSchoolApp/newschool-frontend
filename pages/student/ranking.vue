<template>
  <div id="page">
    <HeaderBar :title="'Ranking'" :back-page="true"></HeaderBar>

    <!-- Filtros -->
    <div id="filters">
      <img
        class="collapse-button"
        color="primary"
        dark
        src="../../assets/more_vert_24px.svg"
        @click.stop="dialog = true"
      />
      <v-dialog v-model="dialog" max-width="290">
        <v-card class="filter-modal">
          <v-list-item class="item-list" @click="openFilterDialog('city')"
            >Filtrar por cidade</v-list-item
          >
          <v-list-item class="item-list" @click="openFilterDialog('school')"
            >Filtrar por escola</v-list-item
          >
          <v-list-item class="item-list" @click="openFilterDialog('state')"
            >Filtrar por estado
          </v-list-item>
        </v-card>
      </v-dialog>
      <v-dialog v-model="filter" max-width="290" class="dialog-modal">
        <v-card>
          <v-col cols="12">
            <v-form ref="form" lazy-validation>
              <v-autocomplete
                v-if="dialogFilters.state || dialogFilters.city"
                placeholder="Selecione o seu estado!"
                :items="states"
                label="Estado"
                @change="getCities($event)"
                v-model="state"
              ></v-autocomplete>
              <v-autocomplete
                v-if="dialogFilters.city"
                placeholder="Selecione a sua cidade!"
                :items="cities"
                label="Cidade"
                v-model="city"
              ></v-autocomplete>
              <v-autocomplete
                v-if="dialogFilters.school"
                placeholder="Digite o nome da sua escola!"
                :loading="isLoadingSchool"
                :items="schools"
                @keyup="searchTimeOut($event.target.value)"
                label="Escola"
                v-model="school"
              ></v-autocomplete>
              <v-card>
                <v-btn
                  @click="
                    getRanking();
                    filter = false;
                  "
                  class=" btn-block btn-search"
                  depressed
                  large
                  >Buscar</v-btn
                >
              </v-card>
            </v-form>
          </v-col>
        </v-card>
      </v-dialog>
    </div>
    <!-- Tabs mensal anual -->
    <v-tabs fixed-tabs height="35px">
      <v-tab
        @click="
          timeRange = 'MONTH';
          getRanking();
        "
      >
        Mensal
      </v-tab>
      <v-tab
        @click="
          timeRange = 'YEAR';
          getRanking();
        "
      >
        Anual
      </v-tab>
    </v-tabs>
    <v-col id="main-col">
      <div v-if="loading">
        <div class="container-spinner">
          <v-progress-circular
            :size="70"
            :width="5"
            indeterminate
            color="#6600cc"
          />
        </div>
      </div>
      <!-- Rank -->
      <v-col class="background">
        <!-- self rank -->
        <v-col>
          <v-row
            class="frame self-rank"
            align="center"
            style="text-align: center"
          >
            <v-col>
              <h3 class="self-rank-data">{{ selfRank.rank || 0 }}º</h3>
            </v-col>
            <v-col>
              <v-avatar class="self-rank-avatar" size="70">
                <img v-if="selfRank.photo" :src="selfRank.photo" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
            </v-col>
            <v-col>
              <h3 class="self-rank-data">{{ selfRank.points || 0 }} NC</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <!-- pondium -->
          <v-row class="podium">
            <v-col
              :id="'pod' + index"
              v-for="(pod, index) in podium"
              :key="pod"
              class="flex pod"
            >
              <img
                class="medal-icon"
                :src="require(`~/assets/medal` + index + `.png`)"
                alt="medalha"
              />
              <v-avatar size="60">
                <img v-if="pod.photo" :src="pod.photo" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
              <p>{{ pod.points }} PTS</p>
              <h1>{{ pod.userName.split(' ')[0] }}</h1>
            </v-col>
          </v-row>
          <!-- general ranking -->
          <v-row>
            <v-simple-table class="rank-list">
              <template v-slot:default>
                <thead>
                  <tr class="table">
                    <th>#</th>
                    <th class="text-left">Jogadores</th>
                    <th>NC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in generalRanking"
                    :key="item.name"
                    class="line"
                  >
                    <td>{{ index + 4 }}º</td>
                    <td>
                      <div class="img-text">
                        <img
                          v-if="item.photo"
                          class="img-rounded"
                          :src="item.photo"
                        />
                        <img v-else :src="require(`~/assets/person.svg`)" />
                        <p class="name_person">{{ item.userName }}</p>
                      </div>
                    </td>
                    <td>{{ item.points }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-col>
      </v-col>
    </v-col>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<router>
{
    path: "/aluno/ranking"
}
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import utils from '~/utils/index';
import httpHelper from '~/services/http/generic';
import { http } from '~/services/http/config';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },

  data() {
    return {
      page: 1,
      country: '',
      school: '',
      city: '',
      cityId: '',
      state: '',
      timeRange: '',
      loading: false,
      pageLoading: true,
      isLoadingSchool: false,
      filter: false,
      usersByMonth: [],
      usersByYear: [],
      userPositionByMonth: 0,
      userPositionByYear: 0,
      userPointsByMonth: 0,
      userPointsByYear: 0,
      countries: [],
      statesCode: [],
      cities: [],
      states: [],
      schools: [],
      dialog: false,
      ranking: [],
      yearRanking: [],
      monthRanking: [],
      dialogFilters: {
        state: false,
        city: false,
        school: false,
      },
      stateAbbreviations: [],
    };
  },
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    podium() {
      if (this.ranking.slice(0, 3).length == 3) {
        return this.ranking.slice(0, 3);
      } else {
        for (var i = 0; this.ranking.length < 4; i++) {
          this.ranking.push(
            (i = {
              photo: '',
              points: '0',
              rank: '0',
              userId: '',
              userName: '---',
            }),
          );
        }
        return this.ranking.slice(0, 3);
      }
    },
    generalRanking() {
      return this.ranking.slice(3);
    },
    selfRank() {
      const selfRank = this.ranking.find(user => user.userId == this.idUser);
      if (selfRank) {
        return selfRank;
      } else {
        return {
          rank: '',
          photo: '',
          points: '',
        };
      }
    },
  },
  mounted() {
    this.getStates();
    this.getRanking();
  },
  methods: {
    getRanking() {
      // if (this.timeRange === 'MONTH' && this.monthRanking.length) {
      //   return (this.ranking = this.monthRanking);
      // }
      // if (this.timeRange === 'YEAR' && this.yearRanking.length) {
      //   return (this.ranking = this.yearRanking);
      // }
      httpHelper
        .getAll(
          `${process.env.endpoints.RANKING +
            '?' +
            //concat every active filter for the request
            (this.city ? '&city=' + this.city : '') +
            (this.state ? '&state=' + this.state : '') +
            (this.school ? '&institutionName=' + this.school : '') +
            (this.timeRange ? '&timeRange=' + this.timeRange : '')}`,
        )
        .then(ranking => {
          this.ranking = ranking.data.content.reverse(); //<--- The api is returning the list in ascending order;
          // if (this.timeRange === 'MONTH') {
          //   this.monthRanking = this.ranking;
          // }
          // if (this.timeRange === 'YEAR') {
          //   this.yearRanking = this.ranking;
          // }
        });
      this.pageLoading = false;
    },
    getCities(stateName) {
      httpHelper
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
    getStates() {
      httpHelper
        .getAll('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => {
          res.data.forEach(element => {
            this.states.push(element.nome);
            this.stateAbbreviations[element.nome] = element.sigla;
          });
        });
    },
    clearFilters() {
      //clear filters
      this.city = '';
      this.state = '';
      this.school = '';

      //disable every dialog filters
      this.dialogFilters.state = false;
      this.dialogFilters.city = false;
      this.dialogFilters.school = false;
    },
    openFilterDialog(filterName) {
      this.clearFilters();

      //enable the desired dialog filter
      this.dialogFilters[filterName] = true;
      this.filter = true;
      this.dialog = false;
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
        const response = httpHelper
          .getAll(
            `${process.env.baseUrl}${process.env.endpoints.SCHOOL}?name=${school}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
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
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

/* main styles */
* {
  font-family: 'Roboto', sans-serif;
}
#page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-self: center;
}
@media (min-width: 700px) {
  #page {
    max-width: 700px;
  }
}
#main-col {
  background-color: #f8f8f8;
}
::v-deep .row {
  background-color: white;
}
::v-deep .col {
  padding: 12px 16px !important;
}
.flex {
  display: flex;
  justify-content: baseline;
  align-items: center;
  flex-direction: column;
  max-width: 50px;
}
.flex p {
  font-weight: 400;
  font-size: 12px;
  width: 55px;
  text-align: center;
  color: #3f3d56;
}
.flex h1 {
  font-weight: 700;
  font-size: 14px;
  color: #3f3d56;
  margin-top: -18px;
}
.background {
  height: 100%;
  background-color: #f8f8f8;
  padding: 0 !important;
}

/* header */
::v-deep .h1__theme {
  position: relative;
  font-size: 20px;
  font-weight: 700;
}

/* tabs */
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--primary-light);
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
  text-transform: none;
  border-bottom: 4px solid #f5f5f5;
}
::v-deep .v-tabs {
  max-height: 32px;
}

/* self rank */
.self-rank {
  height: 119px;
}
.self-rank-avatar {
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 0px 2px #f0e5fa;
}
.self-rank-data {
  font-size: 20px;
  font-weight: 900;
}

/* podium */
.podium {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}
::v-deep .v-avatar:not(.self-rank-avatar) {
  margin-bottom: 5px;
}
.pod:not(:fist-child) {
  width: 55px;
  height: 55px;
  margin-top: 10px;
}
#pod0 {
  order: 2 !important;
}
#pod1 {
  order: 1 !important;
}
#pod2 {
  order: 3 !important;
}
::v-deep #pod0 > .v-avatar {
  height: 70px !important;
  width: 70px !important;
}
.medal-icon {
  margin-bottom: 12px;
}

/* general ranking list */
.rank-list {
  width: 100%;
}
.table th {
  font-size: 12px;
  font-weight: 400 !important;
  color: black !important;
}
td {
  text-align: center;
  font-size: 12px;
  font-weight: 400;
}
.v-data-table {
  max-width: 100%;
  margin: 3% auto 0;
}
.name_person {
  font-size: 14px;
  font-weight: 700;
  margin: 5px 0 0 10px;
  color: rgb(63, 61, 86);
}
.text-left {
  text-align: left;
}
.img-text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.line {
  outline: 2px solid #f8f8f8;
}
.img-rounded {
  width: 32px;
  height: 32px;
  border-radius: 50px;
}
::v-deep .theme--light.v-data-table thead tr:last-child th {
  border-bottom: none;
  text-align: center;
  font-weight: 500;
}

/* dialogs */
#filters {
  position: relative;
  width: 100%;
}
.filter-modal {
  position: absolute;
  right: 21px;
  top: 45px;
  width: 151px;
  height: 135px;
}
.collapse-button {
  position: absolute;
  top: -40px;
  right: 20px;
}
.btn-search {
  background: var(--primary) !important;
  border-radius: 0 !important;
  color: #fff;
  font-weight: 600;
  width: 100%;
}
.item-list {
  font-size: 12px;
  padding: 0 0 0 15px;
  margin-top: 5px;
  font-weight: 500;
  min-height: 38px;
}
.dialog-modal {
  width: 151px;
  height: 135px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
