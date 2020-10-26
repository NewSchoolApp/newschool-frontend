<template>
  <div class="page">
    <HeaderBar :title="'RANKING'" :back-page="true"></HeaderBar>
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
            <v-col cols="12">
              <v-list-item @click="change('city')"
                >Filtrar por cidade</v-list-item
              >
              <v-list-item @click="change('school')"
                >Filtrar por escola</v-list-item
              >
              <v-list-item @click="change('country')"
                >Filtrar por país
              </v-list-item>
            </v-col>
          </v-card>
        </v-dialog>
        <v-dialog v-model="filter" max-width="290">
          <v-card>
            <v-col cols="12">
              <v-form ref="form" lazy-validation>
                <v-select
                  v-if="this.country"
                  placeholder="Selecione o seu país!"
                  :items="countries"
                  label="País"
                ></v-select>
                <v-select
                  v-if="!this.country && this.state"
                  placeholder="Selecione o seu estado!"
                  :items="states"
                  label="Estado"
                ></v-select>
                <v-select
                  v-if="!this.country && this.city"
                  placeholder="Selecione a sua cidade!"
                  :items="cities"
                  label="Cidade"
                ></v-select>
                <v-select
                  v-if="!this.country && this.school"
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

    <div class="podio">
      <div class="sub-podio">
        <img class="trophy" src="../../assets/trophy 1.svg" />
        <img class="podio1" src="../../assets/Ellipse 7.svg" />
        <img class="silver" src="../../assets/silver-medal 1.svg" />
        <img class="podio2" src="../../assets/Ellipse 8.svg" />
        <img class="bronze" src="../../assets/bronze-medal 1.svg" />
        <img class="podio3" src="../../assets/Ellipse 9.svg" />
        <div class="top__3">
          <div class="top">
            <p class="top1">320 PTS</p>
            <h1 class="name1">Fernanda</h1>
          </div>
          <div class="top">
            <p class="top2">320 PTS</p>
            <h1 class="name2">Juliana</h1>
          </div>
          <div class="top">
            <p class="top3">320 PTS</p>
            <h1 class="name3">Maria</h1>
          </div>
        </div>
      </div>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>#</th>
            <th style="text-align: left;">Jogadores</th>
            <th>NV</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ranking" :key="item.name">
            <td>{{ item.position }}</td>
            <td >
              <p class="name_person">{{ item.name }}</p>
              <th class="school">
                {{item.school}}
              </th>
                            <th>
                <img class="img__ranking" src="../../assets/Ellipse 7.svg" >
              </th>
            </td>
            <td>{{ item.nivel }}</td>
            <td>{{ item.pontos }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      ranking: [
        {
          position: '4°',
          name: 'Neymar',
          school: 'Geraldino',
          nivel: 122,
          pontos: 305,
        },
        {
          position: '5°',
          name: 'Neymar',
          school: 'Geraldino',
          nivel: 122,
          pontos: 356,
        },
        {
          position: '6°',
          name: 'Neymar',
          school: 'Geraldino',
          nivel: 122,
          pontos: 375,
        },
        {
          position: '7°',
          name: 'Neymar',
          school: 'Geraldino',
          nivel: 122,
          pontos: 392,
        },
        {
          position: '8°',
          name: 'Neymar',
          school: 'Geraldino',
          nivel: 122,
          pontos: 408,
        },
      ],
    };
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
  },
};
</script>

<style scoped>
::v-deep .theme--light.v-data-table thead tr:last-child th {
  border-bottom: none;
  text-align: center;
  font-weight: 500;
}
.name1,
.name2,
.name3 {
  font-size: 14px;
  position: relative;
}
.name1,
.name2,
.name3 {
  bottom: 21px;
}
td {
  text-align: center;
  height: 70px;
  border-top: 1px solid rgba(102, 0, 204, 0.35)
}
.name_person {
  position: absolute;
  margin-left: 36px;
  margin-top: 10px;
  font-weight: 800;
}

.top__3 {
  display: flex;
  position: relative;
  bottom: 189px;
  width: 100%;
  text-align: center;
}
.top1,
.name1 {
  display: block;
  position: relative;
  left: 41px;
}
.top2,
.name2 {
  display: block;
  position: relative;
  left: 87px;
}
.top3,
.name3 {
  display: block;
  position: relative;
  left: 137px;
}
.top__3 p {
  font-size: 12px;
}
.title {
  display: block;
  position: relative;
  font-size: 20px;
  left: 60px;
  bottom: 36px;
}
.podio {
  width: 100%;
  box-sizing: border-box;
  height: 175px;
}

.sub-podio {
  max-width: 360px;
  margin: 0 auto;
}
.podio1 {
  display: block;
  position: relative;
  top: 11px;
  left: 140px;
}
.podio2 {
  display: block;
  position: relative;
  bottom: 90px;
  left: 40px;
}
.trophy {
  display: inline-block;
  position: relative;
  left: 165px;
  margin-bottom: 10px;
}
.podio3 {
  display: block;
  position: relative;
  bottom: 189px;
  left: 250px;
  margin-bottom: 0px;
}
.silver {
  display: block;
  position: relative;
  bottom: 100px;
  left: 55px;
}
.bronze {
  display: block;
  position: relative;
  bottom: 200px;
  left: 270px;
}
.row-container {
  width: 100%;
}
.v-data-table {
  max-width: 100%;
  margin: 3% auto 0;
}

::v-deep .v-data-table th {
  padding-top: 12px;
}

.collapse-button {
  position: absolute;
  top: 24px;
  right: 24px;
}
.filter-modal {
  position: absolute;
  right: 21px;
  top: 45px;
  width: 57%;
}

::v-deep .h1__theme {
  position: relative;
  right: 60px;
}

.img__ranking {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 83px;
  margin-top: -16px;
}
.school {
  position: absolute;
  margin: 14px 0px 0 20px;
  font-weight: normal;
}
.btn-search {
  background: #6600cc !important;
  border-radius: 0 !important;
  color: #fff;
  font-weight:600;
  width: 100%;
  }
</style>