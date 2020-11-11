<template>
  <dashboard>
    <b-table
      :fields="pageSchema.headers"
      :items="list"
    >

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
    },

    dataLoad () {
      this.$store.dispatch(`${this.pageSchema.name}/fetchData`).then((res) => {
        console.log(res)
      })
    }

  },
  computed: {
    list () {
      return this.$store.getters[`${this.pageSchema.name}/summary`]
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
