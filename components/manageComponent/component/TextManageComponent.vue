<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
            <div class="content-item" style="display: flex;">
                <div class="content-item-sixty" @dblclick="hasFontColor = !hasFontColor" :class="{'active': hasFontColor}">
                    <h4 class="content-item__header">
                        Text color
                    </h4>
                    <div class="color-picker-box" @dblclick.stop.prevent="">
                        <!-- <label @dblclick.stop.prevent="">Kolor</label>
                        <div @dblclick.stop.prevent="" class="color-picker-btn" @click.stop="toggleColorPicker()">
                        </div> -->

                        <div>
                            <Chrome v-model="color" :color="color" style="margin: 0 auto;" label="Color" />
                            <div class="color-picker-nav">
                                <button @click="cancelColor">Cancel</button>
                                <button @click="saveColor">Save</button>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="content-item-half" >
                    <div @dblclick="hasFontSize = !hasFontSize" :class="{'active': hasFontSize}">
                        <input-val-component 
                            labelProp="Text size"
                            classContainer="content-item"
                            contextMenuName="length-units"
                            :valueProp="fontSize"
                            :unitProp="fontSizeUnit"
                            :minRangeProp="-200"
                            :maxRangeProp="200"
                            :stepValue="1"
                            @changeValue="fontSize = $event"
                            @changeUnit="fontSizeUnit = $event"
                        />

                    </div>
                    <div @dblclick="hasLineHeight = !hasLineHeight" :class="{'active': hasLineHeight}">

                        <input-val-component 
                            labelProp="Line Height"
                            classContainer="content-item"
                            contextMenuName="length-units"
                            :valueProp="lineHeight"
                            :unitProp="lineHeightUnit"
                            :minRangeProp="-200"
                            :maxRangeProp="200"
                            :stepValue="1"
                            @changeValue="lineHeight = $event"
                            @changeUnit="lineHeightUnit = $event"
                        />
                        
                    </div>
                    <div @dblclick="hasTextAlign = !hasTextAlign" :class="{'active': hasTextAlign}">
                        <h4 class="content-item__header">
                            Text align
                        </h4>
                        <div class="content-item__elem"
                            >
                            <ul class=" content-item__elem_container">
                                <li class="content-item__elem" v-for="el in textAligns" :key="el">
                                    <label :for="'textAlign-' + el">
                                        {{ el }}
                                        <input type="radio" v-model="textAlign" :value="el" name="textAlign" :id="'textAlign-' + el">

                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div @dblclick="hasFontStyle = !hasFontStyle" :class="{'active': hasFontStyle}">
                        <h4 class="content-item__header">
                            Text style
                        </h4>
                        <div class="content-item__elem"
                            >
                            <ul class=" content-item__elem_container">
                                <li class="content-item__elem" v-for="el in fontStyles" :key="el">
                                    <label :for="'fontStyle-' + el">
                                        {{ el }}
                                        <input type="radio" v-model="fontStyle" :value="el" name="fontStyle" :id="'fontStyle-' + el">

                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="fontFamilyManager" class="content-item"  @dblclick="hasFontFamily = !hasFontFamily" :class="{'active': hasFontFamily}">
                <h4 class="content-item__header">
                    Font Family
                </h4>
                <h4 class="content-item__header">
                    <span class="add-btn" style="top: 20px; left: -5px;" @click="addDefaultFontFamilyVal"> + </span>
                </h4>
                <div class=" content-item__elem_container">
                    <div class=" content-item_half">
                        <h6 class="content-item__header">
                            Font Types
                        </h6>
                    </div>
                    <div class=" content-item_half">
                        <h6 class="content-item__header">
                            Available fonts
                        </h6>
                    </div>
                </div>

                <font-family-value-component v-for="fontFamVal in fontFamilyManager.property.compValues" :fontFamVal="fontFamVal" :fontFamilyManager="fontFamilyManager"  :key="fontFamVal.id" />
            </div>
            <div class="content-item" @dblclick="hasFontWeight = !hasFontWeight" :class="{'active': hasFontWeight}">
                <h4 class="content-item__header">
                    Font Weight
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
            <div class="content-item" @dblclick="hasFontStretch = !hasFontStretch" :class="{'active': hasFontStretch}">
                <h4 class="content-item__header">
                    Font Stretch
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in fontStretchs" :key="el">
                        <label :for="'fontStretch-' + el">
                            {{ el }}
                            <input type="radio" v-model="fontStretch" :value="el" name="fontStretch" :id="'fontStretch-' + el">

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
import InputValComponent from '../../InputValComponent.vue';

    @Component({
        components: {
            Chrome, InputValComponent
        }
    })
    export default class TextManageComponent extends FontManage {

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
        fontWeights: string[] = FontWeight.getAccessableProperty()
        fontStyles: string[] = FontStyle.getAccessableProperty()
        fontStretchs: string[] = FontStretch.getAccessableProperty()

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
            // console.log(this.cmName);

            if (this.fontColorUnit instanceof RGBA) {
                console.log('00000000000000000');
                // console.log(this.value.color);

                // @ts-ignore
                this.color.r = this.fontColor.r
                // @ts-ignore
                this.color.g = this.fontColor.g
                // @ts-ignore
                this.color.b = this.fontColor.b
                // @ts-ignore
                this.color.a = this.fontColor.a
            }

        }

        created()
        {

        }

        // *****************************************  LINE-HEIGHT ****************************************************

        get lineHeight()
        {
            return  this.lineHeightManager.getProperty().blankValue
        }

        set lineHeight(newVal: string)
        {
            this.lineHeightManager.getProperty().setValue(newVal)
            this.lineHeightManager.updateCssProp(this.lineHeightManager.getProperty())
        }

        get lineHeightUnit()
        {
            return  this.lineHeightManager.getProperty().getUnit()
        }

        set lineHeightUnit(newVal: UnitSize)
        {
            this.lineHeightManager.getProperty().setUnit(newVal)
            this.lineHeightManager.updateCssProp(this.lineHeightManager.getProperty())
        }

        get hasLineHeight()
        {
            return  this.lineHeightManager.getProperty().active
        }

        set hasLineHeight(newVal: boolean)
        {
            if (!newVal) {
                this.lineHeightManager.deactivePropCss(this.lineHeightManager.getProperty())
            } else {
                this.lineHeightManager.activePropCss(this.lineHeightManager.getProperty())
            }
        }

        // *****************************************  FONT-SIZE ****************************************************

        get fontSize()
        {
            return  this.fontSizeManager.getProperty().blankValue
        }

        set fontSize(newVal: string)
        {
            this.fontSizeManager.getProperty().setValue(newVal)
            this.fontSizeManager.updateCssProp(this.fontSizeManager.getProperty())
        }

        get fontSizeUnit()
        {
            return  this.fontSizeManager.getProperty().getUnit()
        }

        set fontSizeUnit(newVal: UnitSize)
        {
            this.fontSizeManager.getProperty().setUnit(newVal)
            this.fontSizeManager.updateCssProp(this.fontSizeManager.getProperty())
        }

        get hasFontSize()
        {
            return  this.fontSizeManager.getProperty().active
        }

        set hasFontSize(newVal: boolean)
        {
            if (!newVal) {
                this.fontSizeManager.deactivePropCss(this.fontSizeManager.getProperty())
            } else {
                this.fontSizeManager.activePropCss(this.fontSizeManager.getProperty())
            }
        }

        // *****************************************  FONT-COLOR ****************************************************

        get fontColor()
        {
            return  this.fontColorManager.getProperty().blankValue
        }

        set fontColor(newVal)
        {
            console.log('set');

            this.fontColorManager.getProperty().setValue(newVal)
            this.fontColorManager.updateCssProp(this.fontColorManager.getProperty())
        }

        get fontColorUnit()
        {
            return  this.fontColorManager.getProperty().getUnit()
        }

        set fontColorUnit(newVal: UnitSize)
        {
            this.fontColorManager.getProperty().setUnit(newVal)
            this.fontColorManager.updateCssProp(this.fontColorManager.getProperty())
        }

        get hasFontColor()
        {
            return  this.fontColorManager.getProperty().active
        }

        set hasFontColor(newVal: boolean)
        {
            if (!newVal) {
                this.fontColorManager.deactivePropCss(this.fontColorManager.getProperty())
            } else {
                this.fontColorManager.activePropCss(this.fontColorManager.getProperty())
            }
        }

        // *****************************************  TEXT-ALIGN ****************************************************

        get textAlign()
        {
            return  this.textAlignManager.getProperty().blankValue
        }

        set textAlign(newVal)
        {
            this.textAlignManager.getProperty().setValue(newVal)
            this.textAlignManager.updateCssProp(this.textAlignManager.getProperty())
        }

        get hasTextAlign()
        {
            return  this.textAlignManager.getProperty().active
        }

        set hasTextAlign(newVal: boolean)
        {
            if (!newVal) {
                this.textAlignManager.deactivePropCss(this.textAlignManager.getProperty())
            } else {
                this.textAlignManager.activePropCss(this.textAlignManager.getProperty())
            }
        }

        // *****************************************  FONT-STRETCH ****************************************************

        get fontStretch()
        {
            return  this.fontStretchManager.getProperty().blankValue
        }

        set fontStretch(newVal)
        {
            this.fontStretchManager.getProperty().setValue(newVal)
            this.fontStretchManager.updateCssProp(this.fontStretchManager.getProperty())
        }

        get hasFontStretch()
        {
            return  this.fontStretchManager.getProperty().active
        }

        set hasFontStretch(newVal: boolean)
        {
            if (!newVal) {
                this.fontStretchManager.deactivePropCss(this.fontStretchManager.getProperty())
            } else {
                this.fontStretchManager.activePropCss(this.fontStretchManager.getProperty())
            }
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

        // *****************************************  FONT-STYLE ****************************************************

        get fontStyle()
        {
            return  this.fontStyleManager.getProperty().blankValue
        }

        set fontStyle(newVal)
        {
            this.fontStyleManager.getProperty().setValue(newVal)
            this.fontStyleManager.updateCssProp(this.fontStyleManager.getProperty())
        }

        get hasFontStyle()
        {
            return  this.fontStyleManager.getProperty().active
        }

        set hasFontStyle(newVal: boolean)
        {
            if (!newVal) {
                this.fontStyleManager.deactivePropCss(this.fontStyleManager.getProperty())
            } else {
                this.fontStyleManager.activePropCss(this.fontStyleManager.getProperty())
            }
        }

        // *****************************************  FONT-FAMILY ****************************************************

        addDefaultFontFamilyVal() {
            this.fontFamilyManager.addDefaultFontFamilyVal()
            this.onUpdateFontFamily()
        }

        removeFontFamilyVal(val: FontFamilyValDomain) {
            this.fontFamilyManager.removeFontFamilyVal(val)
            this.onUpdateFontFamily()
        }


        onUpdateFontFamily()
        {
            console.log();
            if (!this.fontFamilyManager.getProperty()) {
                return
            }


            // var f = FontFamily.findFontByName(newVal)
            // this.fontFamilyManager.getProperty().setValue(f)

            this.fontFamilyManager.updateCssProp(this.fontFamilyManager.getProperty())
        }


        onUpdateFontFaceInFontFamily(val)
        {
            console.log('onUpdateFontFaceInFontFamily');
            console.log(val);
            console.log(val.target);
            console.log(val.target.value);
            // FontFaceAccessor.getInstance().addFontOwnerToFontFace(val.fontFace, this)

            if (!this.fontFamilyManager.getProperty()) {
                return
            }
            // var f = FontFamily.findFontByName(newVal)
            // this.fontFamilyManager.getProperty().setValue(f)

            this.fontFamilyManager.updateCssProp(this.fontFamilyManager.getProperty())
        }

        get hasFontFamily()
        {
            if (!this.fontFamilyManager.getProperty()) {
                return false
            }
            return  this.fontFamilyManager.getProperty().active
        }

        set hasFontFamily(newVal: boolean)
        {
            if (!this.fontFamilyManager.getProperty()) {
                return
            }
            if (!newVal) {
                this.fontFamilyManager.deactivePropCss(this.fontFamilyManager.getProperty())
            } else {
                this.fontFamilyManager.activePropCss(this.fontFamilyManager.getProperty())
            }
        }


        toggleColorPicker()
        {
            this.pickerActive = !this.pickerActive
        }

        cancelColor()
        {
            // console.log(this.color);

            this.toggleColorPicker()
        }

        saveColor()
        {
            console.log(this.color);
            this.fontColor = this.color.rgba
            this.fontColorUnit = new RGBA()
            // this.change()
            // this.toggleColorPicker()
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
