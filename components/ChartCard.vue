<template>
  <div class="chartCard">
      <div v-if="title" class="cardTitle">
        <h3>{{ cardTitle }}</h3>
      </div>
      <div class="chart">
        <pie-chart
        :data="data"
        :title="chartTitle"
        :total="chartTotal"
        :chartColors="colors"
        :labels="labels"
        />
      </div>

      <div v-if="labelsSubject" class="labels" :style= "labelwSubject.labels">
        <div class="label" :style= "labelwSubject.label"
        v-for="(label, index) in labels"
        :index="index"
        :key="label">
          <div class="labelIcon" :style="{ borderColor: colors[index] }"></div>
          <div>

            <div class="labelSubject">
              <strong :style="{ Color: colors[index] + '!important' }">{{ labelsSubject[index] }}</strong>
            </div>

            <div class="labelInfos" :style= "labelwSubject.labelInfos">
                <strong>{{ label }}</strong>
                <p>{{ data[index].toLocaleString() }}</p>
                <div v-if="labelSuffix">
                   <p>{{ labelSuffix }}</p>
                </div>
            </div>

          </div>
        </div>
      </div>

      <div v-else class="labels">
        <div class="label"
        v-for="(label, index) in labels"
        :index="index"
        :key="label">
          <div class="labelIcon" :style="{ borderColor: colors[index] }"></div>
          <div class="labelInfos">
            <div class="labelInfo">{{ label }}</div>
            <div class="labelValue">
              {{ data[index].toLocaleString() }}
              <div v-if="labelSuffix" class="labelSuffix">
                {{ labelSuffix }}
              </div>
            </div>
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
  props: ['labelsSubject', 'data', 'chartTitle', 'chartTotal', 'cardTitle', 'labels', 'chartColors', 'labelSuffix'],
  data: () => ({
    title: false,
    colors:["#3399ff", "#003399", "#6d9be4", "#c2daff", "#e9f2ff"],
    labelwSubject: {
      labels:{
        display: 'initial',
        'margin-left': '55px',
      },
      label:{
        width: '100%',
        'justify-content': 'initial',
      },
      labelInfos:{
        display: 'flex',
        gap: '5px'
      },
    }
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
}

.label{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  line-height: 1.3;
}

.labelSubject{
  font-size: 85%;
}

.labelIcon{
  height: 20px;
  width: 20px;
  border: 5px solid blue;
  border-radius: 100%;
  margin-right: 10px;
}

.labelInfo{
  font-size: 3vw;
}

.labelValue{
  display: flex;
  align-items: baseline;
  font-size: 5vw;
  gap: 3px;
}

.labelSuffix{
 font-size: 3vw;
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

  .label{
    font-size: 1.5vw;
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

    .label{
      font-size: 1vw;
    }

    .labelInfo{
      font-size: 1vw;
    }

    .labelValue{
      font-size: 1.5vw;
    } 

    .labelSuffix{
      font-size: 1vw;
    }
  }
}

@media screen and (orientation: portrait){
  @media (min-width: 280px){

    .label{
      font-size: 3.5vw;
    }

  } 

  @media (min-width: 700px){
    .chartCard{
      width: 47%;
      margin-bottom: 1.5em;
      margin-right: 1em;
    }

    .label{
      font-size: 2vw;
    }

    .labelInfo{
      font-size: 2vw;
    }

    .labelValue{
      font-size: 3vw;
    }

    .labelSuffix{
      font-size: 2.5vw;
    }
  } 
}
</style>
