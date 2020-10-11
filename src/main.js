import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import io from 'socket.io-client'
import { QEWD, VueQEWD } from 'vue-qewd'

// import both the QEWD class and VueQEWD plugin
// import axios (optional, in case you need to use ajax mode)

Vue.config.productionTip = false

// instantiate QEWD with your parameters
var qewd = QEWD({
  application: 'pt-wc-q', // application name
  log: true,
  url: 'http://localhost:8090', // adjust this to your local environment
  io // use WebSocket communication
  // uncomment the lines below to use axios ajax calls instead of using WebSockets (and remove io parameter)
  // see also part 14 of QEWD training course from page 15 at
  // https://www.slideshare.net/robtweed/ewd-3-training-course-part-14-using-ajax-for-ewdxpress-messages
  /*
  ajax: function (params, success, fail) {
    let data = JSON.stringify(params.data)
    axios({
      url: params.url,
      method: 'post',
      headers: {
        'Content-Type': params.contentType
      },
      data,
      timeout: params.timeout
    })
      .then(function (response) {
        success(response.data)
      })
      .catch(function (error) {
        if (error.response) {
          success(error.response.data)
        } else {
          fail(error.message || 'unknown ajax error')
        }
      })
  }
  */
})

// let Vue know you want to use the plugin
Vue.use(VueQEWD, { qewd })

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
