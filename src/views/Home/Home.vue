<template>
  <layout>
    <v-app>
      <v-container class="d-flex justify-center align-center">
        <div class="d-flex justify-center align-center">
          <div id="chart">
            <apexchart
                ref="realtimeChart"
                type="donut"
                width="700"
                :options="chartOptions"
                :series="series"
            />

          </div>
        </div>
      </v-container>
    </v-app>

  </layout>
</template>

<script>
import Layout from "@/layout/layout";
import {getListDepartment} from "@/services/department";

export default {
  data() {
    return {
      listDepartment: [],
      listDepartmentName: [],
      listDepartmentMember: [],
      series: [],

      chartOptions: {
        labels: [],
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Rubik',
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  offsetY: 16,
                },
                total: {
                  show: true,
                  label: 'Tổng nhân viên',
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                }
              },
            }
          }
        },

        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }

    };
  },

  created() {
    getListDepartment().then(res => {
      this.listDepartment = res.data;
    }).catch(() => {
      this.listDepartment = [];
    })

  },

  components: {
    Layout
  },

  methods: {

    setChart() {
      for (let i = 0; i < this.listDepartmentMember.length; i++) {
        this.series.push(this.listDepartmentMember[i]);
      }
      for (let i = 0; i < this.listDepartmentName.length; i++) {
        this.chartOptions.labels.push(this.listDepartmentName[i]);
      }
      this.$refs.realtimeChart.updateOptions([{
        labels: this.chartOptions.labels
      }], false, true)

    },

    getMe() {
      let status = localStorage.getItem('roleMe')
      console.log(status);
    }
  },

  watch: {
    listDepartment(value) {
      value.forEach(item => {
        this.listDepartmentName.push(item.name);
        this.listDepartmentMember.push(item.number_of_member);
      })
      this.setChart();
    }
  }
}
</script>