<template>

  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
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
        isCalendarLoading: false,
        events: [],
      }
    },
    mounted() {
        this.init()
    },
    methods: {
      init() {
          this.getGameSchedule();
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
      async getGameSchedule() {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
          this.isCalendarLoading = true;
          await axios.get(`/api/leagues/game-schedules`)
              .then((result) => {
                let data =  result.data.data;
                console.log("getGameSchedule: %o" , data);

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
                  console.log(err);
              })
          console.log('this.events: %o', this.events)
          this.isCalendarLoading = false;
      },

    }
  }
</script>
