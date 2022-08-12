import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

Vue.use(Vuetify);
Vue.use(Toast,{timeout:2000});
export default new Vuetify({
});
