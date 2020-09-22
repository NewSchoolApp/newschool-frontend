<template>
  <div class="chartCard">
      <div v-if="title" class="cardTitle">
        <h3>{{ cardTitle }}</h3>
      </div>
      <div class="chart">
        <pie-chart
        :data="data"
        :title="chartTitle"
        :chartColors="colors"
        />
      </div>
      <div class="labels">
        <div class="label"
          v-for="(label, index) in labels"
          :index="index"
          :key="label">
          <div class="labelIcon" :style="{ borderColor: colors[index] }"></div>
          <div>
            <div class="labelInfo">{{ label }}</div>
            <div class="labelValue">{{ data[index].toLocaleString() }}</div>
            <div class="labelInfo">{{ (data[index] / (data.reduce((a, b) => a + b, 0)/100)).toFixed(2) + '%' }}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PieChart from '~/components/PieChart';
export default {
  components: {
    PieChart,
  },
  props: ['data', 'chartTitle', 'cardTitle', 'labels', 'chartColors'],
  data: () => ({
    title: false,
    colors:["#3399ff", "#003399", "#6d9be4", "#c2daff", "#e9f2ff"],
  }),
  created() {
    if (this.cardTitle) {
      this.title = true;
    };
    if (this.chartColors) {
      this.colors = this.chartColors
    };
  },
};
</script>

<style scoped>
.chartCard{
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 10px 22px -13px rgba(0,0,0,0.75);
}

.cardTitle{
  padding: 10px 20px 0 20px;
  color: #6600cc;
  font-size: 14px;
}

.chart{
  margin: 20px 55px 10px 55px;
}

.labels{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 30px;
}

.label{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  line-height: 1.3;
}

.labelIcon{
  height: 20px;
  width: 20px;
  border: 5px solid blue;
  border-radius: 50px;
  margin-right: 10px;
}

.labelInfo{
  font-size: 3vw;
}

.labelValue{
  font-size: 5vw;
}

@media screen and (orientation: landscape){
  .chartCard {
  width: 250px;
  margin-bottom: 1.5em;
  margin-right: 2.5em;
  }

  .chart{
    margin: 10px 50px;
  }

  .labelIcon{
  height: 18px;
  width: 18px;
  }

  .labelInfo{
    font-size: 1.5vw;
  }

  .labelValue{
    font-size: 2.5vw;
  } 

  @media (min-width: 700px){
    .chartCard{
    width: 46%;
    margin-bottom: 1.5em;
    margin-right: 16px;
    }

    .labelInfo{
      font-size: 1vw;
    }

    .labelValue{
      font-size: 2vw;
    } 
  }

  @media (min-width: 1000px){
    .chartCard{
    width: 25%;
    margin-bottom: 1.5em;
    margin-right: 3em;
    }

    .labelInfo{
      font-size: 1vw;
    }

    .labelValue{
      font-size: 1.5vw;
    } 
  }
}

@media screen and (orientation: portrait){
  @media (max-width: 280px){
    .chartCard{
    margin-bottom: 1.5em;
    }

    .chart{
      margin: 10px 20px;
    }
    .labelInfo{
      font-size: 3vw;
    }

    .labelValue{
      font-size: 4vw;
    }
  } 

  @media (min-width: 700px){
    .chartCard{
      width: 47%;
      margin-bottom: 1.5em;
      margin-right: 1em;
    }
    .labelInfo{
      font-size: 2vw;
    }

    .labelValue{
      font-size: 3vw;
    }
  } 
}
</style>
