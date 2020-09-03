<template>
  <v-layout justify-center>
    <v-flex xs10 sm8 md6 ref="flex">
      <v-container>
        <v-col cols="12" class="initial-text">
          <v-row>
            <p>Salve salve, estamos terminando de criar a New School.</p>
          </v-row>
        </v-col>
        <v-col cols="12" class="initial-text">
          <v-row>
            <p>Então relaxa que logo logo vem novidade ai, Tamo Together wow!</p>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <img class="img" src="../../assets/construction.svg" alt />
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <h1 class="data-text">
              <span>{{ days }}</span>:
              <span>{{ hours }}</span>:
              <span>{{ minutes }}</span>
            </h1>
          </v-row>

          <v-row>
            <p class="atribute-data">
              <span>Dias</span>
              <span>Horas</span>
              <span>Minutos</span>
            </p>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <h1 class="end-text">Quer ajudar a gente?</h1>
          </v-row>
        </v-col>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<router>
{
    path: '/construindo'
}

</router>
<script>
export default {
  data() {
    return {
      days: '',
      hours: '',
      minutes: '',
    };
  },
  mounted() {
    this.syncDate();
  },
  methods: {
    syncDate() {
      let dateEnd = process.env.dateEnd;
      let split = dateEnd.split('/');
      let dateSpliced = split[1] + '/' + split[0] + '/' + split[2];
      let date = new Date(dateSpliced).getTime();

      setInterval(() => {
        let dateToday = new Date().getTime();
        var seconds = (date - dateToday) / 1000;

        this.days = parseInt(seconds / 86400);
        seconds = seconds % 86400;

        this.hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;

        this.minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
      }, 1000);
    },
  },
};
</script>
<router>
  {
    path: '/construindo'
  }
</router>


<style scoped>
/* Global */
* {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
  max-width: 600px;
  margin: 0 auto;
  color: #6600cc;
}
/* Text Header */
.initial-text {
  font-style: normal !important;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  display: flex;
  text-align: center;
  color: #656565;
  width: 100%;
}
/* Img */
.img {
  width: 90%;
  margin: 10% 5%;
}
/* Date Text */
.data-text {
  font-style: normal;
  font-weight: 900;
  font-size: 35px;
  line-height: 59px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: 0.2em;
  color: #6600cc;
  width: 90%;
  margin: 0 6%;
}

.atribute-data {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 80%;
  margin: 0 4% 7%;
}
.atribute-data span {
  margin-left: 13%;
  justify-content: center;
  color: gray;
  font-size: 15px;
}
.end-text {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
  color: #6600cc;
  margin: 0 auto;
}
@media (max-width: 340px){
.img{
  margin: 3% 5%;
}
.atribute-data span {
  margin-left: 20%; 
} 
}
</style>
