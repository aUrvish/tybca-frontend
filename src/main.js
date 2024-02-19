import '@/assets/css/main.css'
import "vue-awesome-paginate/dist/style.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import VueApexCharts from 'vue3-apexcharts'
import vClickOutside from 'click-outside-vue3'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueApexCharts)
app.use(vClickOutside)
app.use(VueAwesomePaginate)
app.use(router) 

app.mount('#app')
