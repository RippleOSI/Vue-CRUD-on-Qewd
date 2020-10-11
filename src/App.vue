<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted: function () {
    var self = this
    // monitor when QEWD is ready
    this.$qewd.vRegistrationCallback(function (registered) {
      self.qewdReady = registered //
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
