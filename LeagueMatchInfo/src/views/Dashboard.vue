<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
  <!-- line 1 -->
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <my-chart
              title="참여율"
              :chartData="chartData">
            </my-chart>
          </v-col>

          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <my-chart
              title="참여율"
              :chartData="chartData2">
            </my-chart>
          </v-col>

          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <my-chart
              title="경기장"
              :chartData="chartData3">
            </my-chart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- line 2 -->
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <my-chart
              title="참여율"
              :chartData="chartData">
            </my-chart>
          </v-col>

          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <my-chart
              title="참여율"
              :chartData="chartData2">
            </my-chart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import MyChart from '../components/MyChart.vue'

  export default {
  components: { MyChart },
    name: 'DashboardView',
    data() {
      return {
        MyChart,
        chartData: {
          type: 'pie',
          data: {
            labels: ['출석','미출석'],
            datasets: [{
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'blue'
                ],
              borderColor: '#36495d',
              data: [28, 120],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'Chart.js Pie Chart'
              }
            }
          }
        },

        chartData2: {
          type: 'bar',
          data: {
            labels: ['출석','미출석'],
            datasets: [{
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'blue'
                ],
              borderColor: '#36495d',
              data: [28, 120],
            }]
          },
          options: {
            plugins: {
              legend: false,
            },
            elements: {
              bar: {
                // backgroundColor: colorize(false),
                // borderColor: colorize(true),
                borderWidth: 2
              }
            }
          }
        },
        chartData3: {
          type: 'bar',
          data: {
            labels: ['실내테니스장', '한림레크리에이션센터 체육관', 'ILSONG Stadium(구 대운동장)'],
            datasets: [{
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'blue',
                  'green'
                ],
              borderColor: '#36495d',
              data: [1, 1, 5],
            }]
          },
          options: {
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
            }
          }
        }
      }
    },
    methods: {
      init() {
          // alert('리그 통계 준비중 입니다. \nPreparing to open the League Statistics. ')
      }
    }
  }
</script>
