import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueObserveVisibility from 'vue-observe-visibility'
import "share-api-polyfill";

Vue.use(VueObserveVisibility)
Vue.config.productionTip = false
import "@/assets/global.css"

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
