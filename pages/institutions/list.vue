<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>


        <div class="content content--bg mt-5">
            <div class="row">
                <div class="col-12">
                    <table class="publications__table w-100">

                        <tbody>
                        <template
                            v-for="el in items"
                        >
                            <tr
                                :key="el.hashCode"
                            >
                                <td >
                                    <div ><img :src="el.logo" width="60" height="60" alt=""></div>
                                </td>
                                <td >
                                    <div class="publication-name">{{ el.name }}</div>
                                    <!--                                    <div v-if="publication.institution" class="publication-institution">-->
                                    <!--                                        <nuxt-link :to="`/institution/${publication.institution.id}`">{{-->
                                    <!--                                            publication.institution.name }}-->
                                    <!--                                        </nuxt-link>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div v-else class="publication-institution">Brak instytucji</div>-->

                                </td>
                                <td>
                                    <template v-if="el.location">
<!--                                        <p>{{ el.location.level_name }}</p>-->
                                        <p>{{ el.location.name }}</p>
                                    </template>
                                    <p v-else>Brak</p>

                                </td>
                                <td v-if="el.amountPublications == 1">{{ el.amountPublications }} Publikacja</td>
                                <td v-else-if="el.amountPublications > 1 && el.amountPublications < 5">{{ el.amountPublications }} Publikacje</td>
                                <td v-else>{{ el.amountPublications }} Publikacji</td>
                                <td>

                                    <nuxt-link tag="a" class="btn btn-primary"  :to="{ name: 'institutions-id', params: { id: el.id }}">
                                        Szczegóły
                                    </nuxt-link>

                                </td>
<!--                                <td>-->
<!--                                    {{ el.category ? el.category.name :-->
<!--                                    'Brak danych' }}-->
<!--                                </td>-->
<!--                                <td>{{ el.publicationDate ? el.publicationDate : 'Brak danych' }}</td>-->
<!--                                <td>Woj. Mazowieckie</td>-->
                            </tr>

                            <tr class="spacer"></tr>
                        </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <pagination-component
            :storeFetchEndpoint="storeFetchEndpoint"
            :search="search"
            @loadData="fetchItems"
        >

        </pagination-component>


    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";


    @Component
    export default class PublicationsPage extends Vue {
        tags: any[] = []
        selectedTags: any = null
        items: any[] = []
        publicationsLoading: boolean = true
        calendar: boolean = false
        @Prop({default: '', required: false})
        search


        storeFetchEndpoint: string = 'institutions/findAllByPaginate'

        async mounted()
        {
            // this.$loadingDialog.show()
            // this.tags = await this.$axios.$get('/events/tags/all')
            // this.$loadingDialog.hide()
        }





        async fetchItems(data) {
            this.items = data

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
