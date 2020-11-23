<template>
  <div class="view-record">
    <div style="padding-bottom: 10px" v-for="(item,index) in schema.detail.fields" :key="index">
      <h5 :for="item.data_property">{{ item.label }}</h5>
      <div v-html="fields[item.data_property]"/>
    </div>
    <div class="actions">
      <b-button
        @click="$emit('edit-start',{data: fields, schema: schema})"
        class="button" variant="primary" align="right">
        Edit
      </b-button>
      <b-button @click="$emit('close-edit')" class="button" variant="primary" align="right">
        Close
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewRecord',
  props: {
    item: {
      type: Object,
      default: () => {
      }
    },
    schema: {
      type: Object
    }
  },
  data () {
    if (this.item.id) {
      this.$qewd.send({
        type: this.schema.summary.qewd.getDetail,
        params: {
          id: this.item.id
        }
      }, (el) => {
        console.log(el)
        this.fields = el.message.record
      })
    }
    return {
      fields: this.item
    }
  },
  watch: {
    item (from, to) {
      console.log(to)
      if (from.id) {
        this.$qewd.send({
          type: this.schema.summary.qewd.getDetail,
          params: {
            id: from.id
          }
        }, (el) => {
          this.fields = el.message.record
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-record {
  .button {
    margin: 5px;
  }
}
</style>
