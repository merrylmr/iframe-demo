import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 用于iframe通信
import iframeCommunicate from '@/assets/iframeCommunicate.js'

Vue.use(ElementUI);
Vue.use(iframeCommunicate);

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
let iWin = document.getElementById('inner-iframe').contentWindow;
console.log('iWin', iWin)
vm.iframeCommunicate.setContentWindow(iWin);