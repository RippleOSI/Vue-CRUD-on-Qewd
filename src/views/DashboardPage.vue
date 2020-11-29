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
import DashboardElement from '@/components/Dashboard/DashboardElement'
import { allergiesPageState } from '@/schema/allergies_page_state'
import { contactsPageState } from '@/schema/contacts_page_state'
import { diagnosisPageState } from '@/schema/diagnosis_page_state'
import { eventsPageState } from '@/schema/events_page_state'
import { medicationsPageState } from '@/schema/medications_page_state'

import { vaccinationsPageState } from '@/schema/vaccinations_page_state'
import { vitalsPageState } from '@/schema/vitals_page_state'

export default {
  name: 'DashboardPage',
  components: { DashboardElement, Dashboard },
  data: function () {
    return {
      dashboardComponents: {
        allergiesPageState,
        contactsPageState,
        diagnosisPageState,
        eventsPageState,
        medicationsPageState,
        vaccinationsPageState,
        vitalsPageState
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
