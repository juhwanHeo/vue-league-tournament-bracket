<template>
  <v-container
    id="dashboard-view"
    tag="section"
    fluid
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

    <div
      class="progress-circular"
      v-if="isStatisticsLoading">
      <v-progress-circular

        :size="70"
        :width="7"
        color="purple"
        indeterminate
      />
    </div>

    <div v-else>
      <v-row>
        <v-col
          v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
          :key="i"
          cols="12"
          md="6"
          lg="4"
        >
          <material-stat-card v-bind="attrs">
            <template #actions>
              <v-icon
                class="mr-2"
                small
                v-text="actionIcon"
              />
              <div class="text-truncate">
                {{ actionText }}
              </div>
            </template>
          </material-stat-card>
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
            v-if="arenaData !== null"
            title="경기장 사용 횟수"
            :chartData="arenaData"
            :isSelect="true"
            :type="'bar'">
          </my-chart>

        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <my-chart
            v-if="attendData !== null"
            title="출석율 (%)"
            :chartData="attendData"
            :isSelect="true"
            :type="'doughnut'">
          </my-chart>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <my-chart
            v-if="gameAvgAttendData !== null"
            title="종목별 경기당 평균 출석 인원"
            :chartData="gameAvgAttendData"
            :isSelect="true"
            :type="'bar'">
          </my-chart>
        </v-col>
      </v-row>


      <!-- line 2 -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="6"
        >
          <my-chart
            v-if="startTimeData !== null"
            title="경기 시작시간이 많은 시간대 (hour)"
            :chartData="startTimeData"
            :isSelect="true"
            :type="'line'">
          </my-chart>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="6"
        >
          <my-chart
            v-if="genderData !== null"
            title="리그 경기(성별) 비율(%)"
            :chartData="genderData"
            :isSelect="true"
            :type="'pie'">
          </my-chart>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style>
.progress-circular {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
<script>
  // Utilities
  import MyChart from '../components/MyChart.vue'
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
        genderData: null,
        startTimeData: null,
        arenaData: null,
        gameAvgAttendData: null ,
        stats: [
          // {
          //   actionIcon: 'mdi-clock',
          //   actionText: '리그 운영 기간',
          //   icon: 'mdi-clock',
          //   color: 'success',
          //   title: '운영 기간',
          //   value: '2022.03.02 ~ 2022.05.31',
          // },
          // {
          //   actionIcon: 'mdi-google-controller',
          //   actionText: '리그 종목 개수',
          //   color: '#FD9A13',
          //   icon: 'mdi-google-controller',
          //   title: '종목 개수',
          //   value: '4',
          // },
          // {
          //   actionIcon: 'mdi-twitter',
          //   actionText: '리그 참가 인원',
          //   color: 'info',
          //   icon: 'mdi-twitter',
          //   title: '참가인원',
          //   value: '245',
          // },

        ],
      }
    },
    mounted() {
        this.init();
    },
    watch: {
        leagueSelect: function(val) {
            // 통계 데이터 가져오기

            this.arenaData = null;
            this.attendData = null;
            this.gameAvgAttendData = null;
            this.startTimeData = null;
            this.getStatistics(val);
        }
    },
    methods: {
      init() {
          // alert('리그 통계 준비중 입니다. \nPreparing to open the League Statistics. ')
          this.getLeagues();
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
        this.arenaData = null;
        this.attendData = null;
        this.gameAvgAttendData = null;
        this.genderData = null;
        this.startTimeData = null;
        this.stats = null;
        this.isStatisticsLoading = true;

        await axios.get(`/api/leagues/${leag_no}/statistics`)
          .then((result) => {
            let nullCnt = 6;
            const gameStartHour = result.data.data.gameStartHour;
            const arenaUseCount = result.data.data.arenaUseCount;
            const attendanceRate = result.data.data.attendanceRate;
            const genderRate = result.data.data.genderRate;
            const gameAvgAttend = result.data.data.gameAvgAttend;
            const stats = result.data.data.stats;

            if (arenaUseCount !== null) {
              this.arenaData = arenaUseCount;
              nullCnt--
            }
            if (attendanceRate !== null) {
              this.attendData = attendanceRate;
              nullCnt--
            }
            if (genderRate !== null) {
              this.genderData = genderRate;
              nullCnt--
            }
            if (gameAvgAttend !== null) {
              this.gameAvgAttendData = gameAvgAttend;
              nullCnt--
            }
            if (gameStartHour !== null) {
              this.startTimeData = gameStartHour;
              nullCnt--
            }

            if (stats !== null) {
              this.stats = [];
              this.stats.push({
                actionIcon: 'mdi-clock',
                actionText: '리그 운영 기간',
                icon: 'mdi-clock',
                color: 'success',
                title: '운영 기간',
                value: stats.operatingPeriod,
              })

              this.stats.push({
                actionIcon: 'mdi-google-controller',
                actionText: '리그 종목 개수',
                color: '#FD9A13',
                icon: 'mdi-google-controller',
                title: '종목 개수',
                value: stats.eventCount + ' 종목',
              })

              this.stats.push({
                actionIcon: 'mdi-twitter',
                actionText: '리그 참가 인원',
                color: 'info',
                icon: 'mdi-twitter',
                title: '참가인원',
                value: stats.participantCount + '명',
              })
              nullCnt--
            }

            if (nullCnt === 6) alert("데이터가 없습니다.")
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
