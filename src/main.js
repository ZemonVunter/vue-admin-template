import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission' // permission control


import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.req = request

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
