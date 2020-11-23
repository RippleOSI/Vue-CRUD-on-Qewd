<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  created: function () {
    var self = this
    // monitor when QEWD is ready
    this.$qewd.vRegistrationCallback(function (registered, msgType) {
      self.qewdReady = registered
      if (registered) {
        if (msgType === 'ewd-registered') {
          self.$qewd.setCookie('ewdSession')
        }
      } else {
        if (msgType === 'socketDisconnected') {
          self.$router.push({ name: 'LoginPage' }).catch(() => {})
        }
      }
    })
    // start the QEWD WebSockets connection ...
    this.$qewd.vueStart()
  },
  data () {
    return {
      qewdReady: false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    testing: function () {
      const messageObj = {
        type: 'test',
        params: {
          text: 'a Vue.js test message for QEWD'
        }
      }
      const self = this
      this.$qewd.send(messageObj, function (messageObj) {
        self.msg = messageObj.message.text
      })
    }
  }
}
</script>

<style lang="scss">
$fa-font-path: "~@fortawesome/fontawesome-free-webfonts/webfonts";
@import "~@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss";
@import "~@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss";
@import "~@fortawesome/fontawesome-free-webfonts/scss/fa-regular.scss";
@import "~@fortawesome/fontawesome-free-webfonts/scss/fa-brands.scss";

</style>
