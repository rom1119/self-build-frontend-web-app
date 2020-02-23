<template>
    <div >
        <h1>Stworzone Layouty</h1>


        <div class="content content--bg mt-5">
            <div class="row">
                <div class="col-12">
                    <table class="publications__table w-100">

                        <tbody>
                        <template
                            v-for="el in items"
                        >
                            <tr
                                :key="el.id"
                            >
                                <td >
                                    <div class="publication-name">{{ el.id }}</div>
                                </td>
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

                                    <nuxt-link tag="a" class="btn btn-primary"  :to="{ name: 'dashboard-layout-creator-id', params: { id: el.id }}">
                                        Otwórz projekt
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
    import {Component, Vue, Watch} from 'vue-property-decorator'
import DomainToModel from '../../src/Transformer/DomainToModel';
import ModelToDomain from '../../src/Transformer/ModelToDomain';
import DefaultModelToDomain from '../../src/Transformer/impl/DefaultModelToDomain';

    @Component({
        'layout': 'dashboard-layout',
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class LayoutCreatorPage extends Vue {
        search = ''
        items: any[] = []
        storeFetchEndpoint = 'frontendProject/findAll'

        @Watch('currentProvince')
        async onCurrentProvince() {
            this.$loadingDialog.show()
            try {
                // this.communities = (await this.$axios.$get(`/units/province/${this.currentProvince.id}/communes/all`))
            } catch (e) {
                alert('Błąd pobierania')
            }
            this.$loadingDialog.hide()
        }

        async fetchItems(data) {
            this.items = data

        }

        async mounted()
        {
            this.$loadingDialog.show()
            // let provinces = await this.$axios.$get('/units/provinces')
            // this.provinces = provinces
            this.$loadingDialog.hide()
        }

        goToReport() {
            // this.$router.push(`/report-new?commune=${this.currentCommune.id}&year=${this.currentYear.name}`)
        }
    }

</script>

<style lang="scss" scoped>

</style>
