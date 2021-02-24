<template>
  <div class="card dashboard-element">
    <div class="card-header">
      <div class="summary-card-item__heading">
        <div class="icon">
          <i class="fa" :class="`fa-${schema.icon}`">

          </i>
        </div>
        <div class="text">
          <router-link
            class="dashboard-element-header__link"
            :to="{
                name: 'TablePage',
                params: {
                  view: this.schema.assemblyName
                }
              }">
            {{ schema.title }}
          </router-link>
        </div>
      </div>
    </div>
    <ul class="list-group list-group-flush summary-card-item__items">
      <li v-for="(item, index) in list" :key="index" class="list-group-item with-text">{{ textFieldRenderer(item) }}
      </li>
      <li v-if="list.length < 1 " class="list-group-item">No records present</li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'DashboardElement',
  props: {
    schema: {
      type: Object
    }
  },
  methods: {
    textFieldRenderer (item) {
      const result = []
      this.schema.summary.data_properties.forEach((el) => {
        result.push(item[el])
      })
      return result.join(', ')
    }
  },
  computed: {
    list () {
      return this.$store.getters[`${this.schema.name}/summary`]
    },
    textField () {
      return this.schema.summary.data_properties[1]
    }
  },
  mounted () {
    this.$store.dispatch(`${this.schema.name}/fetchData`).then((res) => {
      console.log(res)
    })
  }

}
</script>

<style lang="scss" scoped>
.dashboard-element {
  .card-header {
    text-align: center;
  }

  .icon {
    font-size: 36px;
  }

  .text {
    font-weight: bold;
  }

  .list-group-item.with-text {
    font-size: 0.8em;
  }

  .list-group-item + .list-group-item {
    border-top: 1px solid #F5F5F5;
  }
  .dashboard-element-header__link{
    color: white;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
