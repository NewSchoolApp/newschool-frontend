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
                >Filtrr por Escola</v-list-item
              >
              <v-list-item @click="change('country')"
                >Fitlrar por pais
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
      </div>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Jogadores</th>
            <th class="text-left">Nv</th>
            <th class="text-left">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ranking" :key="item.name">
            <td>{{ item.position }}</td>
            <td>{{ item.name }}</td>
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
          nivel: 122,
          pontos: 305,
        },
        {
          position: '5°',
          name: 'Neymar',
          nivel: 122,
          pontos: 356,
        },
        {
          position: '6°',
          name: 'Neymar',
          nivel: 122,
          pontos: 375,
        },
        {
          position: '7°',
          name: 'Neymar',
          nivel: 122,
          pontos: 392,
        },
        {
          position: '8°',
          name: 'Neymar',
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
.page h1,
.page p {
  color: #6600cc;
  text-transform: uppercase;
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
  bottom: 190px;
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
  max-width: 70%;
  margin: 0 auto;
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
</style>
