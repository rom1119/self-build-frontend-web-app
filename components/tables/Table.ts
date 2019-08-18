import {Vue, Watch, Prop} from 'vue-property-decorator'

export type TableHeader = {
  text: string
  value?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  class?: string[] | string
  width?: string
}

export type Pagination = {
  descending: boolean,
  page: number,
  rowsPerPage: number,
  totalItems: number,
  sortBy?: string
}

export default abstract class Table<ItemType> extends Vue {
  tableLoading: boolean = false
  abstract storeFetchEndpoint: string
    abstract paramId: number

  totalItems: number = 0
  pagination: Pagination = {
    descending: false,
    page: 1,
    rowsPerPage: 5,
    totalItems: 0,
    sortBy: undefined
  }

  abstract get headers(): TableHeader[]

  items: ItemType[] = []

  @Watch('pagination', {deep: false, immediate: true})
  async fetchItems() {
    console.log(this.pagination)
    this.tableLoading = true
    let response = await this.$store.dispatch(this.storeFetchEndpoint, {
      paginator: {
        page: this.pagination.page,
        items_per_page: this.pagination.rowsPerPage
      },
      order: {
        order_by: this.pagination.sortBy,
        order_type: this.pagination.descending? 'DESC' : 'ASC'
      },
      paramId: this.paramId
    })
    this.tableLoading = false

    this.totalItems = parseInt(response.total_items)
    this.items = response.data
  }

  removeFromItems(item: ItemType) {
    this.items = this.items.filter(i => i !== item)
  }
}
