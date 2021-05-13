<template>
    <div >
        
        <project-form :valueProp="value" />

    </div>


</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'

import ProjectFrontendModel from '~/types/ProjectFrontendModel';
import ProjectForm from '../../../components/ProjectForm.vue';

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
        search = ''
        value: ProjectFrontendModel = null
        storeFetchEndpoint = 'frontendProject/findOne'

        @Watch('currentProvince')
        async onCurrentProvince() {
            
        }


        async mounted()
        {
            // this.$loadingDialog.show()
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
