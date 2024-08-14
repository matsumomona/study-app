import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

// vuetifyインポート
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
//Axiosインポート
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.prototype.$http = axios; // AxiosをVueインスタンスに追加

new Vue({
  router,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', 
    },
  }),
  render: h => h(App)
}).$mount('#app');
