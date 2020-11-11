<template>
  <dashboard>
    <b-table>

    </b-table>
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import CrudRegistry from '@/schema/schema_register'

export default {

  name: 'TablePage',
  components: { Dashboard },
  data () {
    return {
      pageSchema: {},
      records: []
    }
  },
  mounted () {
    this.refreshSchema()
    this.dataLoad()
  },
  methods: {
    refreshSchema () {
      this.pageSchema = CrudRegistry[this.$route.params.view]
      console.log(this.pageSchema)
    },

    dataLoad () {
      this.$qewd.send({
        type: this.pageSchema.summary.qewd.getSummary,
        params: {
          properties: this.pageSchema.summary.data_properties
        }
      }, (reply) => {
        console.log(reply)
      })
    }

  },
  watch: {
    $route (from, to) {
      this.refreshSchema()
      this.dataLoad()
    }
  }
}
</script>

<style scoped>

</style>
