<template>

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">

        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Zarządzaj tekstem
            </h4>
        </template>
        <template v-if="active" slot="content" >
            <div class="content-item" style="display: flex;">
                <div class="content-item-half" @dblclick="hasFontColor = !hasFontColor" :class="{'active': hasFontColor}">
                    <h4 class="content-item__header">
                        Kolor tekstu
                    </h4>
                    <div class="color-picker-box" @dblclick.stop.prevent="">
                        <!-- <label @dblclick.stop.prevent="">Kolor</label>
                        <div @dblclick.stop.prevent="" class="color-picker-btn" @click.stop="toggleColorPicker()">
                        </div> -->

                        <div>
                            <Chrome v-model="color" :color="color" style="margin: 0 auto;" label="Color" />
                            <div class="color-picker-nav">
                                <button @click="cancelColor">Anuluj</button>
                                <button @click="saveColor">Zapisz</button>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="content-item-half" >
                    <div @dblclick="hasFontSize = !hasFontSize" :class="{'active': hasFontSize}">
                        <h4 class="content-item__header">
                            Rozmiar tekstu
                        </h4>
                        <div class="content-item__elem"
                                v-context-menu="cmNameFontSize"
                            >
                            <select-unit-context-menu :propertyUnit="fontSizeUnit" @changePropUnit="($event) => {fontSizeUnit = $event;}" :ref="cmNameFontSize" />

                            <label :for="'fontSize-'">

                                <input @dblclick.stop.prevent="" type="number" style="width: 60px;" step=".01" class="input-text" v-model="fontSize" name="fontSize" :id="'fontSize-'">
                                {{ fontSizeUnit.label }}
                            </label>
                        </div>

                    </div>
                    <div @dblclick="hasLineHeight = !hasLineHeight" :class="{'active': hasLineHeight}">
                        <h4 class="content-item__header">
                            Wysokość linii
                        </h4>
                        <div class="content-item__elem"
                                v-context-menu="cmNameLineHeight"
                            >
                            <select-unit-context-menu :propertyUnit="lineHeightUnit" @changePropUnit="($event) => {lineHeightUnit = $event;}" :ref="cmNameLineHeight" />

                            <label :for="'lineHeight-'">

                                <input @dblclick.stop.prevent="" type="number" style="width: 60px;" step=".01" class="input-text" v-model="lineHeight" name="lineHeight" :id="'lineHeight-'">
                                {{ lineHeightUnit.label }}
                            </label>
                        </div>
                    </div>
                    <div @dblclick="hasTextAlign = !hasTextAlign" :class="{'active': hasTextAlign}">
                        <h4 class="content-item__header">
                            Wyrównanie tekstu
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
                            Styl tekstu
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
                            Typy czcionek
                        </h6>
                    </div>
                    <div class=" content-item_half">
                        <h6 class="content-item__header">
                            Dostępne czcionki
                        </h6>
                    </div>
                </div>

                <font-family-value-component v-for="fontFamVal in fontFamilyManager.property.compValues" :fontFamVal="fontFamVal" :fontFamilyManager="fontFamilyManager"  :key="fontFamVal.id" />
            </div>
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
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";
    import HtmlTag from '../../src/Layout/HtmlTag';
    import TextAlign from '../../src/Css/Text/TextAlign';
    import BaseModal from '~/components/BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';
    import CssPropertyAccessor from '../../src/Css/CssPropertyAccessor';
    import AbstractModal from '../AbstractModal';
    import Named from '../../src/Unit/Named';
    import UnitSize from '~/src/Unit/UnitSize';
    import Pixel from '~/src/Unit/Size/Pixel';
    import Percent from '~/src/Unit/Size/Percent';
    import VW from '~/src/Unit/Size/VW';
    import EM from '~/src/Unit/Size/EM';
    import REM from '~/src/Unit/Size/REM';
    import FontSize from '../../src/Css/Text/FontSize';
    import DisplayManageModal from '../DisplayManageModal';
    import { RGBA } from '~/src/Unit';
    import FontManageModal from '../FontManageModal';
    import { Chrome }  from '~/node_modules/vue-color';
import { FontFamily, FontStyle } from '../../src/Css';
import FontStretch from '../../src/Css/Text/FontStretch';
import FontFamilyDomain from '~/src/Fonts/FontFamilyValDomain';
import FontFamilyProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontFamilyProperty';
import FontFamilyValDomain from '~/src/Fonts/FontFamilyValDomain';
import FontFace from '~/src/Fonts/FontFace';
import FontFaceAccessor from '~/src/Fonts/FontFaceAccessor';

    @Component({
        components: {
            Chrome
        }
    })
    export default class TextManageModal extends FontManageModal {

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

        onChangePseudoSelector()
        {
            this.reinitManagers()
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
