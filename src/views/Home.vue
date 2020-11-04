<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is vaan alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  watch: {
  },
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
