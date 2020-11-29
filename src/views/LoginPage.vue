<template>
  <login>
    <div class="login-page-block__logo">
      <img src="/img/pulsetile/pulsetile-logo.png"/>
    </div>
    <div class="login-page-block__form">
      <b-card
        header="Login"
        header-bg-variant="primary"
      >
        <div class="group" role="group">
          <label for="input-live">Name:</label>
          <b-form-input
            id="input-live"
            v-model="email"
            :state="emailState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter your name"
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>

        </div>

        <div class="group" role="group">
          <label for="input-live">Password:</label>
          <b-form-input
            id="input-live"
            v-model="password"
            :state="passwordState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter your password"
            type="password"
            trim
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>

          <!-- This is a form text block (formerly known as help block) -->
        </div>
        <div class="group" role="group">
          <a href="#">Forgot password?</a>
          <b-button
            variant="primary"
            align="right"
            class="float-right rounded-pill login-page-block__login-button"
            @click="login()"
          >Login</b-button>
        </div>
      </b-card>
    </div>
  </login>
</template>

<script>

import { mapActions } from 'vuex'
import Login from '@/layouts/Login'
import { result } from 'lodash'
export default {
  name: 'LoginPage',
  components: { Login },
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    this.$qewd.send({
      type: 'ping',
      params: {}
    }, (reply) => {
      const resp = result(reply, 'message.response', null)
      if (resp) {
        this.$router.push({ name: 'DashboardPage' }).catch(() => {})
      }
    })
  },
  methods: {

    ...mapActions('user', {
      putUserObject: 'putUserObject'
    }),

    login () {
      const messageObj = {
        type: 'login',
        params: {
          username: this.email,
          password: this.password
        }
      }
      this.$qewd.send(messageObj, (reply) => {
        if (reply.message.ok) {
          this.$bvToast.toast('You successful logged in.')
          this.putUserObject(reply.message.response)
          this.$router.push({ name: 'Patients' }).catch(() => {})
        } else {
          this.$bvToast.toast(reply.message.error)
        }
        console.log(reply)
      })
    }
  },
  computed: {
    emailState () {
      return this.email.length === 0 || this.email.length > 3
    },
    passwordState () {
      return this.password.length === 0 || this.password.length > 3
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  background: url(/img/pulsetile/gray_polygonal4.jpg);
  display: flex;
  min-height: 100vh;
  background-size: cover;
  align-content: center;
  justify-content: center;
  align-items: center;

  &-block {
    max-width: 500px;

    &__logo {
      padding-bottom: 20px;
      text-align: center;

      img {
        min-width: 160px;
        width: 50%;
        object-fit: contain;
      }
    }
    &__login-button{
      padding-left: 36px;
      padding-right: 36px;
    }
  }
  .group + .group{
    padding-top: 20px;
  }
}
</style>
