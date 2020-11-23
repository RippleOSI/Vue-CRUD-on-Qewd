<template>
      <div class="card dashboard-element">
        <div class="card-header">
          <div class="summary-card-item__heading">
            <div class="icon">
              <i class="fa" :class="`fa-${schema.icon}`">

              </i>
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

<style lang="scss" scoped>
.dashboard-element {
  .card-header{
      text-align: center;
  }
  .icon{
    font-size: 36px;
  }
  .text{
    font-weight: bold;
  }
}
</style>
