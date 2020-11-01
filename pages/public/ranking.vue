<template>
  <div>
    <HeaderBar :title="'Ranking'" :back-page="true"></HeaderBar>

    <template>
      <v-row class="row-container">
        <img
          color="primary"
          class="collapse-button"
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
              >Filtrar por país
            </v-list-item>
          </v-card>
        </v-dialog>
        <v-dialog v-model="filter" max-width="290" class="dialog-modal">
          <v-card>
            <v-col cols="12">
              <v-form ref="form" lazy-validation>
                <v-select
                  v-if="country"
                  placeholder="Selecione o seu país!"
                  :items="countries"
                  label="País"
                ></v-select>
                <v-select
                  v-if="!country && state"
                  placeholder="Selecione o seu estado!"
                  :items="states"
                  label="Estado"
                ></v-select>
                <v-select
                  v-if="!country && city"
                  placeholder="Selecione a sua cidade!"
                  :items="cities"
                  label="Cidade"
                ></v-select>
                <v-select
                  v-if="!country && school"
                  placeholder="Selecione a sua escola!"
                  :items="schools"
                  label="Escola"
                ></v-select>
                <v-card>
                  <v-btn
                    class=" btn-block btn-search"
                    depressed
                    large
                    @click="search"
                    >Buscar</v-btn
                  >
                </v-card>
              </v-form>
            </v-col>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <v-tabs fixed-tabs height="35px">
      <v-tab @click="monthRanking">
        Mensal
      </v-tab>
      <v-tab @click="yearRanking">
        Anual
      </v-tab>
    </v-tabs>

    <v-col class="background">
      <!-- self rank -->
      <v-col>
        <v-row align="center" style="text-align: center" class="frame">
          <v-col><h3>20º</h3></v-col>
          <v-col
            ><v-avatar size="80">
              <img :src="require(`~/assets/person.svg`)" /> </v-avatar
          ></v-col>
          <v-col><h3>100 XP</h3></v-col>
        </v-row>
      </v-col>

      <v-col>
        <!-- pondium -->
        <v-row class="podio">
          <v-col class="flex top__one">
            <img class="icon" src="../../assets/silver-medal.svg" alt="" />
            <img class="icon" src="../../assets/person.svg" alt="" />
            <p>{{ top2.points }} PTS</p>
            <h1>{{ top2.name }}</h1>
          </v-col>
          <v-col class="flex top__two">
            <img class="icon" src="../../assets/troph.png" alt="" />
            <img
              class="icon middle__image"
              src="../../assets/person.svg"
              alt=""
            />
            <p>{{ top1.points }} PTS</p>
            <h1>{{ top1.name }}</h1>
          </v-col>
          <v-col class="flex top__three">
            <img class="icon" src="../../assets/bronze.svg" alt="" />
            <img class="icon" src="../../assets/person.svg" alt="" />
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
                  <th>XP</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in ranking"
                  :key="item.name"
                  class="line"
                >
                  <td>{{ index + 4 }}</td>
                  <td>
                    <div class="img-text">
                      <img src="../../assets/person.svg" class="img-middle" />
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

    <navigation-bar />
  </div>
</template>

<router>
{
    path: "/ranking"
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
      country: '',
      school: '',
      city: '',
      state: '',
      filter: false,
      countries: ['São Paulo', 'Rio de Janeiro'],
      cities: ['São Paulo', 'Rio de Janeiro'],
      states: ['São Paulo', 'Rio de Janeiro'],
      schools: ['Geraldino', 'Colesan'],
      labels: ['Filtrar por Pais', 'Filtrar por Escola', 'Filtrar por Cidade '],
      dialog: false,
      top1: {
        points: '',
        name: '',
      },
      top2: {
        points: '',
        name: '',
      },
      top3: {
        points: '',
        name: '',
      },
      ranking: [],
      monthRankingUsers: [],
      yearRankingUsers: [],
    };
  },
  mounted() {
    this.monthRanking();
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
    monthRanking() {
      if (!this.monthRankingUsers.length) {
        http
          .getAll(`${process.env.endpoints.RANKING}`)
          .then(ranking => {
            this.generateTopPlayers(ranking);
            this.monthRankingUsers = ranking.data.slice(3);

            // this.ranking.forEach(person => {
            //   person.user_name = this.splitName(person.userName);
            // });
          })
          .catch(error => console.log(error));
      }
      this.ranking = this.monthRankingUsers;
    },
    yearRanking() {
      if (!this.yearRankingUsers.length) {
        http
          .getAll(`${process.env.endpoints.RANKING}?timeRange=YEAR`)
          .then(ranking => {
            this.generateTopPlayers(ranking);
            this.yearRankingUsers = ranking.data.slice(3);

            // this.ranking.forEach(person => {
            //   person.user_name = this.splitName(person.userName);
            // });
          })
          .catch(error => console.log(error));
      }
      this.ranking = this.yearRankingUsers;
    },
    splitName(name) {
      return name.split(' ')[0];
    },
    generateTopPlayers(ranking) {
      ranking.data = ranking.data.reverse();
      this.top1 = {
        name: this.splitName(ranking.data[0].userName),
        points: ranking.data[0].points,
      };
      this.top2 = {
        name: this.splitName(ranking.data[1].userName),
        points: ranking.data[1].points,
      };
      this.top3 = {
        name: this.splitName(ranking.data[0].userName),
        points: ranking.data[2].points,
      };
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
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
  background-color: #f8f8f8;
}

::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--primary-light);
}

::v-deep .v-tab {
  font-size: 12px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
  text-transform: none;
}

::v-deep .v-avatar {
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 0px 2px #f0e5fa;
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
/**/

.v-data-table {
  max-width: 100%;
  margin: 3% auto 0;
}

.collapse-button {
  position: absolute;
  top: 24px;
  right: 24px;
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
  margin-top: 5px;
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
  align-items: flex-start;
}

.table th {
  font-size: 12px;
  font-weight: 400 !important;
  color: black !important;
}
</style>
