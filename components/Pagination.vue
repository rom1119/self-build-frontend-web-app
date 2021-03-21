<template>

        <div class="col-12 publications__pagination mt-4">
            <div class="row">
                <div class="col-auto">
                    <button v-if="pagination.page == 1" disabled class="btn btn-primary">Poprzednie</button>
                    <button v-else @click="pagination.page--" class="btn btn-primary">Poprzednie</button>
                </div>
                <div class="col-auto mx-auto">
                    <nav class="publications__pagination page-btn" aria-label="Page navigation example">
                        <ul class="pagination">
                            <template  v-for="paginationItem in pagination.pageCount">
                                <li
                                    class="page-item"
                                    :class="{'active': paginationItem == pagination.page}"
                                    :key="paginationItem"
                                    v-if="
                                                paginationItem == 1 ||
                                                 paginationItem == pagination.pageCount ||
                                                 paginationItem === pagination.page ||
                                                 (paginationItem > pagination.page && paginationItem < pagination.page + 3)||
                                                    (paginationItem < pagination.page  && paginationItem > pagination.page - 3)
                                                "
                                >
                                    <a class="page-link" @click="pagination.page = paginationItem">
                                        {{ paginationItem }}
                                    </a>
                                </li>
                                <span v-if="canShowLeftDots(paginationItem)"
                                      style="color: black; padding: 0 10px; line-height: 3;">
                                                ....
                                            </span>
                                <span v-if="canShowRightDots(paginationItem)
                                                        "
                                      style="color: black; padding: 0 10px; line-height: 3;">
                                                ....
                                            </span>
                            </template>

                        </ul>
                    </nav>
                </div>
                <div class="col-auto">
                    <label >Ilość na stronie</label>
                    <select v-model="pagination.itemsPerPage" id="itemsPerPage">
                        <option v-for="item in availableItemPerPage" :value="item" >
                            {{ item }}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <button v-if="pagination.page == pagination.pageCount" disabled class="btn btn-primary page-btn">Następne</button>
                    <button v-else @click="pagination.page++" class="btn btn-primary page-btn">Następne</button>
                </div>
            </div>

        </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";


    @Component({
        components: {
        }
    })
    export default class PaginationComponent extends Vue {
        pagination: Pagination = {
            descending: false,
            page: 0,
            pageCount: 0,
            itemsPerPage: 5,
            totalItems: 0,
            search: null,
            items: [],
            sortBy: undefined
        }

        timeout
        loading

        availableItemPerPage = [1,2,5,10,15,20]

        @Prop({default: null, required: true})
        storeFetchEndpoint: string

        @Prop({default: null, required: true})
        search: string

        async mounted()
        {
            this.$loadingDialog.show()
            await this.fetchItems()
            this.$loadingDialog.hide()
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
            // console.log(e);
            
            this.$loadingDialog.show()
            await this.fetchItems()
            this.$loadingDialog.hide()
        }

        @Watch('pagination.itemsPerPage', {deep: false, immediate: false})
        async onItemsPerPageChange(e)
        {
            // console.log(e);

            this.$loadingDialog.show()
            await this.fetchItems()
            this.$loadingDialog.hide()
        }

        @Watch('search', {deep: false, immediate: false})
        onMapLoaded(search){
            if (this.loading) return
            // console.log(a)
            clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                this.$loadingDialog.show()
                await this.fetchItems()
                this.$loadingDialog.hide()
            }, 700)
        }

        canShowRightDots(paginationItem)
        {
            return (
                Math.floor((this.pagination.pageCount + this.pagination.page) / 2) + 1 == paginationItem &&
                this.pagination.page <= (this.pagination.pageCount - 4)
            )
        }

        canShowLeftDots(paginationItem)
        {
            return (
                Math.floor((1 + this.pagination.page) / 2) - 1 == paginationItem
            ) && this.pagination.page > 4

        }


        async fetchItems() {
            // console.log(this.pagination)
            // this.$loadingDialog.show()

            let response = await this.$store.dispatch(this.storeFetchEndpoint, {
                paginator: {
                    page: this.pagination.page,
                    size: this.pagination.itemsPerPage
                },
                order: {
                    order_by: this.pagination.sortBy,
                    order_type: this.pagination.descending? 'DESC' : 'ASC'
                },
                search: this.search
            })

            let items = response.data
            // console.log(items);
            
            this.reInitPagination(response)
            this.$emit('loadData', items)
            // console.log(this.pagination)

            // this.$loadingDialog.hide()
        }

        private reInitPagination(responseData)
        {
            this.pagination.pageCount = parseInt(responseData.pagesCount)
            this.pagination.page = parseInt(responseData.pageNumber)
            this.pagination.totalItems = parseInt(responseData.totalItemsCount)
            this.pagination.itemsPerPage = parseInt(responseData.pageSize)
            this.pagination.items = responseData.items
        }


    }
</script>

<style lang="scss">
    .vuecal {
        border-radius: 25px;
    }

    /*.vuecal--month-view .vuecal__cell {*/
    /*    height: 80px;*/
    /*}*/

    .vuecal--month-view .vuecal__cell-content {
        justify-content: flex-start;
        height: 100%;
        align-items: flex-end;
    }

    .vuecal--month-view .vuecal__cell-date {
        padding: 4px;
    }

    .vuecal--month-view .vuecal__no-event {
        display: none;
    }

    .vuecal__title-bar {
        background: none;
        padding-top: 25px;
        padding-bottom: 25px;

        &_month-name {
            font-size: 38px;
            color: #001957;
            font-family: "DM Serif Display", serif;
            line-height: 1;
        }

        &_year-name {
            font-size: 13px;
            color: #001957;
            line-height: 1;
        }
    }

    .vuecal__cell:before {
        border: none;
        border-right: 1px solid #D5DDE5;
        border-top: 1px solid #D5DDE5;
    }

    .vuecal__cell:nth-child(5n):before {
        border-right: none;
    }

    .vuecal__heading {
        position: relative;

        &:before, &:after {
            position: absolute;

            top: 0;
            height: 100%;
            width: 1px;
            background: #D5DDE5;
        }

        &:nth-child(2), &:nth-child(3) {
            &:before {
                left: 0;
                content: '';
            }
        }

        &:nth-child(3), &:nth-child(4) {
            &:after {
                right: 0;
                content: '';
            }
        }
    }
</style>
