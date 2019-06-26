import Vue from 'vue'
import Inner from './Inner.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iframeCommunicate from '@/assets/iframeCommunicate.js'

Vue.use(ElementUI);
Vue.use(iframeCommunicate);

const vm = new Vue({
  router,
  store,
  render: h => h(Inner)
}).$mount('#inner')
console.log('inner main.js---11111')
vm.iframeCommunicate.setContentWindow(window.parent);