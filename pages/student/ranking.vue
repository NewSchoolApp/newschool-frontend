<template>
  <div id="page">
    <HeaderBar :title="'Ranking'" :back-page="true"></HeaderBar>
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
          <v-list-item class="item-list" @click="change('city')"
            >Filtrar por cidade</v-list-item
          >
          <v-list-item class="item-list" @click="change('school')"
            >Filtrar por escola</v-list-item
          >
          <v-list-item class="item-list" @click="change('country')"
            >Filtrar por estado
          </v-list-item>
        </v-card>
      </v-dialog>
      <v-dialog v-model="filter" max-width="290" class="dialog-modal">
        <v-card>
          <v-col cols="12">
            <v-form ref="form" lazy-validation>
              <v-autocomplete
                v-if="(!country && state) || country"
                placeholder="Selecione o seu estado!"
                :items="states"
                label="Estado"
                @input="loadCountries($event)"
              ></v-autocomplete>
              <v-autocomplete
                v-if="!country && city"
                placeholder="Selecione a sua cidade!"
                :items="cities"
                @input="loadSchools($event)"
                label="Cidade"
              ></v-autocomplete>
              <v-autocomplete
                v-if="!country && school"
                placeholder="Selecione a sua escola!"
                :items="schools"
                @input="school = $event"
                label="Escola"
              ></v-autocomplete>
              <v-card>
                <v-btn
                  @click="searchByMonthFiltered"
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
      <v-tab @click="monthRanking({ isInitial: true })">
        Mensal
      </v-tab>
      <v-tab @click="yearRanking({ isInitial: true })">
        Anual
      </v-tab>
    </v-tabs>
    <v-col id="main-col">
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
              <h3 class="self-rank-data">{{ userPosition || 0 }}º</h3>
            </v-col>
            <v-col>
              <v-avatar class="self-rank-avatar" size="70">
                <img v-if="user.photo" :src="require(`${user.photo}`)" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
            </v-col>
            <v-col>
              <h3 class="self-rank-data">{{ userPoints || 0 }} NC</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <!-- pondium -->
          <v-row class="podio">
            <v-col class="flex top__one">
              <img class="icon" src="../../assets/silver-medal.svg" alt="" />
              <v-avatar size="60">
                <img v-if="user.photo" :src="require(top2.photo)" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
              <p>{{ top2.points }} PTS</p>
              <h1>{{ top2.name }}</h1>
            </v-col>
            <v-col class="flex top__two">
              <img class="icon" src="../../assets/troph.png" alt="" />
              <v-avatar size="70">
                <img v-if="user.photo" :src="require(top1.photo)" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
              <p>{{ top1.points }} PTS</p>
              <h1>{{ top1.name }}</h1>
            </v-col>
            <v-col class="flex top__three">
              <img class="icon" src="../../assets/bronze.svg" alt="" />
              <v-avatar size="60">
                <img v-if="user.photo" :src="require(top3.photo)" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
              <p>{{ top3.points }} PTS</p>
              <h1>{{ top3.name }}</h1>
            </v-col>
          </v-row>
          <!-- rank lins -->
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
                    v-for="(item, index) in ranking"
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
                        <p class="name_person">{{ item.user_name }}</p>
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
import http from '~/services/http/generic';

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
      labels: [
        'Filtrar por Estado',
        'Filtrar por Escola',
        'Filtrar por Cidade ',
      ],
      dialog: false,
      userPosition: 0,
      userPoints: 0,
      top1: {
        points: '',
        name: '',
        photo: '',
      },
      top2: {
        points: '',
        name: '',
        photo: '',
      },
      top3: {
        points: '',
        name: '',
        photo: '',
      },
      ranking: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },

  mounted() {
    this.monthRanking({ isInitial: true });
    this.getAddressElements();
  },
  methods: {
    change(data) {
      switch (data) {
        case 'city':
          this.city = data;
          this.state = data;
          this.school = false;
          this.country = false;
          this.filter = true;
          break;
        case 'school':
          this.city = data;
          this.state = data;
          this.school = data;
          this.country = false;
          this.filter = true;
          break;
        case 'country':
          this.country = data;
          this.city = false;
          this.state = false;
          this.filter = true;
          break;
      }
      this.dialog = false;
    },
    loadCountries(state) {
      this.state = state;
      this.cities = [];
      const cityObject = this.statesCode.find(
        item => item.nome.toUpperCase() === state,
      );
      http
        .getAll(`${process.env.endpoints.CITY}/${cityObject.sigla}`)
        .then(response => {
          response.data.forEach(item => {
            this.cityId = item.id;
            this.cities.push(item.name);
          });
          this.cities.sort();
        });
    },
    getAddressElements() {
      http.getAll(`${process.env.endpoints.STATE}`).then(response => {
        response.data.forEach(state => {
          this.states.push(state.nome.toUpperCase());
          this.states.sort();
          this.statesCode.push(state);
        });
      });
    },
    monthRanking({ isInitial }) {
      if (isInitial && this.usersByMonth.length) {
        this.ranking = this.usersByMonth;
        this.userPosition = this.userPositionByMonth;
        this.userPoints = this.userPointsByMonth;
        return;
      }
      if (this.city || this.school || this.state) {
        return this.searchByMonthFiltered();
      }
      // const pages = [1, 2, 3];
      // for (const page of pages) {
      http
        .getAll(`${process.env.endpoints.RANKING}`)
        .then(ranking => {
          if (!ranking.length) {
            this.ranking = [];
            this.top1 = {};
            this.top2 = {};
            this.top3 = {};
            this.userPosition = 0;
          }

          this.generateTopPlayers(ranking);
          this.usersByMonth = ranking.data.content.slice(3);
          this.ranking = this.usersByMonth;

          this.ranking.forEach(person => {
            person.user_name = this.splitName(person.userName);
          });
        })
        .catch(error => console.log(error));
      this.getUserPositionByMonth(this.user.id);
      // }
    },
    yearRanking({ isInitial }) {
      if (isInitial && this.usersByYear.length) {
        this.ranking = this.usersByYear;
        this.userPosition = this.userPositionByYear;
        this.userPoints = this.userPointsByYear;
        return;
      }
      if (this.city || this.school || this.state) {
        return this.searchByYearFiltered();
      }
      // const pages = [1, 2, 3];
      // for (const page of pages) {
      http
        .getAll(`${process.env.endpoints.RANKING}?timeRange=YEAR`)
        .then(ranking => {
          if (!ranking.length) {
            this.ranking = [];
            this.top1 = {};
            this.top2 = {};
            this.top3 = {};
            this.userPosition = 0;
          }

          this.generateTopPlayers(ranking);
          this.usersByYear = ranking.data.content.slice(3);
          this.ranking = this.usersByYear;

          this.ranking.forEach(person => {
            person.user_name = this.splitName(person.userName);
          });
        })
        .catch(error => console.log(error));
      this.getUserPositionByYear(this.user.id);
      // }
    },
    splitName(name) {
      if (name.split(' ').length > 1) {
        return name.split(' ')[0];
      }
      return name;
    },
    getUserPositionByMonth(userId) {
      http
        .getAll(
          `${process.env.endpoints.RANKING}/user/${userId}?timeRange=MONTH`,
        )
        .then(userRanking => {
          const { rank, points } = userRanking.data;
          this.userPositionByMonth = rank;
          this.userPosition = this.userPositionByMonth;
          this.userPointsByMonth = points;
          this.userPoints = this.userPointsByMonth;
        });
    },
    getUserPositionByYear(userId) {
      http
        .getAll(
          `${process.env.endpoints.RANKING}/user/${userId}?timeRange=YEAR`,
        )
        .then(userRanking => {
          const { rank, points } = userRanking.data;
          this.userPositionByYear = rank;
          this.userPosition = this.userPositionByYear;
          this.userPointsByYear = points;
          this.userPoints = this.userPointsByYear;
        });
    },
    generateTopPlayers(ranking) {
      ranking.data.content = ranking.data.content.reverse();
      this.top1 = {
        name: this.splitName(ranking.data.content[0].userName),
        points: ranking.data.content[0].points,
        photo: ranking.data.content[0].photo,
      };
      this.top2 = {
        name: this.splitName(ranking.data.content[1].userName),
        points: ranking.data.content[1].points,
        photo: ranking.data.content[1].photo,
      };
      this.top3 = {
        name: this.splitName(ranking.data.content[2].userName),
        points: ranking.data.content[2].points,
        photo: ranking.data.content[2].photo,
      };
    },
    searchByMonthFiltered() {
      this.filter = false;
      const city = this.city ? `&city=${this.city}` : '';
      const state = this.state ? `&state=${this.state}` : '';
      const school = this.school ? `&institutionName=${this.school}` : '';
      http
        .getAll(
          `${process.env.endpoints.RANKING}?timeRange=MONTH${city}${state}${school}`,
        )
        .then(ranking => {
          if (!ranking.length) {
            this.ranking = [];
            this.top1 = {};
            this.top2 = {};
            this.top3 = {};
            this.userPosition = 0;
          }

          this.generateTopPlayers(ranking);
          this.ranking = ranking.data.content.slice(3);

          this.ranking.forEach(person => {
            person.user_name = this.splitName(person.userName);
          });
        })
        .catch(error => console.log(error));
      this.getUserPositionByMonth(this.user.id);
    },
    searchByYearFiltered() {
      this.dialog = false;
      const city = this.city ? `&city=${this.city}` : '';
      const state = this.state ? `&state=${this.state}` : '';
      const school = this.school ? `&institutionName=${this.school}` : '';

      http
        .getAll(
          `process.env.endpoints.RANKING}?timeRange=YEAR${city}${state}${school}`,
        )
        .then(ranking => {
          if (!ranking.length) {
            this.ranking = [];
            this.top1 = {};
            this.top2 = {};
            this.top3 = {};
            this.userPosition = 0;
          }

          this.generateTopPlayers(ranking);
          this.ranking = ranking.data.content.slice(3);

          this.ranking.forEach(person => {
            person.user_name = this.splitName(person.userName);
          });
        })
        .catch(error => console.log(error));
      this.getUserPositionByYear(this.user.id);
    },
    loadSchools(city) {
      this.city = city;
      http
        .getAll(`${process.env.endpoints.SCHOOL}?cityId=${this.cityId}`)
        .then(response => {
          response.data.forEach(school => {
            this.schools.push(school.nome);
            this.schools.sort();
          });
        });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
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
.rank-list {
  width: 100%;
}
.line {
  outline: 2px solid #f8f8f8;
}
::v-deep .row {
  background-color: white;
}
::v-deep .col {
  padding: 12px 16px !important;
}
.background {
  height: 100%;
  background-color: #f8f8f8;
  padding: 0 !important;
}

.img-rounded {
  width: 32px;
  height: 32px;
  border-radius: 50px;
}

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
.self-rank {
  height: 119px;
}
::v-deep .v-avatar:not(.self-rank-avatar) {
  margin-bottom: 5px;
}
.self-rank-avatar {
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 0px 2px #f0e5fa;
}
.self-rank-data {
  font-size: 20px;
  font-weight: 900;
}
.filter-modal {
  position: absolute;
  right: 21px;
  top: 45px;
  width: 151px;
  height: 135px;
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
::v-deep .theme--light.v-data-table thead tr:last-child th {
  border-bottom: none;
  text-align: center;
  font-weight: 500;
}
.podio {
  /* width: 80%;
  margin: 5% 10%;
  align-items: flex-end; */
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
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
.flex img:not(:first-child) {
  border-radius: 50px;
  width: 55px;
  height: 55px;
}
.top__one img:not(:fist-child),
.top__three img:not(:fist-child) {
  width: 55px;
  height: 55px;
  margin-top: 10px;
}
.middle__image {
  height: 66px !important;
}
.icon {
  margin-bottom: 12px;
}
.img-middle {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin-right: 15px;
}
.v-data-table {
  max-width: 100%;
  margin: 3% auto 0;
}
#filters {
  position: relative;
  width: 100%;
}
.collapse-button {
  position: absolute;
  top: -40px;
  right: 20px;
}
::v-deep .h1__theme {
  position: relative;
  font-size: 20px;
  font-weight: 700;
}
.btn-search {
  background: var(--primary) !important;
  border-radius: 0 !important;
  color: #fff;
  font-weight: 600;
  width: 100%;
}
.name_person {
  font-size: 14px;
  font-weight: 700;
  margin: 5px 0 0 10px;
  color: rgb(63, 61, 86);
}
td {
  text-align: center;
  font-size: 12px;
  font-weight: 400;
}
:v-deep .table-hover tbody tr:hover td {
  background: aqua;
}
.text-left {
  text-align: left;
}
.img-text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.img-text > p {
  margin-bottom: 0;
}
.table th {
  font-size: 12px;
  font-weight: 400 !important;
  color: black !important;
}
</style>
