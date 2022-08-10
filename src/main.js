import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from 'axios';
import store from './store'
import VueAxios from 'vue-axios';

library.add(fas);
Vue.component("fa", FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueAxios,axios);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
