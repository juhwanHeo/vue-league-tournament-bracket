<template>
  <div>
    <v-sheet width="100%">
      <v-toolbar
          flat
        >
        <v-btn
          icon
          fab
          text
          small
          class="ma-2"
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          text
          small
          class="ma-2"
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-toolbar-title v-if="$refs.calendar">
          {{ getTitle }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <!--
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
              -->
            </v-list>
          </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet width="100%" height="600">

      <v-calendar
        ref="calendar"
        v-model="focus"
        :event-overlap-mode="'stack'"
        :event-overlap-threshold="30"
        :events="events"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        :loading="true"

      ></v-calendar>

      <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <div>
                <v-icon>mdi-information</v-icon>
                <span class="event-info">리그: {{selectedEvent.leag_nm}}</span>
              </div>
              <div>
                <v-icon>mdi-information</v-icon>
                <span class="event-info">종목: {{selectedEvent.game_nm}}</span>
              </div>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span class="event-info">경기장: {{selectedEvent.game_arena_nm}}</span>
              </div>
              <div>
                <v-icon>mdi-clock-time-eight</v-icon>
                <span class="event-info">시간: {{selectedEvent.time}}</span>
              </div>
              <div>
                <v-icon>mdi-information</v-icon>
                <span class="event-info">진행상황: {{selectedEvent.process_nm}}</span>
              </div>

            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
    </v-sheet>
  </div>
</template>
<style>
.event-info {
  color: black;
  font-weight: bold;


}
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

  export default {
    name: 'MyCalendar',
    props:{
      events: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        focus: '',
        type: 'month',
        typeToLabel: {
          month: 'Month',
          week: 'Week',
          day: 'Day',
          '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
      }
    },
    async mounted() {
      // 마운트 된 두 ref에 접근할 수 있으므로 마운트 뒤 차트를 그린다.
      // this.drawChart(this.type);
      this.$refs.calendar.checkChange()


    },
    watch: {

    },
    computed: {
      getTitle() {
        let titleSplit = this.$refs.calendar.title.split('월')
        return titleSplit[1].trim() + '년 ' + titleSplit[0] + '월'
      }
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      }
    }
  }
</script>
