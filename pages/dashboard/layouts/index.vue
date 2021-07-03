<template>
    <div >
        <h1>Created Layouts</h1>

        <div class="row">
            <div class="col-12 d-flex justify-content__end">
                <nuxt-link tag="button" class="btn btn-primary pull-right"  :to="{ name: 'dashboard-layouts-new'}">
                    New project
                </nuxt-link>
            </div>
        </div>

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
                                        Open project
                                    </nuxt-link>
                                    
                                    <nuxt-link tag="a" class="btn btn-primary"  :to="{ name: 'dashboard-layouts-edit-id', params: { id: el.id }}">
                                        Edit
                                    </nuxt-link>
                                    
                                    <nuxt-link tag="a" class="btn btn-primary"  :to="{ name: 'dashboard-layouts-actions-id', params: { id: el.id }}">
                                        Actions
                                    </nuxt-link>
                                    
                                    <button @click="deleteItem(el)" class="btn btn-primary"  >
                                        Remove
                                    </button>

                                </td>
<!--                                <td>-->
<!--                                    {{ el.category ? el.category.name :-->
<!--                                    'Brak danych' }}-->
<!--                                </td>-->
<!--                                <td>{{ el.publicationDate ? el.publicationDate : 'Brak danych' }}</td>-->
<!--                                <td>Woj. Mazowieckie</td>-->
                            </tr>

                            <!-- <tr class="spacer"></tr> -->
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
import DomainToModel from '../../../src/Transformer/DomainToModel';
import ModelToDomain from '../../../src/Transformer/ModelToDomain';
import DefaultModelToDomain from '../../../src/Transformer/impl/DefaultModelToDomain';
import ProjectFrontendModel from '~/types/ProjectFrontendModel';

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
        storeDeleteEndpoint = 'frontendProject/delete'

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
        async deleteItem(project: ProjectFrontendModel) {
            try {
                var res = await this.$store.dispatch(this.storeDeleteEndpoint, project)
                var keyToRemove
                for (const key in this.items) {
                    var el = this.items[key]
                    if (el.id === project.id) {
                        keyToRemove = key
                    }
                }
                if (keyToRemove != null) {
                    this.items.splice(keyToRemove, 1)
                }
            } catch (e) {
                alert('Błąd usuwania')
            }
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
