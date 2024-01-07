import '@/assets/css/main.css'
import VueApexCharts from 'vue3-apexcharts'
import vClickOutside from 'click-outside-vue3'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueApexCharts)
app.use(vClickOutside)
app.use(router) 

app.mount('#app')
