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
        sm="12">

        <my-calendar>
        </my-calendar>

      </v-col>
    </v-row>

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
  import MyCalendar from '../components/MyCalendar.vue'
  import axios from 'axios'

  export default {
  components: { MyCalendar },
    name: 'calendarViews',
    data() {
      return {
      }
    },
    mounted() {
        // this.init();
    },
    watch: {
        // leagueSelect: function(val) {
        //     // 통계 데이터 가져오기

        //     this.arenaData = null;
        //     this.attendData = null;
        //     this.gameAvgAttendData = null;
        //     this.startTimeData = null;
        //     this.getStatistics(val);
        // }
    },
    methods: {
      init() {
          // alert('리그 통계 준비중 입니다. \nPreparing to open the League Statistics. ')
          this.getLeagues();
      },
      
    }
  }
</script>
