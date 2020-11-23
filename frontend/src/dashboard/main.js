import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'sweetalert2/dist/sweetalert2.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
