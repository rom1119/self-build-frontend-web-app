<template>
    <div >
        <h5 v-if="valueProp">
            Edit project
        </h5>
        <h5 v-else>
            New project
        </h5>
       <div class="row justify-content-center content content--notch-bottom">
        <form class="col-4 form-login">
            

            <div class="form-row">
                <div class="form-group col-12">
                    <label for="inputEmail4">Name </label>
                    <input type="text" class="form-control" id="inputEmail4" v-model="value.name">
                    <span class="error" role="alert" v-if="value.nameError">
                        {{ value.nameError }}
                    </span>
                </div>
            </div>


            <div class="form-row mt-4">
                <div class="form-group col-12">
                    <button class="btn btn-primary w-100" @click.prevent="save">Save</button>
                </div>
                <div v-if="saveSuccess" class="form-group col-12">
                    <h3 v-if="valueProp" class="text-success">
                        Save success
                    </h3>
                    
                    <h3 v-else class="text-success">
                        Created new project successfull
                    </h3>
                </div>
            </div>

            
        </form>
    </div>


    </div>


</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import DomainToModel from '../src/Transformer/DomainToModel';
import ModelToDomain from '../src/Transformer/ModelToDomain';
import DefaultModelToDomain from '../src/Transformer/impl/DefaultModelToDomain';
import ProjectFrontendModel from '~/types/ProjectFrontendModel';

    @Component({
        'layout': 'dashboard-layout',
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class ProjectForm extends Vue {
        search = ''
        @Prop({required: false})
        valueProp: ProjectFrontendModel

        value: ProjectFrontendModel = new ProjectFrontendModel()
        saveSuccess = false
        storeSaveEndpoint = 'frontendProject/save'

        // @Watch('currentProvince')
        // async onCurrentProvince() {
        //     this.$loadingDialog.show()
        //     try {
        //         // this.communities = (await this.$axios.$get(`/units/province/${this.currentProvince.id}/communes/all`))
        //     } catch (e) {
        //         alert('Błąd pobierania')
        //     }
        //     this.$loadingDialog.hide()
        // }

        mounted()
        {
            if (this.valueProp) {
                this.value = this.valueProp
            } else {
                this.value = new ProjectFrontendModel()

            }

            // console.log('mounted FORM');
            // console.log(this.value);
            // console.log(this.valueProp);
            this.$loadingDialog.show()
            // let provinces = await this.$axios.$get('/units/provinces')
            // this.provinces = provinces
            this.$loadingDialog.hide()
        }

        async save() {
            this.saveSuccess = false
            try {
                var res = await this.$store.dispatch(this.storeSaveEndpoint, this.value)
                if (!this.valueProp) {
                    this.value = new ProjectFrontendModel()
                }
                this.saveSuccess = true
            } catch (e) {
                alert('Błąd pobierania')
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
