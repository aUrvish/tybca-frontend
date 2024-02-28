import '@/assets/css/main.css'
import "vue-awesome-paginate/dist/style.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import VueApexCharts from 'vue3-apexcharts'
import vClickOutside from 'click-outside-vue3'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(VueApexCharts)
app.use(vClickOutside)
app.use(VueAwesomePaginate)
app.use(router) 
app.use(pinia)
app.use(Vue3Toastify, {
    autoClose: 3000,
});

app.mount('#app')
