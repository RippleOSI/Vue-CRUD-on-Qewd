<template>
  <div class="edit-or-create">
    <div v-for="(item,index) in schema.detail.fields" :key="index">
      <label :for="item.data_property">{{item.label}}</label>
      <component :is="normalizeComponent(item).is"
                 v-bind="normalizeComponent(item)"
                 :id="item.data_property"
                 v-model="fields[item.data_property]"
                 class="mb-2"
      ></component>
    </div>
    <div class="actions">
      <b-button
        @click="$emit('save',{data: fields, schema: schema})"
        class="button" variant="primary" align="right">
        Save
      </b-button>
      <b-button @click="$emit('close-edit')" class="button" variant="primary" align="right">
        Close
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditOrCreate',
  props: {
    item: {
      type: Object,
      default: () => {}
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
  },
  methods: {
    normalizeComponent (fieldObject) {
      let is = ''
      const special = {}
      switch (fieldObject.type) {
        case 'text':
          is = 'b-input'
          break
        case 'textarea':
          is = 'b-form-textarea'
          break
        case 'date':
          is = 'b-form-datepicker'
          break
        case 'select':
          is = 'b-select'
          break
        case 'range':
          is = 'b-form-input'
          special.type = 'range'
          break
        case 'multiselect':
          is = 'b-form-select'
          special.multiple = true
      }

      return {
        is: is,
        ...special,
        ...fieldObject
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-or-create{
    .actions{
      .button {
        margin: 5px;
      }
    }
  }
</style>
