<template>
  <div class="dashboard">
    <b-navbar class="dashboard-navbar" toggleable="sm" type="light" >
      <b-navbar-brand href="#"><img class="dashboard-logo" src="/img/pulsetile/pulsetile-logo.png"/> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>

            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-circle"></b-icon>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row class="dashboard-area">
      <b-col class="dashboard-sidebar" lg="2" md="3" >
        <div class="">
          <router-link class="dashboard-sidebar-link" to="/"><b-icon icon="person-circle"/> Test</router-link>
          <router-link class="dashboard-sidebar-link" to="/"><b-icon icon="person-circle"/> Test</router-link>

        </div>

      </b-col>
      <b-col class="dashboard-content">
        <!-- Column with content -->
        <slot name="default"></slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped lang="scss">
  .dashboard{
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &-logo{
      width: 160px;
    }
    &-navbar{
      border-bottom: 1px solid #f2f2f2;
    }
    &-sidebar{
      border-right: 1px solid #f2f2f2;
      padding-right: 0;
    }
    &-area{
      flex: 1;
    }

    &-sidebar-link{
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      display: block;
      color: black;
    }

    &-sidebar-link:hover{
      text-decoration: none;
      color: #ff5d00;
      background: #f2f2f2;
    }

    &-sidebar-link + &-sidebar-link{
      border-top: 1px solid #f2f2f2;
    }
  }
</style>
