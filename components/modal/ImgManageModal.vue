<template>

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Image
            </h4>
        </template>
        <template slot="content">
            <img-manage-component ref="manageComponent" :activeTag="value" /> 
            
        </template>
        <template slot="footer">
            <button class="to-left" @click="restore($event)">
                Przywróć
            </button>
            <button class="to-right">
                Zapisz
            </button>
        </template>
    </base-modal>

</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import HtmlTag from '../../src/Layout/HtmlTag';
    import AbstractModal from '../AbstractModal';
import ImgManageComponent from '../manageComponent/component/ImgManageComponent.vue';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component
    export default class ImgManageModal extends AbstractModal {
        
       $refs: {
            manageComponent: ImgManageComponent

        }

        mounted() {
            // this.$refs.manageComponent = null
        }
        onChangePseudoSelector()
        {
            this.$refs.manageComponent.onChangePseudoSelector()
        }

        show(currentActiveTag: HtmlTag){
            super.show(currentActiveTag, this.$refs.manageComponent)
            this.$refs.manageComponent.init(currentActiveTag)
        }


    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
</style>
