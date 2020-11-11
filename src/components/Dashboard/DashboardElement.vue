<template>
      <div class="card">
        <div class="card-header">
          <div class="summary-card-item__heading">
            <div class="icon">
              <b-icon class="fa" :class="`fa-${schema.icon}`">

              </b-icon>
            </div>
            <div class="text">
                {{schema.title}}
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush summary-card-item__items">
          <li class="list-group-item">No records present</li>

        </ul>
      </div>
</template>

<script>
export default {
  name: 'DashboardElement',
  computed: {
    list () {
      return this.$store.getters(`${this.schema.name}/summary`)
    }
  },
  mounted () {
    this.$store.dispatch(`${this.schema.name}/fetchData`).then((res) => {
      console.log(res)
    })
  },
  props: {
    schema: {
      type: Object
    }
  }

}
</script>

<style scoped>

</style>
