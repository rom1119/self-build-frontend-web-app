<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="my-modal" id="modal">
        <div class=" my-modal__header">
            <slot name="header" />
        </div>
        <div class="my-modal__content">
            <slot name="content" />
        </div>
        <div class="my-modal__footer">
            <slot name="footer" />
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";


    @Component
    export default class BaseModal extends Vue {
        pagination: Pagination = {
            descending: false,
            page: 1,
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

        idName = 'base-modal'

        

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss">
    
</style>
