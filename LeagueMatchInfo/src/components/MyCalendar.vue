<template>
  <div>
    <v-sheet width="100%">
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet width="100%" height="600">

      <v-calendar
        ref="calendar"
        :event-overlap-mode="'stack'"
        :event-overlap-threshold="30"

      ></v-calendar>
    </v-sheet>
  </div>
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

  export default {
    name: 'MyCalendar',
    props:{
      
    },
    data() {
      return {

      }
    },
    async mounted() {
      // 마운트 된 두 ref에 접근할 수 있으므로 마운트 뒤 차트를 그린다.
      // this.drawChart(this.type);
    },
    watch: {
      // selected: function (val) {
      //   if(val) {
      //     if (typeof val === 'object')
      //       this.drawChart(val.type);

      //     else this.drawChart(val);

      //   }
      // }
    },
    methods: {
    }
  }
</script>
