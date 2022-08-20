<template>
  <layout>
    <div>
<!--      <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>-->
    </div>
  </layout>
</template>

<script>
  import Layout from "@/layout/layout";
  export default {
    // data(){
    //   return {
    //     options: {
    //       chart: {
    //         id: 'vuechart-example'
    //       },
    //       xaxis: {
    //         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    //       }
    //     },
    //     series: [{
    //       name: 'series-1',
    //       data: [30, 40, 45, 50, 49, 60, 70, 91]
    //     }]
    //   }
    // },

    components: {
      Layout
    },

    methods:{
      getMe(){
        let status = localStorage.getItem('roleMe')
        console.log(status);
      }
    }
  }
</script>