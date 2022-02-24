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
              v-model="leagueSelect"
              :items="leagueItems"
              :loading="isLeagueLoading"
              item-text="leag_nm"
              item-value="leag_no"
              label="League"
              persistent-hint
              return-object
              outlined
          />
      </v-col>

      <v-col
          cols="12"
          sm="6">
          <v-select
              class="league-match-select"
              v-model="gameSelect"
              :items="gameItems"
              :loading="isGameLoading"
              item-text="game_nm"
              item-value="game_no"
              label="Game"
              outlined
          />
      </v-col>

  </v-row>

    <material-card
      :loading="isCalendarLoading"
      color="accent"

      >
      <v-row
        align="center">
        <v-col
          cols="12"
          sm="12">

          <my-calendar
            :events="events"
            >
          </my-calendar>

        </v-col>
      </v-row>
    </material-card>


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
        leagueSelect: {leag_no : '-1', leag_nm: '로딩 중'},
        gameSelect: {game_no : '-1', game_nm: '로딩 중'},
        leagueItems: [{leag_no : '-1', leag_nm: '로딩 중'}],
        gameItems: [{game_no : '-1', game_nm: '로딩 중'}],

        isLeagueLoading: true,
        isGameLoading: false,
        isCalendarLoading: false,
        events: [],
      }
    },
    mounted() {
        this.init()
    },
    watch: {
      leagueSelect: function(val) {
        // console.log('watch leagueSelect val: ' + JSON.stringify(val));
        this.events = []
        if (val) {
          // console.log('watch leagueSelect val: if');
          if (typeof val === 'object'){
            if(val.leag_no === '-1') {
              this.gameSelect = {game_no : '-1', game_nm: '전체'}
              this.gameItems = [{game_no : '-1', game_nm: '전체'}]
            }
            this.getGames(val.leag_no)
          }
          else {
            if (val === '-1') {
              this.gameSelect = {game_no : '-1', game_nm: '전체'}
              this.gameItems = [{game_no : '-1', game_nm: '전체'}]
            }
            this.getGames(val)
          }
        }
      },
      gameSelect: function(val) {
        // console.log('watch gameSelect val: ' + JSON.stringify(val));
        if (val) {
          if (typeof val === 'object')
            this.getGameSchedule(val.game_no);
          else
            this.getGameSchedule(val);
        }
      }
    },
    methods: {
      init() {
          this.getLeagues();
      },
      getColor(data) {
        let color

        switch(data) {
          case '001001':
            color = 'deep-purple'
            break
          case '001002':
            color = 'green'
            break
          case '001003':
            color = 'blue'
            break
          case '001004':
            color = 'indigo'
            break
          case '001005':
            color = 'red'
            break
          case '001006':
            color = 'cyan'
            break
          case '001007':
            color = 'orange'
            break
          case '001008':
            color = 'grey darken-1'
            break
          default:
            color = 'black'
        }

        return color
      },
      getDetails(data) {
        // example / not Used
        let details = ''
        details += '<span>리그: </span> ' + data.leag_nm + '<br>'
        details += '<span>종목: </span>' + data.game_nm + '<br>'
        details += '<span><v-icon>mdi-dots-vertical</v-icon>경기장: </span>' + data.game_arena_nm + '<br>'
        details += '<span>진행상황: </span>' + data.process_nm+ '<br>'

        return details
      },
      async getLeagues() {
        this.isLeagueLoading = true;
        await axios.get(`/api/leagues`)
          .then((result) => {
            this.leagueItems = []
            this.leagueItems.push({
              leag_no: '-1',
              leag_nm: "전체"
            })
            for(let data of result.data.data) {
              this.leagueItems.push({
                leag_no: data.leag_no,
                leag_nm: data.leag_nm
              })
            }
            this.leagueSelect = this.leagueItems[0].leag_no;
            // console.log('[getLeages] select: ' + this.leagueItems[0].leag_no);
          })
          .catch((err) => {
            console.log(err);
          })

        this.isLeagueLoading = false;
      },
      async getGames(leag_no) {
        // console.log('getGames leag_no: ' + leag_no);
        this.isGameLoading = true;
        this.leag_no = leag_no;
        await axios.get(`/api/leagues/${leag_no}/games`)
          .then((result) => {
            this.gameItems = []
            this.gameItems.push({
              game_no: '-' + result.data.data[0].game_no,
              game_nm: "전체"
            })

            for(let data of result.data.data) {
              this.gameItems.push({
                game_no: data.game_no,
                game_nm: data.game_nm
              })
            }
            this.gameSelect = this.gameItems[0].game_no;
          })
          .catch((err) => {
            console.log(err);
            this.isGameLoading = false;
            if (this.gameSelect.game_no !== '-1') {
              this.gameSelect = {game_no : '-1', game_nm: '전체'};
              this.gameItems = [{game_no : '-1', game_nm: '전체'}];
            }
          })

        this.isGameLoading = false;
      },
      async getGameSchedule(game_no) {
        // console.log('getGameSchedule game_no: ' + game_no);
        this.events = [];
        this.isCalendarLoading = true;

        await axios.get(`/api/leagues/${this.leag_no}/games/${game_no}/game-schedules`)
            .then((result) => {
              let data =  result.data.data;
              // console.log("getGameSchedule: %o" , data);

              for (let val of data) {
                const startDate = new Date(val.start.replaceAll('T', ' '))
                const endDate = new Date(val.end.replaceAll('T', ' '))

                const startTimestamp = new Date(startDate.getTime() - (startDate.getTime() % 900000));
                const endTimestamp = new Date(endDate.getTime() - (endDate.getTime() % 900000));
                const allDay = startTimestamp - endTimestamp === 0;

                this.events.push({
                  details: this.getDetails(val),
                  color: this.getColor(val.game_cd),
                  start: startDate,
                  end: endDate,
                  time: val.start.replaceAll('T', ' ') + ' ~ ' + val.end.replaceAll('T', ' '),
                  name: val.matches,
                  leag_nm: val.leag_nm,
                  game_nm: val.game_nm,
                  game_arena_nm: val.game_arena_nm,
                  process_nm: val.process_nm,
                  timed: !allDay,
                })
              }
            })
            .catch((err) => {
              console.log(err.response);
              if (err.response.status === 404) {
                alert('일정이 없습니다.')
                if (this.gameItems.length === 1){
                    this.gameItems = [{game_no : '-1', game_nm: 'No Data'}]
                  }
              }

            })
        // console.log('this.events: %o', this.events)
        this.isCalendarLoading = false;
      },

    }
  }
</script>
