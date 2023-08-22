import './assets/main.css'
import { VueFire } from 'vuefire'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import vClickOutside from 'v-click-outside'
import {firebaseApp} from '../database/helper'
const app = createApp(App)
app.use(vClickOutside)
app.use(VueFire, {
    firebaseApp,
})
app.use($)
app.use(router)
app.mount('#app')
