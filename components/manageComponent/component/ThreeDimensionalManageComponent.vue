<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
            <div class="content-item__elem_container" @dblclick="hasTransform = !hasTransform" :class="{'active': hasTransform}">
                <div class="container " style="overflow: scroll;">
                    <h4 class="content-item__header">
                        Transform
                    </h4>
                    <div v-if="canAddTransformValue" class="content-item__header rel">
                        <label >
                        <span v-if="selectedTransformTypeName">
                            curr {{ selectedTransformTypeName }}
                        
                        </span>
                            <select :name="transformTypeName" v-model="selectedTransformTypeName" >
                                <option v-for="el, kk in transform.availableTypes()" :key="kk" :value="el.getName()">
                                    {{ el.getName() }}
                                </option>
                            </select>
                        </label>
                        <button class="right-btn btn btn_sm" @click="addTransformValue"> Add value </button>
                    
                        <br>
                        <span v-show="transform.addValueError" class="error">
                            {{ transform.addValueError }}
                        </span>
                    </div>
                    <div 
                        v-for="transformVal in transform.values" 
                        :key="transformVal.id" 
                        class="content-item-left green-b p-2 rel">
                        <span class="p-abs" style="right: 0px;">
                            <span class="btn btn_red  btn_sm" @click="removeTransformValue(transformVal)">DELETE VALUE</span>
                        </span>
                        <transform-val-component :value="transformVal" @change="transformManager.updateCssProp(transformManager.getProperty())" :transform="transform" />

                    </div>
                </div>
            </div>
            <div class="content-item__elem_container" @dblclick="hasTransformOrigin = !hasTransformOrigin" :class="{'active': hasTransformOrigin}">
                 <h4 class="content-item__header">
                    Transform Origin
                </h4>
                <transform-origin-component :value="transformOrigin" @change="transformOriginManager.updateCssProp(transformOriginManager.getProperty())" />
            </div>
            <div class="content-item__elem_container" @dblclick="hasPerspectiveOrigin = !hasPerspectiveOrigin" :class="{'active': hasPerspectiveOrigin}">
                 <h4 class="content-item__header">
                            Perspective Origin
                </h4>
                <css-two-axis-component :value="perspectiveOrigin" @change="perspectiveOriginManager.updateCssProp(perspectiveOriginManager.getProperty())" />
            </div>
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
import TransformOriginComponent from '../../modal/AxisCss/TransformOriginComponent.vue';
import { TransformOrigin } from '~/src/Css';
import TransformValComponent from '~/components/modal/ThreeDimensional/TransformValComponent.vue';
import TransformType from '~/src/Css/ThreeDimensional/TransformType';
import { TransformCssStruct } from '~/src/Css/ThreeDimensional/TransformCss';
import TransformTypeFactoryFromName from '~/src/Factory/TransformTypeFactoryFromName';

    @Component({
        components: {
            Chrome, CssTwoAxisComponent, TransformOriginComponent, TransformValComponent
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
        transformTypeName = Math.floor(Math.random() * 1000000000).toString() + 'transformType-select'

        transformStyleList: string[] = TransformStyle.getAccessableProperty()
        backfaceVisibilityList: string[] = BackfaceVisibility.getAccessableProperty()

        // currentActiveTag: HtmlTag
        

        pickerActive = false
        units: UnitSize[] = []

        selectedTransformTypeName: string = null

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
        
        // *****************************************  TRANSFORM-ORIGIN ****************************************************

        get transformOrigin()
        {
            return  this.transformOriginManager.getProperty()
        }

        get hasTransformOrigin()
        {
            return  this.transformOriginManager.getProperty().active
        }

        set hasTransformOrigin(newVal: boolean)
        {
            if (!newVal) {
                this.transformOriginManager.deactivePropCss(this.transformOriginManager.getProperty())
            } else {
                this.transformOriginManager.activePropCss(this.transformOriginManager.getProperty())
            }
        }

         // *****************************************  TRANSFORM ****************************************************

        addTransformValue() {
            var transformTypeFactory = new TransformTypeFactoryFromName()
            var selectedTransformType =  transformTypeFactory.create(this.selectedTransformTypeName)
            var val = new TransformCssStruct(selectedTransformType)
            this.transform.addValue(val)
            this.selectedTransformTypeName = null

            this.transformManager.updateCssProp(this.transform)
        }

        removeTransformValue(val: TransformCssStruct) {
            this.transform.removeValue(val)
            this.transformManager.updateCssProp(this.transform)
        }

        get canAddTransformValue() {
            return this.transform.canAddTransformValue
        }

        get transform()
        {
            return  this.transformManager.getProperty()
        }

        get hasTransform()
        {
            return  this.transformManager.getProperty().active
        }

        set hasTransform(newVal: boolean)
        {
            if (!newVal) {
                this.transformManager.deactivePropCss(this.transformManager.getProperty())
            } else {
                this.transformManager.activePropCss(this.transformManager.getProperty())
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
