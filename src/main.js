import Vue from 'vue'
import App from './App'
import fly from '@/lib/http'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$http = fly

const app = new Vue(App)
app.$mount()
