<template>
  <div>
    <div class="main">
      <canvas ref="myChart" width="500" height="500"> </canvas>
      <div class="innerChart">
        <div class="total" v-if="total">{{ total }}</div>
        <div class="total" v-else>{{ totalTitle }}</div>
        <div class="innerTitle">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: ['data', 'title', 'total', 'chartColors', 'labels'],
  data: () => ({
    cutout: 70,
    colors:["#3399ff", "#003399", "#6d9be4", "#c2daff", "#e9f2ff"],
  }),

  computed:{
   totalTitle: function(){
     return this.data.reduce((a, b) => a + b, 0).toLocaleString();
   }
  },

  mounted() {
    if (!this.title) {
      this.cutout = 0;
      this.totalTitle = "";
    };
    if (this.chartColors) {
      this.colors = this.chartColors;
    };
    new Chart(this.$refs.myChart, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
          },
        ],
        labels: this.labels
      },
      options: {
        cutoutPercentage: this.cutout,
        legend: false,
      }
    });
  },
};
</script>
<style scoped>
.main {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.innerChart {
  position: absolute;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.innerTitle{
  flex-wrap: wrap;
  font-weight: 900;
  font-size: 5vw;
  color: #999999;
}

.total{
  font-weight: 900;
  font-size: 5vw;
  color: #000000;
}

@media screen and (orientation: landscape){
  .innerTitle{
    font-size: 2.5vw;
  }

  .total{
    font-size: 2.5vw;
  }

  @media (min-width: 1000px){
    .innerTitle{
      font-size: 1.5vw;
    }

    .total{
      font-size: 1.5vw;
    }
  }
}

@media screen and (orientation: portrait){
  @media (min-width: 700px){
    .innerTitle{
      font-size: 2.5vw;
    }

    .total{
      font-size: 2.5vw;
    }
  }
}
</style>