import moment from "moment"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const VueApp = createApp(App).use(store).use(router);
VueApp.config.globalProperties.$filters = {
    formatDate(value) {
        if (value) {
            return moment(String(value)).format('DD/MM/YYYY à hh:mm')
        } return "n/a"
    }
};
VueApp.mount('#app')
