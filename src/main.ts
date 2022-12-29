import { createApp } from 'vue'
import App from './App.vue'
import {initRouter} from './router'
import {store} from './store/index';
const app=createApp(App)

initRouter(app);

app.mount('#app')
