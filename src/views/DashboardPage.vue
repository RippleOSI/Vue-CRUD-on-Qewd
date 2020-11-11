<template>
  <dashboard>
    <div class="container">
      <div class="card-columns card-columns">
        <dashboard-element v-for="(item,index) in dashboardComponents"
                           :key="index"
                           :schema="item"

        />
      </div>
    </div>
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import CrudRegistry from '@/schema/schema_register'
import DashboardElement from '@/components/Dashboard/DashboardElement'

export default {
  name: 'DashboardPage',
  components: { DashboardElement, Dashboard },
  data: function () {
    return {
      dashboardComponents: {
        ...CrudRegistry
      }
    }
  }

}
</script>

<style scoped>
@media (max-width: 700px) {
  .card-columns {
    column-count: 1;
  }
}

@media (min-width: 700px) {
  .card-columns {
    column-count: 2;
  }
}

@media (min-width: 1000px) {
  .card-columns {
    column-count: 3;
  }
}

@media (min-width: 1400px) {
  .card-columns {
    column-count: 4;
  }
}
</style>
