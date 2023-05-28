import './assets/main.css'
import { VueFire } from 'vuefire'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {firebaseApp} from '../database/helper'
const app = createApp(App)

app.use(VueFire, {
    firebaseApp,
})
app.use(router)
app.mount('#app')
