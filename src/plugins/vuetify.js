import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(Vuetify);
Vue.use(Toast,{timeout:3000});

export default new Vuetify({

});
