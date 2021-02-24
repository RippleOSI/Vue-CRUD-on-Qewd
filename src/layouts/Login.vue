<template>
  <div class="login-page">
    <div class="login-page-block col-lg-4 col-md-5 col-sm-7 col-xs-8 ">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
