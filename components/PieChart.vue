<template>
  <div>
    <div class="main">
      <canvas ref="myChart" width="500" height="500"> </canvas>
      <div class="innerChart">
        <div class="total">{{totalTitle}}</div>
        <div class="innerTitle">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: ['data', 'title', 'chartColors'],
  data: () => ({
    cutout: 70,
    totalTitle: "",
    colors:["#3399ff", "#003399", "#6d9be4", "#c2daff", "#e9f2ff"]
  }),
  mounted() {
    this.totalTitle = this.data.reduce((a, b) => a + b, 0).toLocaleString();
    if (!this.title) {
      this.cutout = 0;
      this.totalTitle = "";
    };
    if (this.chartColors) {
      this.colors = this.chartColors;
    }
    new Chart(this.$refs.myChart, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
          },
        ],
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
  max-width: 0;
  position: absolute;
  text-align: center;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.innerTitle{
  flex-wrap: wrap;
  font-weight: 900;
  font-size: 10vw;
  color: #999999;
}

.total{
  font-weight: 900;
  font-size: 10vw;
  color: #000000;
}
</style>