import { createApp } from 'vue'
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
  .component('fa-icon', FontAwesomeIcon)
