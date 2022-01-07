<template>
    <material-card
      class="my-chart-card"
      color="accent"
      :loading="loading"
      :heading="title"
    >
      <div class="my-chart-view">
        <canvas v-show="isLoading" id="myChart"  ref="lineChart"/>
      </div>
    </material-card>
</template>
<style>
.my-chart-view {
  padding: 10px;
}
</style>
<script>

  import Chart from 'chart.js'
  export default {
    name: 'MyChart',
    props:{
      chartData: {
        type: Object,
        default: null
      },
      title: String,
      loading: Boolean
    },
    data() {
      return {
        Chart
      }
    },
    async created() {
      // 필요 시 데이터 가져오는 로직
      // 차트생성에 사용할 옵션과 데이터가 결정될 것이다.
    },
    async mounted() {
      // 마운트 된 두 ref에 접근할 수 있으므로 마운트 뒤 차트를 그린다.
      await this.drawChart();
    },
    computed: {
      isLoading: function () {
        return !this.loading;
      }
    },
    watch: {
      chartData: function (val) {
        console.log('watch: ' + val);
        this.drawChart();
      }
    },
    methods: {
      async drawChart() {
        // context와 Chart.js객체, 데이터가 결정됐으니  그리기만 하면된다.
        console.log('chartData: ' + this.chartData);
        if (this.chartData !== null) {

          const chartCtx = this.$refs.lineChart.getContext("2d");
          const myChart = new Chart(chartCtx, {
            type: this.chartData.type,
            data: this.chartData.data,
            options: this.chartData.options
          })
        }
        // console.log(chartCtx, "chartCtx?");

      },
    }
  }
</script>
