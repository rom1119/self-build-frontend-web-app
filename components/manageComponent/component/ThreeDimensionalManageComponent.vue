<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
            <div class="content-item__elem_container">
                <div class="content-item-half-and-quarter d-flex">
                
                    <div class="content-item-half" @dblclick="hasTransformStyle = !hasTransformStyle" :class="{'active': hasTransformStyle}">
                        <h4 class="content-item__header">
                            Transform Style
                        </h4>
                        <ul class=" content-item__elem_container m-0">
                            <li class="content-item__elem" v-for="el in transformStyleList" :key="el">
                                <label :for="'transformStyle-' + el">
                                    {{ el }}
                                    <input type="radio" v-model="transformStyle" :value="el" name="transformStyle" :id="'transformStyle-' + el">

                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="content-item-half" @dblclick="hasBackfaceVisibility = !hasBackfaceVisibility" :class="{'active': hasBackfaceVisibility}">
                        <h4 class="content-item__header">
                            Backface Visibility
                        </h4>
                        <ul class=" content-item__elem_container m-0">
                            <li class="content-item__elem" v-for="el in backfaceVisibilityList" :key="el">
                                <label :for="'backfaceVisibility-' + el">
                                    {{ el }}
                                    <input type="radio" v-model="backfaceVisibility" :value="el" name="backfaceVisibility" :id="'backfaceVisibility-' + el">

                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="content-item-quarter" @dblclick="hasPerspective = !hasPerspective" :class="{'active': hasPerspective}">
                    <div>
                        <h4 class="content-item__header">
                            Perspective
                        </h4>
                        <div class="content-item__elem"
                                v-context-menu="cmNamePerspective"
                            >
                            <select-unit-context-menu :propertyUnit="perspectiveUnit" @changePropUnit="($event) => {perspectiveUnit = $event;}" :ref="cmNamePerspective" />

                            <label :for="'perspective-'">

                                <input @dblclick.stop.prevent="" type="number" style="width: 60px;" step=".01" class="input-text" v-model="perspective" name="perspective" :id="'perspective-'">
                                {{ perspectiveUnit.label }}
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            
            <div class="content-item__elem_container" @dblclick="hasPerspectiveOrigin = !hasPerspectiveOrigin" :class="{'active': hasPerspectiveOrigin}">
                <css-two-axis-component :value="perspectiveOrigin" @change="perspectiveOriginManager.updateCssProp(perspectiveOriginManager.getProperty())" />
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
    import CssTwoAxisComponent from '~/components/modal/AxisCss/CssTwoAxisComponent.vue';
    import FontSize from '../../../src/Css/Text/FontSize';
    import { RGBA } from '~/src/Unit';
    import { Chrome }  from '~/node_modules/vue-color';
import FontStretch from '../../../src/Css/Text/FontStretch';
import FontFamilyValDomain from '~/src/Fonts/FontFamilyValDomain';
import FontManage from '../FontManage';
import ThreeDimensionalManage from '../ThreeDimensionalManage';
import TransformStyle from '~/src/Css/ThreeDimensional/TransformStyle';
import BackfaceVisibility from '../../../src/Css/ThreeDimensional/BackfaceVisibility';

    @Component({
        components: {
            Chrome, CssTwoAxisComponent
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

        cmNamePerspective = Math.floor(Math.random() * 1000000000).toString() + 'perspective'
        cmNameLineHeight = Math.floor(Math.random() * 1000000000).toString() + 'line-height'

        transformStyleList: string[] = TransformStyle.getAccessableProperty()
        backfaceVisibilityList: string[] = BackfaceVisibility.getAccessableProperty()

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

        // *****************************************  TRANSFORM-STYLE ****************************************************

        get transformStyle()
        {
            return  this.transformStyleManager.getProperty().blankValue
        }

        set transformStyle(newVal)
        {
            this.transformStyleManager.getProperty().setValue(newVal)
            this.transformStyleManager.updateCssProp(this.transformStyleManager.getProperty())
        }

        get hasTransformStyle()
        {
            return  this.transformStyleManager.getProperty().active
        }

        set hasTransformStyle(newVal: boolean)
        {
            if (!newVal) {
                this.transformStyleManager.deactivePropCss(this.transformStyleManager.getProperty())
            } else {
                this.transformStyleManager.activePropCss(this.transformStyleManager.getProperty())
            }
        }

        // *****************************************  BACKFACE-VISIBILITY ****************************************************

        get backfaceVisibility()
        {
            return  this.backfaceVisibilityManager.getProperty().blankValue
        }

        set backfaceVisibility(newVal)
        {
            this.backfaceVisibilityManager.getProperty().setValue(newVal)
            this.backfaceVisibilityManager.updateCssProp(this.backfaceVisibilityManager.getProperty())
        }

        get hasBackfaceVisibility()
        {
            return  this.backfaceVisibilityManager.getProperty().active
        }

        set hasBackfaceVisibility(newVal: boolean)
        {
            if (!newVal) {
                this.backfaceVisibilityManager.deactivePropCss(this.backfaceVisibilityManager.getProperty())
            } else {
                this.backfaceVisibilityManager.activePropCss(this.backfaceVisibilityManager.getProperty())
            }
        }
        
        // *****************************************  PERSPECTIVE ****************************************************

        get perspective()
        {
            return  this.perspectiveManager.getProperty().blankValue
        }

        set perspective(newVal)
        {
            this.perspectiveManager.getProperty().setValue(newVal)
            this.perspectiveManager.updateCssProp(this.perspectiveManager.getProperty())
        }

        get perspectiveUnit()
        {
            return  this.perspectiveManager.getProperty().getUnit()
        }

        set perspectiveUnit(newVal: UnitSize)
        {
            this.perspectiveManager.getProperty().setUnit(newVal)
            this.perspectiveManager.updateCssProp(this.perspectiveManager.getProperty())
        }

        get hasPerspective()
        {
            return  this.perspectiveManager.getProperty().active
        }

        set hasPerspective(newVal: boolean)
        {
            if (!newVal) {
                this.perspectiveManager.deactivePropCss(this.perspectiveManager.getProperty())
            } else {
                this.perspectiveManager.activePropCss(this.perspectiveManager.getProperty())
            }
        }

        // *****************************************  PERSPECTIVE-ORIGIN ****************************************************

        get perspectiveOrigin()
        {
            return  this.perspectiveOriginManager.getProperty()
        }

        // set perspectiveOrigin(newVal)
        // {
        //     this.perspectiveOriginManager.getProperty().setValue(newVal)
        //     this.perspectiveOriginManager.updateCssProp(this.perspectiveOriginManager.getProperty())
        // }

        // get perspectiveUnit()
        // {
        //     return  this.perspectiveManager.getProperty().getUnit()
        // }

        // set perspectiveUnit(newVal: UnitSize)
        // {
        //     this.perspectiveManager.getProperty().setUnit(newVal)
        //     this.perspectiveManager.updateCssProp(this.perspectiveManager.getProperty())
        // }

        get hasPerspectiveOrigin()
        {
            return  this.perspectiveOriginManager.getProperty().active
        }

        set hasPerspectiveOrigin(newVal: boolean)
        {
            if (!newVal) {
                this.perspectiveOriginManager.deactivePropCss(this.perspectiveOriginManager.getProperty())
            } else {
                this.perspectiveOriginManager.activePropCss(this.perspectiveOriginManager.getProperty())
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
