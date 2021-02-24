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
            <b-dropdown-item @click.prevent="logout" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row class="dashboard-area">
      <b-col class="dashboard-sidebar" lg="2" md="3" >
        <div class="">
          <router-link :to="{name: 'DashboardPage'}" class="dashboard-sidebar-link">
            <i class="fa fa-space-shuttle"></i> Dashboard
          </router-link>
          <router-link v-for="(item,index) in sidebar_items" :key="index"  class="dashboard-sidebar-link" :to="item.to">
            <i :class="`dashboard-menu-icon fa  fa-${item.icon}`" /> {{item.text}}
          </router-link>

        </div>

      </b-col>
      <b-col class="dashboard-content">
        <b-breadcrumb :items="breadcrumps"></b-breadcrumb>
        <div class="dashboard-default-slot">
          <slot name="default"></slot>
        </div>
        <!-- Column with content -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { allergiesPageState } from '@/schema/allergies_page_state'
import { contactsPageState } from '@/schema/contacts_page_state'
import { diagnosisPageState } from '@/schema/diagnosis_page_state'
import { eventsPageState } from '@/schema/events_page_state'
import { medicationsPageState } from '@/schema/medications_page_state'
import { vaccinationsPageState } from '@/schema/vaccinations_page_state'
import { vitalsPageState } from '@/schema/vitals_page_state'

export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  watch: {

  },
  methods: {
    logout () {}
  },
  computed: {
    breadcrumps () {
      return []
    },
    sidebar_items () {
      const itms = [
        allergiesPageState,
        contactsPageState,
        diagnosisPageState,
        eventsPageState,
        medicationsPageState,
        vaccinationsPageState,
        vitalsPageState
      ]
      for (const crudRegistryKey in itms) {
        const crudItm = itms[crudRegistryKey]

        itms.push(
          {
            text: crudItm.title,
            icon: crudItm.icon,
            to: {
              name: 'TablePage',
              params: {
                view: crudItm.assemblyName
              }
            }
          }
        )
      }
      return itms
    }
  }
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
    &-menu-icon{
      margin-right: 10px;
    }
    &-content{
      padding: 0;
      background: url(/img/pulsetile/gray_polygonal4_white.jpg);
      background-size: cover;
    }
    &-sidebar-link{
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      display: block;
      color: black;
    }
    &-default-slot{
      padding-left: 10px;
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
