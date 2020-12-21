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
                v-model="state"
                placeholder="Selecione o seu estado!"
                :items="states"
                label="Estado"
                @change="getCities($event)"
              ></v-autocomplete>
              <v-autocomplete
                v-if="dialogFilters.city"
                v-model="city"
                placeholder="Selecione a sua cidade!"
                :items="cities"
                label="Cidade"
              ></v-autocomplete>
              <v-autocomplete
                v-if="dialogFilters.school"
                v-model="school"
                placeholder="Digite o nome da sua escola!"
                :loading="isLoadingSchool"
                :items="schools"
                label="Escola"
                @keyup="searchTimeOut($event.target.value)"
              ></v-autocomplete>
              <v-card>
                <v-btn
                  class=" btn-block btn-search"
                  depressed
                  large
                  @click="
                    getRanking(true);
                    getSelfRanking();
                    filter = false;
                  "
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
          getRanking(true);
          getSelfRanking();
        "
      >
        Mensal
      </v-tab>
      <v-tab
        @click="
          timeRange = 'YEAR';
          getRanking(true);
          getSelfRanking();
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
                <img v-if="user.photo" class="user__image" :src="user.photo" />
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
              v-for="(pod, index) in podium"
              :id="'pod' + index"
              :key="index"
              class="flex pod"
            >
              <img
                class="medal-icon"
                :src="require(`~/assets/medal` + index + `.png`)"
                alt="medalha"
              />
              <v-avatar size="60">
                <img v-if="pod.photo" class="user__image" :src="pod.photo" />
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
                <tbody
                  v-infinite-scroll="getRanking"
                  infinite-scroll-disabled="busy"
                >
                  <tr
                    v-for="(item, index) in generalRanking"
                    :key="index"
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
    <navigation-bar />
  </div>
</template>

<router>
{
    path: "/aluno/ranking"
}
</router>

<script>
import infiniteScroll from 'vue-infinite-scroll';
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
  directives: { infiniteScroll },
  data() {
    return {
      page: 1,
      limit: 10,
      busy: false,
      country: '',
      school: '',
      city: '',
      cityId: '',
      state: '',
      timeRange: '',
      loading: false,
      pageLoading: true,
      stop: false,
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
      selfRank: {},
    };
  },
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    user() {
      return this.$store.state.user.data;
    },
    podium() {
      if (this.ranking.slice(0, 3).length == 3) {
        return this.ranking.slice(0, 3);
      } else {
        const mockPodium = this.ranking.slice(0, 3);

        while (mockPodium.length < 3) {
          mockPodium.push({
            photo: '',
            points: '0',
            rank: '0',
            userId: '',
            userName: '---',
          });
        }
        return mockPodium;
      }
    },
    generalRanking() {
      if (this.ranking.length > 3) {
        return this.ranking.slice(3);
      } else {
        return [
          {
            photo: '',
            points: '0',
            rank: '0',
            userId: '',
            userName: '---',
          },
        ];
      }
    },
  },
  mounted() {
    this.getStates();
    this.getSelfRanking();
  },
  methods: {
    getSelfRanking() {
      httpHelper
        .getAll(
          `${process.env.endpoints.RANKING}/user/${this.idUser}?` +
            (this.city ? '&city=' + this.city : '') +
            (this.state ? '&state=' + this.state : '') +
            (this.school ? '&institutionName=' + this.school : '') +
            (this.timeRange ? '&timeRange=' + this.timeRange : ''),
        )
        .then(res => {
          this.selfRank = res.data;
        });
    },
    getRanking(clearNGet) {
      if (clearNGet) {
        this.page = 1;
        this.ranking = [];
      } else if (this.busy) {
        return;
      }
      this.busy = true;
      this.loading = true;

      httpHelper
        .getAll(
          `${process.env.endpoints.RANKING +
            `?limit=${this.limit}` +
            `&page=${this.page}` +
            `&order=DESC` +
            // concat every active filter for the request
            (this.city ? '&city=' + this.city : '') +
            (this.state ? '&state=' + this.state : '') +
            (this.school ? '&institutionName=' + this.school : '') +
            (this.timeRange ? '&timeRange=' + this.timeRange : '')}`,
        )
        .then(ranking => {
          if (!ranking.data.content.length) {
            this.loading = false;
            return;
          }

          this.ranking = this.ranking.concat(ranking.data.content);
          this.page++;
          this.loading = false;
          this.busy = false;
        });
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
      // clear filters
      this.city = '';
      this.state = '';
      this.school = '';

      // disable every dialog filters
      this.dialogFilters.state = false;
      this.dialogFilters.city = false;
      this.dialogFilters.school = false;
    },
    openFilterDialog(filterName) {
      this.clearFilters();

      // enable the desired dialog filter
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
      if (this.isLoadingSchool) return;
      this.isLoadingSchool = true;
      this.loadClientCredentials().then(res => {
        const token = res.data.accessToken;
        const response = httpHelper
          .getAll(`${process.env.endpoints.SCHOOL}?name=${school}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
            if (!res.data.length) {
              this.isLoadingSchool = false;
              this.schools.unshift(school.toUpperCase());
            }
            res.data.forEach(school => this.schools.push(school.nome));
            this.isLoadingSchool = false;
          })
          .catch(err => {
            console.log(err);
            this.isLoadingSchool = false;
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
  border-bottom: 4px solid #f7f7f7;
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
  display: -webkit-box;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden;
  text-overflow: ellipsis;
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
.user__image,
.img-rounded {
  object-fit: cover;
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
