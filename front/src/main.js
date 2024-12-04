import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reactive } from 'vue'

const app = createApp(App)

app.use(router)

const userState = reactive({
    userType: null,
    userId: null,
});
  
app.provide('userState', userState);


app.mount('#app')
