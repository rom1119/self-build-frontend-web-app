<template>
    <div >
        <form @submit.prevent="loadWebsite">
            <input type="text" v-model="url" name="websiteUrl" id="websiteUrl">
            <button >
                Load website to project
            </button>
        
        </form>

    </div>


</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
import DomainToModel from '../../../../src/Transformer/DomainToModel';
import ModelToDomain from '../../../../src/Transformer/ModelToDomain';
import DefaultModelToDomain from '../../../../src/Transformer/impl/DefaultModelToDomain';
import ProjectForm from '../../../../components/ProjectForm.vue';
import ProjectFrontendModel from '~/types/ProjectFrontendModel';

    @Component({
        'layout': 'dashboard-layout',
        components: {
            ProjectForm
        }
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class EditFrontendProjectPage extends Vue {
        url = ''
        value: ProjectFrontendModel = null
        storeFetchEndpoint = 'frontendProject/findOne'

        @Watch('currentProvince')
        async onCurrentProvince() {
            
        }

        async loadWebsite() {
            var res = await this.$axios.$get(`/api/html-project/import-website?url=${this.url}`)


            return res
        }


        async mounted()
        {
            this.$loadingDialog.show()
            // try {
            //     var res = await this.$store.dispatch(this.storeFetchEndpoint, this.$route.params.id)
            //     this.value = res.model
            // } catch (e) {
            //     alert('Błąd pobierania')
            // }

            // console.log('MPLPL');
            // console.log(this.value);
            this.$loadingDialog.hide()
        }

        goToReport() {
            // this.$router.push(`/report-new?commune=${this.currentCommune.id}&year=${this.currentYear.name}`)
        }
    }

</script>

<style lang="scss" scoped>

</style>
