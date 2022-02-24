<template>
    <material-card
      class="my-chart-card"
      color="accent"
      :loading="isLoading"
      :heading="title"
    >
      <v-select
        class="chart-type-select"
        v-if="isSelect"
        :loading="isLoading"
        :items="selectItems"
        v-model="selected"
        item-text="type_name"
        item-value="type"
        label="Type"
        outlined
      />

      <div class="my-chart-view">
        <canvas id="myChart" ref="chartRef"/>
      </div>
    </material-card>
</template>
<style>
.my-chart-view {
  /* display: inline !important; */
  padding: 10px;
}
.chart-type-select {
  padding: 10px !important;
  width: 43%;
}

</style>
<script>
  import Chart from 'chart.js'
  import colorLib from '@kurkle/color';

  // Chart.register(...registerables);
  const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    grey: 'rgb(201, 203, 207)'
  };

  export default {
    name: 'MyChart',
    props:{
      chartData: {
        type: Object,
        default: null
      },
      title: String,
      type: String,
      isSelect: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        Chart,
        selected: this.type,
        selectItems: [
          {type: 'bar', type_name: 'Bar'},
          {type: 'doughnut', type_name: 'Doughnut'},
          {type: 'line', type_name: 'Line'},
          {type: 'pie', type_name: 'Pie'},
        ],
        isLoading: true,
        myChart: null
      }
    },
    async mounted() {
      // 마운트 된 두 ref에 접근할 수 있으므로 마운트 뒤 차트를 그린다.
      this.drawChart(this.type);
    },
    watch: {
      selected: function (val) {
        if(val) {
          if (typeof val === 'object')
            this.drawChart(val.type);

          else this.drawChart(val);

        }
      }
    },
    methods: {
      async drawChart(type) {
        this.isLoading = true;

        let chartData;
        switch (type) {
          case 'bar':
            chartData = this.getBarChartData(this.chartData.labels, this.chartData.data, false);
            break;
          case 'line':
            chartData = this.getLineChartData(this.chartData.labels, this.chartData.data, false);
            break;
          case 'doughnut':
          case 'pie':
            chartData = this.getCicleChartData(this.chartData.labels, this.chartData.data, type, true);
            break;
        }

        if(this.myChart !== null) {
          this.myChart.destroy();
        }

        if (chartData !== null) {
            this.myChart = new Chart(this.$refs.chartRef, {
              type: type ? type : chartData.type,
              data: chartData.data,
              options: chartData.options
            })
        }
        this.myChart.update();

        this.isLoading = false;

        console.log("loding: " + this.isLoading);
      },
      transparentize(value, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return colorLib(value).alpha(alpha).rgbString();
      },
      getLineChartData(labels, data) {
        let chartData = {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              backgroundColor: this.transparentize(CHART_COLORS.red, 0.5),
              borderColor: CHART_COLORS.red,
              data: data,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: false,
            },
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            elements: {
              bar: {
                borderWidth: 2
              }
            }
          }
        };

        return chartData;
      },
      getBarChartData(labels, data, opacity) {
        let barChartData = {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              backgroundColor: opacity ? Object.values(CHART_COLORS).map(color => this.transparentize(color)) : Object.values(CHART_COLORS),
              borderColor: 'white',
              data: data,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: false,
            },
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            elements: {
              bar: {
                borderWidth: 2
              }
            }
          }
        };

        return barChartData;
      },
      getCicleChartData(labels, data, type, opacity) {
        let ciclehartData = {
          type: type,
          data: {
            labels: labels,
            datasets: [{
              backgroundColor: opacity ? Object.values(CHART_COLORS).map(color => this.transparentize(color)) : Object.values(CHART_COLORS),
              borderColor: this.transparentize('white', 0),
              data: data,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              }
            }
          }
        };

        return ciclehartData;
      },
      getBubleChartData(labels, data, type, opacity) {
        let ciclehartData = {
          type: type,
          data: {
            labels: labels,
            datasets: [{
              backgroundColor: opacity ? Object.values(CHART_COLORS).map(color => this.transparentize(color)) : Object.values(CHART_COLORS),
              borderColor: this.transparentize('white', 0),
              data: data,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              }
            }
          }
        };

        return ciclehartData;
      },
    }

  }
</script>
