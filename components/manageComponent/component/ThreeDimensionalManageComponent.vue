<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
  

            <div class="content-item" @dblclick="hasFontWeight = !hasFontWeight" :class="{'active': hasFontWeight}">
                <h4 class="content-item__header">
                    Waga czcionki
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in fontWeights" :key="el">
                        <label :for="'fontWeight-' + el">
                            {{ el }}
                            <input type="radio" v-model="fontWeight" :value="el" name="fontWeight" :id="'fontWeight-' + el">

                        </label>
                    </li>
                </ul>
            </div>

            
        </div>
   </div>
</template>

<script lang="ts">
    import {Component, Watch, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import TextAlign from '../../../src/Css/Text/TextAlign';
    import FontWeight from '../../../src/Css/Text/FontWeight';
    import UnitSize from '~/src/Unit/UnitSize';
    import EM from '~/src/Unit/Size/EM';
    import FontSize from '../../../src/Css/Text/FontSize';
    import { RGBA } from '~/src/Unit';
    import { Chrome }  from '~/node_modules/vue-color';
import { FontStyle } from '../../../src/Css';
import FontStretch from '../../../src/Css/Text/FontStretch';
import FontFamilyValDomain from '~/src/Fonts/FontFamilyValDomain';
import FontManage from '../FontManage';
import ThreeDimensionalManage from '../ThreeDimensionalManage';

    @Component({
        components: {
            Chrome
        }
    })
    export default class ThreeDimensionalManageComponent extends ThreeDimensionalManage {

        @Prop({default: null, required: true})
        activeTag
        
        @Prop({default: false, required: false})
        autoUpdate

        @Watch('activeTag')
        updateTag() {
            //   console.log('TextManagComponent updated');
            //   console.log(this.activeTag);
            this.onInitTag()
        }

        onInitTag(){
            if (this.activeTag) {
                this.setAutoSave(this.autoUpdate)
                this.init(this.activeTag)
            } else {
            }
        }

        timeout
        // value: HtmlTag
        DEFAULT_FONT_SIZE = 20
        DEFAULT_FONT_SIZE_UNIT = new EM()
        fontSizeData = new FontSize(this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE_UNIT)

        cmNameFontSize = Math.floor(Math.random() * 1000000000).toString() + 'font-size'
        cmNameLineHeight = Math.floor(Math.random() * 1000000000).toString() + 'line-height'

        textAligns: string[] = TextAlign.getAccessableProperty()

        // currentActiveTag: HtmlTag
        

        pickerActive = false
        units: UnitSize[] = []

        idName = 'text-property-modal'

        color: any = {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        }

        mounted()
        {
            this.onInitTag()

            // console.log(this.contextMenuName);
         

        }

        created()
        {

        }

        // *****************************************  FONT-WEIGHT ****************************************************

        get fontWeight()
        {
            return  this.fontWeightManager.getProperty().blankValue
        }

        set fontWeight(newVal)
        {
            this.fontWeightManager.getProperty().setValue(newVal)
            this.fontWeightManager.updateCssProp(this.fontWeightManager.getProperty())
        }

        get hasFontWeight()
        {
            return  this.fontWeightManager.getProperty().active
        }

        set hasFontWeight(newVal: boolean)
        {
            if (!newVal) {
                this.fontWeightManager.deactivePropCss(this.fontWeightManager.getProperty())
            } else {
                this.fontWeightManager.activePropCss(this.fontWeightManager.getProperty())
            }
        }


        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {

        }


    }
</script>

<style lang="scss" scoped>
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
</style>
