import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Vuetify);
Vue.use(Toast,{timeout:3000});

export default new Vuetify({

});
