<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row
      align="center">
      <v-col
        cols="12"
        sm="6">
        <v-select
            class="league-match-select"
            :loading="isLeagueLoading"
            :items="leagueItems"
            v-model="leagueSelect"
            item-text="leag_nm"
            item-value="leag_no"
            label="League"
            outlined
        />
      </v-col>
    </v-row>

    <!-- line 1 -->
    <v-row>
      <v-col
        cols="12"
        md="4"
        lg="4"
      >
        <my-chart
          title="경기장 사용 횟수"
          :loading="isStatisticsLoading"
          :chartData="arenaData">
        </my-chart>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="4"

      >
        <my-chart
          title="출석율 (%)"
          :loading="isStatisticsLoading"
          :chartData="attendData">
        </my-chart>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="4"

      >
        <my-chart
          title="종목별 경기당 평균 출석 인원"
          :loading="isStatisticsLoading"
          :chartData="gameAvgAttendData">
        </my-chart>
      </v-col>
    </v-row>

    <!-- line 2 -->
    <v-row>
      <v-col
        cols="12"
        md="12"
        lg="12"
      >
        <my-chart
          title="경기 시작시간이 많은 시간대 (hour)"
          :loading="isStatisticsLoading"
          :chartData="startTimeData">
        </my-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import MyChart from '../components/MyChart.vue'
  import colorLib from '@kurkle/color';
  import axios from 'axios'

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
  components: { MyChart },
    name: 'DashboardView',
    data() {
      return {
        MyChart,
        leagueSelect: null,
        leagueItems: [],
        isLeagueLoading: true,
        isStatisticsLoading: true,
        attendData: null,
        startTimeData: null,
        arenaData: null,
        gameAvgAttendData: null ,
        chartData4: {
          type: 'doughnut',
          data: {
            labels: ['출석','미출석'],
            datasets: [{
              backgroundColor: [
                  CHART_COLORS.red,
                  CHART_COLORS.blue
                ],
              borderColor: 'white',
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
        }
      }
    },
    mounted() {
        this.init();
    },
    watch: {
        leagueSelect: function(val) {
            // 통계 데이터 가져오기
            this.getStatistics(val);
        }
    },
    methods: {
      init() {
          // alert('리그 통계 준비중 입니다. \nPreparing to open the League Statistics. ')
          this.getLeagues();
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
        let barChartData = {
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

        return barChartData;
      },
      async getLeagues() {
          this.isLeagueLoading = true;
          await axios.get(`/api/leagues`)
              .then((result) => {
                  console.log("leages: " + result);
                  this.leagueItems = result.data.data;
                  this.leagueSelect = this.leagueItems[0].leag_no;
                  console.log("leagueSelect : " + this.leagueSelect);
              })
              .catch((err) => {
                  console.log(err);
              })

          this.isLeagueLoading = false;
      },
      async getStatistics(leag_no) {
        this.isStatisticsLoading = true;

        await axios.get(`/api/leagues/${leag_no}/statistics`)
            .then((result) => {
                const gameStartHour = result.data.data.gameStartHour;
                const arenaUseCount = result.data.data.arenaUseCount;
                const attendanceRate = result.data.data.attendanceRate;
                const gameAvgAttend = result.data.data.gameAvgAttend;

                this.arenaData = this.getBarChartData(arenaUseCount.labels, arenaUseCount.data, false);
                //'doughnut, pie'
                this.attendData = this.getCicleChartData(attendanceRate.labels, attendanceRate.data, 'pie', false);
                this.gameAvgAttendData = this.getBarChartData(gameAvgAttend.labels, gameAvgAttend.data, false);
                this.startTimeData = this.getLineChartData(gameStartHour.labels, gameStartHour.data);
            })
            .catch((err) => {
                console.log(err);
            })
        setTimeout(() => {
          this.isStatisticsLoading = false;
        }, 1000)


      }
    }
  }
</script>
