<template>
  <dashboard>
    <div class="card table-page">
      <h5 class="card-header"><i :class="`fa fa-${icon}`"/> {{ title }}</h5>

      <div class="card-body">
        <div class="content-field">
          <b-table
            head-variant="dark"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isDescending"
            :fields="fields"
            :items="filtered"
            :filter="filter"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <template slot="top-row" slot-scope="{ fields }">
              <td v-for="(field,index) in fields" :key="index">
                <b-form-input v-if="filters.hasOwnProperty(field.key)"
                              sm="12" md="6" lg="4"
                              v-model="filters[field.key]"
                              @change="refreshFilters"
                              type="search"
                              id="filterInput"
                              :placeholder="field.label"
                ></b-form-input>
              </td>
            </template>
            <template v-slot:cell(actions)="data">
              <b-button @click="deleteObject =  data.item" class="action-button" v-bind="data.item">
                <i class="fa fa-trash"></i>
              </b-button>
              <b-button @click="editObject = data.item" class="action-button" v-bind="data.item">
                <i class="fa fa-edit"></i>
              </b-button>
            </template>

          </b-table>
          <b-row>
            <b-col sm="6" class="formula-page__entities">
              Show
              <b-form-select class="formula-page__entities-block" v-model="perPage" :options="perPageOptions"/>
              Entries
            </b-col>
            <b-col sm="6">
              <b-pagination
                v-model="currentPage"
                :total-rows="filtered.length"
                :per-page="perPage"
                aria-controls="formula-page__table"
                align="right"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
        <div class="instrument-field" v-if="showInstrument" :class="{visible: showInstrument}">
          <b-card-group deck>
            <b-card
              border-variant="primary"
              :header="editOrCreate"
              header-bg-variant="primary"
              header-text-variant="white"
              align="left"
            >
               <edit-or-create :item="editObject" :schema="pageSchema"/>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </div>
    <b-modal
      id="confirm-record-delete"
      modal-title="Confirm Delete"
      v-model="showDeleteModal"
      modal-ok
      modal-cancel
      modal-header-close
      @ok="removeOk"
    >
      You want to remove data. Are you sure?
    </b-modal>

  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import CrudRegistry from '@/schema/schema_register'
import EditOrCreate from '@/components/Tools/EditOrCreate'

export default {

  name: 'TablePage',
  components: { EditOrCreate, Dashboard },
  data () {
    return {
      pageSchema: {},
      records: [],
      isDescending: false,
      sortBy: '',
      perPageOptions: [
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 }
      ],
      filter: '',
      filters: {},
      currentPage: 1,
      perPage: 10,
      resetCalc: 0,
      deleteObject: null,
      editObject: null
    }
  },
  mounted () {
    this.refreshSchema()
    this.dataLoad()
  },
  methods: {
    refreshSchema () {
      this.pageSchema = CrudRegistry[this.$route.params.view]
      const obj = {}

      this.pageSchema.summary.data_properties.forEach(el => {
        obj[el] = ''
      })
      this.filters = obj
    },

    dataLoad () {
      this.$store.dispatch(`${this.pageSchema.name}/fetchData`).then((res) => {
        console.log(res)
      })
    },

    refreshFilters () {
      this.resetCalc = Math.random()
    },

    removeOk () {
      this.$store.dispatch(
        `${this.pageSchema.name}/deleteEntity`,
        {
          id: this.deleteObject.id
        }).then((el) => {
        this.deleteObject = null
      })
    }
  },
  computed: {
    showDeleteModal: {
      get: function () {
        return this.deleteObject !== null
      },
      set: function () {

      }
    },

    showInstrument: {
      get: function () {
        return this.editObject !== null
      }

    },
    editOrCreate () {
      if (this.editObject && this.editObject.id) {
        return 'Edit Record'
      }
      return 'Create Record'
    },
    list () {
      return this.$store.getters[`${this.pageSchema.name}/summary`]
    },
    title () {
      return this.pageSchema.title
    },
    icon () {
      return this.pageSchema.icon
    },
    fields () {
      const headers = this.pageSchema.summary ? this.pageSchema.summary.headers : []
      let i = 0
      const result = headers.map((el) => {
        i++
        return {
          label: el,
          key: this.pageSchema.summary.data_properties[i - 1],
          sortable: true
        }
      })
      result.push({
        sortable: false,
        label: 'Actions',
        key: 'actions'
      })
      return result
    },
    filtered () {
      if (!this.list ||
      !this.filters) {
        return []
      }
      const filtered = this.list.filter(item => {
        return Object.keys(this.filters).every((key) => {
          return String(item[key]).toUpperCase().includes(this.filters[key].toUpperCase())
        })
      })
      return filtered.length > 0 ? filtered : []
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

<style lang="scss" scoped>
.table-page {
  .card-body {
    display: flex;
    flex-direction: row;
  }

  .content-field {
    flex-grow: 1;
  }

  .instrument-field {
    min-width: 350px;
    display: none;
    padding: 10px;
  }

  .instrument-field.visible {
    display: block;
  }
}

.formula-page {
  &__table {
    margin-top: 20px;
  }

  &__entities {
    display: flex;
    align-items: baseline;
    align-content: center;

    &-block {
      width: 70px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}

.action-button {
  margin: 5px;
}
</style>
