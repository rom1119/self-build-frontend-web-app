<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Zarządzaj paddingiem i marginem
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Padding
                </h4>
                <!-- BOX MODEL FOR FEATURE -->
                <!-- <div class=" content-item__elem_container rel w-550 h-550">
                    <div class="margin-box-model">
                        <div class="border-box-model">
                            <div class="padding-box-model">
                                <div class="content-box-model">
                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="content-item__elem_container ">
                     <div :class="{'active': hasPaddingTop}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingTop === true ? hasPaddingTop = false : hasPaddingTop = true" class="item">
                            Padding-top

                        </div>
                        <div class="item" >
                            Value
                            <input v-if="hasPaddingTop" class="item" type="number" v-model="paddingTop" name="paddingTop" id="padding-top">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingTop" name="paddingTop" id="padding-top">
                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingTop" name="paddingUnitTop" class="item" v-model="paddingUnitTop" id="paddingUnitTop">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitTop" class=" item" v-model="paddingUnitTop" id="paddingUnitTop">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div :class="{'active': hasPaddingRight}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingRight === true ? hasPaddingRight = false : hasPaddingRight = true" class="item">
                            Padding-right
                        </div>
                        <div class="item" >
                            <div>
                                Value <button :class="{'green-bg': paddingRightAuto}" @click.stop="setPropPaddingAuto(paddingManager.rightProperty)"  class="auto-prop">auto</button>
                            </div>
                            <input v-if="hasPaddingRight" class="item" type="number" v-model="paddingRight" name="paddingRight" id="padding-right">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingRight" name="paddingRight" id="padding-right">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingRight" name="paddingUnitRight" class="item" v-model="paddingUnitRight" id="paddingUnitRight">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitRight" class=" item" v-model="paddingUnitRight" id="paddingUnitRight">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div :class="{'active': hasPaddingBottom}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingBottom === true ? hasPaddingBottom = false : hasPaddingBottom = true" class="item">
                            Padding-bottom

                        </div>
                        <div class="item" >
                            Value
                            <input v-if="hasPaddingBottom" class="item" type="number" v-model="paddingBottom" name="paddingBottom" id="padding-bottom">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingBottom" name="paddingBottom" id="padding-bottom">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingBottom" name="paddingUnitBottom" class="item" v-model="paddingUnitBottom" id="paddingUnitBottom">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitBottom" class=" item" v-model="paddingUnitBottom" id="paddingUnitBottom">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
   
                    <div :class="{'active': hasPaddingLeft}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingLeft === true ? hasPaddingLeft = false : hasPaddingLeft = true" class="item">
                            Padding-left

                        </div>
                        <label class="item" for="padding-left">
                            <div>
                                Value <button :class="{'green-bg': paddingLeftAuto}" @click.stop="setPropPaddingAuto(paddingManager.leftProperty)"  class="auto-prop">auto</button>
                            </div>
                            <input v-if="hasPaddingLeft" class="item" type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingLeft" name="paddingUnitLeft" class="item" v-model="paddingUnitLeft" id="paddingUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitLeft" class=" item" v-model="paddingUnitLeft" id="paddingUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
                <div  class=" content-item__elem_container flex-center">
                    <div :class="{'active': hasPaddingGlobal}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingGlobal === true ? hasPaddingGlobal = false : hasPaddingGlobal = true" class="item">
                            Padding-global
                        </div>
                        <label class="item" for="padding-global">
                            Value
                            <input class="item" type="number" v-model="paddingGlobal" name="paddingGlobal" id="padding-global">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitGlobal" class="item" v-model="paddingUnitGlobal" id="paddingUnitGlobal">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div class="content-item">
                <h4 class="content-item__header">
                    Margin
                </h4>
                <div class="content-item__elem_container ">
                     <div :class="{'active': hasMarginTop}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasMarginTop === true ? hasMarginTop = false : hasMarginTop = true" class="item">
                            Margin-top

                        </div>
                        <div class="item" >
                            Value
                            <input v-if="hasMarginTop" class="item" type="number" v-model="marginTop" name="marginTop" id="margin-top">
                            <input v-else disabled class="disabled item" type="number" v-model="marginTop" name="marginTop" id="margin-top">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasMarginTop" name="marginUnitTop" class="item" v-model="marginUnitTop" id="marginUnitTop">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="marginUnitTop" class=" item" v-model="marginUnitTop" id="marginUnitTop">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div :class="{'active': hasMarginRight}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasMarginRight === true ? hasMarginRight = false : hasMarginRight = true" class="item">
                            Margin-right
                        </div>
                        <div class="item" >
                            <div>
                                Value <button :class="{'green-bg': marginRightAuto}" @click.stop="setPropMarginAuto(marginManager.rightProperty)"  class="auto-prop">auto</button>
                            </div>
                            <input v-if="hasMarginRight" class="item" type="number" v-model="marginRight" name="marginRight" id="margin-right">
                            <input v-else disabled class="disabled item" type="number" v-model="marginRight" name="marginRight" id="margin-right">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasMarginRight" name="marginUnitRight" class="item" v-model="marginUnitRight" id="marginUnitRight">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="marginUnitRight" class=" item" v-model="marginUnitRight" id="marginUnitRight">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div :class="{'active': hasMarginBottom}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasMarginBottom === true ? hasMarginBottom = false : hasMarginBottom = true" class="item">
                            Margin-bottom

                        </div>
                        <div class="item" >
                            Value
                            <input v-if="hasMarginBottom" class="item" type="number" v-model="marginBottom" name="marginBottom" id="margin-bottom">
                            <input v-else disabled class="disabled item" type="number" v-model="marginBottom" name="marginBottom" id="margin-bottom">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasMarginBottom" name="marginUnitBottom" class="item" v-model="marginUnitBottom" id="marginUnitBottom">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="marginUnitBottom" class=" item" v-model="marginUnitBottom" id="marginUnitBottom">
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
   
                    <div :class="{'active': hasMarginLeft}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasMarginLeft === true ? hasMarginLeft = false : hasMarginLeft = true" class="item">
                            Margin-left

                        </div>
                        <label class="item" for="margin-left">
                            <div>
                                Value <button :class="{'green-bg': marginLeftAuto}" @click.stop="setPropMarginAuto(marginManager.leftProperty)"  class="auto-prop">auto</button>
                            </div>
                            <input v-if="hasMarginLeft" class="item" type="number" v-model="marginLeft" name="marginLeft" id="margin-left">
                            <input v-else disabled class="disabled item" type="number" v-model="marginLeft" name="marginLeft" id="margin-left">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasMarginLeft" name="marginUnitLeft" class="item" v-model="marginUnitLeft" id="marginUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="marginUnitLeft" class=" item" v-model="marginUnitLeft" id="marginUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
                <div  class=" content-item__elem_container flex-center">
                    <div :class="{'active': hasMarginGlobal}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasMarginGlobal === true ? hasMarginGlobal = false : hasMarginGlobal = true" class="item">
                            Margin-global
                        </div>
                        <label class="item" for="margin-global">
                            Value
                            <input class="item" type="number" v-model="marginGlobal" name="marginGlobal" id="margin-global">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="marginUnitGlobal" class="item" v-model="marginUnitGlobal" id="marginUnitGlobal">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
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
    import _ from 'lodash'
    import {Pagination} from "~/types/Pagination";
    import HtmlTag from '../../src/Layout/HtmlTag';
    import TextAlign from '../../src/Css/Text/TextAlign';
    import BaseModal from '~/components/BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';
    import CssPropertyAccessor from '../../src/Css/CssPropertyAccessor';
    import AbstractModal from '../AbstractModal';
    import Named from '../../src/Unit/Named';
    import UnitSize from '../../src/Unit/UnitSize';
    import Pixel from '../../src/Unit/Size/Pixel';
    import Percent from '../../src/Unit/Size/Percent';
    import EM from '../../src/Unit/Size/EM';
    import REM from '../../src/Unit/Size/REM';
    import PaddingRightCss from '../../src/Css/BoxModel/Padding/PaddingRightCss';
    import PaddingCss from '~/src/Css/BoxModel/Padding/PaddingCss';
import PaddingLeftCss from '../../src/Css/BoxModel/Padding/PaddingLeftCss';
import BasePaddingCss from '../../src/Css/BoxModel/BasePaddingCss';
import FetcherRealCssProp from '../../src/FetcherRealCssProp';
import PaddingRealCssFetcher from '../../src/Css/RealCssProp/PadingRealCssFetcher';
import VW from '../../src/Unit/Size/VW';
import VH from '~/src/Unit/Size/VH';
import BoxModelModal from '../BoxModelModal';
import PaddingBottomCss from '~/src/Css/BoxModel/Padding/PaddingBottomCss';
import PaddingTopCss from '~/src/Css/BoxModel/Padding/PaddingTopCss';
import BaseMarginCss from '~/src/Css/BoxModel/BaseMarginCss';
import MarginCss from '~/src/Css/BoxModel/Margin/MarginCss';
import MarginLeftCss from '~/src/Css/BoxModel/Margin/MarginLeftCss';
import MarginBottomCss from '~/src/Css/BoxModel/Margin/MarginBottomCss';
import MarginRightCss from '~/src/Css/BoxModel/Margin/MarginRightCss';
import MarginTopCss from '~/src/Css/BoxModel/Margin/MarginTopCss';
import CssAuto from '~/src/Css/CssAuto';

    @Component
    export default class BoxModelManageModal extends BoxModelModal {
      
        timeout
        // value: HtmlTag
        allUnits: UnitSize[] = []
        DEFAULT_PADDING = 0
        DEFAULT_PADDING_UNIT = new Pixel()

        // paddingLeftData: BasePaddingCss = new PaddingLeftCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        // paddingRightData: BasePaddingCss = new PaddingRightCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        // paddingTopData: BasePaddingCss = new PaddingTopCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        // paddingBottomData: BasePaddingCss = new PaddingBottomCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        // paddingGlobalData: BasePaddingCss = new PaddingCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()
        // _paddingLeft: BasePaddingCss

        idName = 'text-property-modal'

        created()
        {
            this.allUnits.push(new Pixel())
            this.allUnits.push(new Percent())
            this.allUnits.push(new EM())
            this.allUnits.push(new REM())
            this.allUnits.push(new VW())
            this.allUnits.push(new VH())

        }

        // *****************************************  PADDING ****************************************************

        // PADDING RIGHT
        set paddingUnitTop(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.topProperty)
        }
        
        get paddingUnitTop(): string
        {
            return this.getUnitPropVal(this.paddingManager.topProperty)
        }
        
        get paddingTop(): number
        {
            return this.getProp(this.paddingManager.topProperty, 0)
        }
        
        set paddingTop(newVal: number)
        {
            this.setPadding(newVal, this.paddingManager.topProperty)
        }
        
        get hasPaddingTop(): boolean
        {
            return  this.getHasProp(this.paddingManager.topProperty)
        }
        
        set hasPaddingTop(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingManager.topProperty, new PaddingTopCss(null, null))
        }
        
        get paddingTopAuto(): boolean
        {
            return this.getProp(this.paddingManager.topProperty, 0).toString() == 'auto'
        }
        
        set paddingTopAuto(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            if (true) {

            }
            (<BasePaddingCss>this.paddingManager.topProperty).auto()
            this.setHasPropPadding(newVal, this.paddingManager.topProperty, new PaddingTopCss(null, null))
        }

        // PADDING RIGHT
        set paddingUnitRight(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.rightProperty)
        }
        
        get paddingUnitRight(): string
        {
            return this.getUnitPropVal(this.paddingManager.rightProperty)
        }
        
        get paddingRight(): number
        {
            return this.getProp(this.paddingManager.rightProperty, 0)
        }
        
        set paddingRight(newVal: number)
        {
            this.setPadding(newVal, this.paddingManager.rightProperty)
        }
        
        get hasPaddingRight(): boolean
        {
            return  this.getHasProp(this.paddingManager.rightProperty)
        }
        
        set hasPaddingRight(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingManager.rightProperty, new PaddingRightCss(null, null))
        }

        get paddingRightAuto(): boolean
        {
            return (<BasePaddingCss>this.paddingManager.rightProperty).isAuto()

        }
        
        setPropPaddingAuto(propCss: CssAuto)
        {
            // console.log('hasPaddingLeft', newVal);
            if (propCss.isAuto()) {
                propCss.notAuto()
            } else {
                propCss.auto()
            }
            // @ts-ignore
            this.updateCssPropWithPaddingFilter(propCss)
        }
        
        setPropMarginAuto(propCss: CssAuto)
        {
            // console.log('hasPaddingLeft', newVal);
            if (propCss.isAuto()) {
                propCss.notAuto()
            } else {
                propCss.auto()
            }
            // @ts-ignore
            this.updateCssPropWithMarginFilter(propCss)
        }

        // PADDING BOTTOM
        set paddingUnitBottom(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.bottomProperty)
        }
        
        get paddingUnitBottom(): string
        {
            return this.getUnitPropVal(this.paddingManager.bottomProperty)
        }
        
        get paddingBottom(): number
        {
            return this.getProp(this.paddingManager.bottomProperty, 0)
        }
        
        set paddingBottom(newVal: number)
        {
            this.setPadding(newVal, this.paddingManager.bottomProperty)
        }
        
        get hasPaddingBottom(): boolean
        {
            return  this.getHasProp(this.paddingManager.bottomProperty)
        }
        
        set hasPaddingBottom(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingManager.bottomProperty, new PaddingBottomCss(null, null))
        }

        // PADDING LEFT
        set paddingUnitLeft(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.leftProperty)
        }
        
        get paddingUnitLeft(): string
        {
            return this.getUnitPropVal(this.paddingManager.leftProperty)
        }
        
        get paddingLeft(): number
        {
            return this.getProp(this.paddingManager.leftProperty, 0)
        }
        
        set paddingLeft(newVal: number)
        {
            this.setPadding(newVal, this.paddingManager.leftProperty)
        }
        
        get hasPaddingLeft(): boolean
        {
            return  this.getHasProp(this.paddingManager.leftProperty)
        }
        
        set hasPaddingLeft(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingManager.leftProperty, new PaddingLeftCss(null, null))
        }

        get paddingLeftAuto(): boolean
        {
            return false

        }

        // PADDING GLOBAL
        
        set paddingUnitGlobal(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.globalProperty)
            this.setDirectionsPaddingsFromVal(this.paddingManager.globalProperty.getClearValue(), this.paddingManager.globalProperty.getUnit())
        }
        
        get paddingUnitGlobal(): string
        {
            return this.getUnitPropVal(this.paddingManager.globalProperty)
        }
        
        get paddingGlobal(): number
        {
            return this.getProp(this.paddingManager.globalProperty, 0)
        }
        
        set paddingGlobal(newVal: number)
        {
            this.setPadding(newVal, this.paddingManager.globalProperty)
        }
        
        get hasPaddingGlobal(): boolean
        {
            return  this.getHasProp(this.paddingManager.globalProperty)
        }
        
        set hasPaddingGlobal(newVal: boolean)
        {
            this.setHasPropPaddingGlobal(newVal, this.paddingManager.globalProperty, new PaddingCss(null, null))
        }

        // *****************************************  PADDING - END ****************************************************

        // *****************************************  MARGIN ****************************************************

        // MARGIN RIGHT
        set marginUnitTop(newVal: string)
        {
            this.setPropMarginUnit(newVal, this.marginManager.topProperty)
        }
        
        get marginUnitTop(): string
        {
            return this.getUnitPropVal(this.marginManager.topProperty)
        }
        
        get marginTop(): number
        {
            return this.getProp(this.marginManager.topProperty, 0)
        }
        
        set marginTop(newVal: number)
        {
            this.setMargin(newVal, this.marginManager.topProperty)
        }
        
        get hasMarginTop(): boolean
        {
            return  this.getHasProp(this.marginManager.topProperty)
        }
        
        set hasMarginTop(newVal: boolean)
        {
            // console.log('hasMarginLeft', newVal);
            this.setHasPropMargin(newVal, this.marginManager.topProperty, new MarginTopCss(null, null))
        }

        // MARGIN RIGHT
        set marginUnitRight(newVal: string)
        {
            this.setPropMarginUnit(newVal, this.marginManager.rightProperty)
        }
        
        get marginUnitRight(): string
        {
            return this.getUnitPropVal(this.marginManager.rightProperty)
        }
        
        get marginRight(): number
        {
            return this.getProp(this.marginManager.rightProperty, 0)
        }
        
        set marginRight(newVal: number)
        {
            this.setMargin(newVal, this.marginManager.rightProperty)
        }
        
        get hasMarginRight(): boolean
        {
            return  this.getHasProp(this.marginManager.rightProperty)
        }
        
        set hasMarginRight(newVal: boolean)
        {
            // console.log('hasMarginLeft', newVal);
            this.setHasPropMargin(newVal, this.marginManager.rightProperty, new MarginRightCss(null, null))
        }

        get marginRightAuto(): boolean
        {
            return (<BasePaddingCss>this.marginManager.rightProperty).isAuto()

        }

        // MARGIN BOTTOM
        set marginUnitBottom(newVal: string)
        {
            this.setPropMarginUnit(newVal, this.marginManager.bottomProperty)
        }
        
        get marginUnitBottom(): string
        {
            return this.getUnitPropVal(this.marginManager.bottomProperty)
        }
        
        get marginBottom(): number
        {
            return this.getProp(this.marginManager.bottomProperty, 0)
        }
        
        set marginBottom(newVal: number)
        {
            this.setMargin(newVal, this.marginManager.bottomProperty)
        }
        
        get hasMarginBottom(): boolean
        {
            return  this.getHasProp(this.marginManager.bottomProperty)
        }
        
        set hasMarginBottom(newVal: boolean)
        {
            // console.log('hasMarginLeft', newVal);
            this.setHasPropMargin(newVal, this.marginManager.bottomProperty, new MarginBottomCss(null, null))
        }

        // MARGIN LEFT
        set marginUnitLeft(newVal: string)
        {
            this.setPropMarginUnit(newVal, this.marginManager.leftProperty)
        }
        
        get marginUnitLeft(): string
        {
            return this.getUnitPropVal(this.marginManager.leftProperty)
        }
        
        get marginLeft(): number
        {
            return this.getProp(this.marginManager.leftProperty, 0)
        }
        
        set marginLeft(newVal: number)
        {
            this.setMargin(newVal, this.marginManager.leftProperty)
        }
        
        get hasMarginLeft(): boolean
        {
            return  this.getHasProp(this.marginManager.leftProperty)
        }
        
        set hasMarginLeft(newVal: boolean)
        {
            // console.log('hasMarginLeft', newVal);
            this.setHasPropMargin(newVal, this.marginManager.leftProperty, new MarginLeftCss(null, null))
        }

        get marginLeftAuto(): boolean
        {
            return (<BasePaddingCss>this.marginManager.leftProperty).isAuto()

        }

        // MARGIN GLOBAL
        
        set marginUnitGlobal(newVal: string)
        {
            this.setPropMarginUnit(newVal, this.marginManager.globalProperty)
            this.setDirectionsMarginsFromVal(this.marginManager.globalProperty.getClearValue(), this.marginManager.globalProperty.getUnit())
        }
        
        get marginUnitGlobal(): string
        {
            return this.getUnitPropVal(this.marginManager.globalProperty)
        }
        
        get marginGlobal(): number
        {
            return this.getProp(this.marginManager.globalProperty, 0)
        }
        
        set marginGlobal(newVal: number)
        {
            this.setMargin(newVal, this.marginManager.globalProperty)
        }
        
        get hasMarginGlobal(): boolean
        {
            return  this.getHasProp(this.marginManager.globalProperty)
        }
        
        set hasMarginGlobal(newVal: boolean)
        {
            this.setHasPropMarginGlobal(newVal, this.marginManager.globalProperty, new MarginCss(null, null))
        }

        // *****************************************  MARGIN - END ****************************************************

        private getHasProp(prop: BasePropertyCss){
            return  prop.active
        }
        
        private getUnitPropVal(prop: BasePropertyCss){
            if (!prop) {
                return ''
            }
            console.log('GET paddingUnitGlobal', prop.getUnit());
            if (prop.getUnit()) {
                return prop.getUnit().name
            }

            return ''
        }

        private getProp(prop: BasePropertyCss, defaultVal)
        {
            if (!prop) {
                // if (defaultVal) {
                //     return defaultVal
                // }
                return 0
            }
            // this._paddingLeft = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            // console.log(this._paddingLeft.getClearValue().toString());
            var v = prop.getClearValue()
            
            if (prop.getUnit() instanceof Pixel) {
                return parseInt(v)
            }
            return parseFloat(v)
        }
        
        // PADDING METHODS
        private setHasPropPaddingGlobal(newVal, prop: BasePropertyCss, clearProp: BasePaddingCss){
            if (!newVal) {
                console.log('FALSE');
                prop.setActive(false)
                this.deactiveGlobalPaddingProp(<BasePaddingCss>prop)
            } else {
                console.log('TRUE');
                prop.setActive(true)
                this.activePaddingProp(<BasePaddingCss>prop)
                
            }
            this.updateDirectionsPaddings()

        }
        
        private setHasPropPadding(newVal, prop: BasePropertyCss, clearProp: BasePaddingCss){
            if (!newVal) {
                console.log('FALSE');
                prop.setActive(false)
                this.deactivePaddingProp(<BasePaddingCss>prop)
                
            } else {
                console.log('TRUE');
                prop.setActive(true)
                this.activePaddingProp(<BasePaddingCss>prop)
                
            }

        }
        
        private setPropPaddingUnit(newVal, prop: BasePropertyCss){
            if (!prop.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            // console.log('SET paddingUnitGlobal', newVal);
            var newUnit = this.getUnitByName(this.allUnits, newVal)
            // this.updateUnitInModel(newUnit, PaddingCss.PROP_NAME)
            prop.setUnit(newUnit)
            this.updateCssPropWithPaddingFilter(prop)

        }

        private setPadding(newVal, prop: BasePropertyCss)
        {
            if (!prop) {
                return
            }
            if (!prop.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            prop.setValue(newVal.toString())
            var a = this.updateCssPropWithPaddingFilter(prop)
        }

        // MARGIN METHODS
        private setHasPropMarginGlobal(newVal, prop: BasePropertyCss, clearProp: BaseMarginCss){
            if (!newVal) {
                console.log('FALSE');
                prop.setActive(false)
                this.deactiveGlobalMarginProp(<BaseMarginCss>prop)
            } else {
                console.log('TRUE');
                prop.setActive(true)
                this.activeMarginProp(<BaseMarginCss>prop)
                
            }
            this.updateDirectionsMargins()

        }
        
        private setHasPropMargin(newVal, prop: BasePropertyCss, clearProp: BaseMarginCss){
            if (!newVal) {
                console.log('FALSE');
                prop.setActive(false)
                this.deactiveMarginProp(<BaseMarginCss>prop)
                
            } else {
                console.log('TRUE');
                prop.setActive(true)
                this.activeMarginProp(<BaseMarginCss>prop)
                
            }

        }
        
        private setPropMarginUnit(newVal, prop: BasePropertyCss){
            if (!prop.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            // console.log('SET paddingUnitGlobal', newVal);
            var newUnit = this.getUnitByName(this.allUnits, newVal)
            // this.updateUnitInModel(newUnit, MarginCss.PROP_NAME)
            prop.setUnit(newUnit)
            this.updateCssPropWithMarginFilter(prop)

        }

        private setMargin(newVal, prop: BasePropertyCss)
        {
            if (!prop) {
                return
            }
            if (!prop.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            prop.setValue(newVal.toString())
            var a = this.updateCssPropWithMarginFilter(prop)
        }

        

        

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: red;
    }
    .disabled {
        opacity: 0.6;
    }
    .auto-prop {
        background-color: red;
        padding: 3px;
        margin-left: 3px;
        border-radius: 5px;
    }
    .green-bg {
        background-color: greenyellow;

    }
    .rel {
        position: relative;
    }

    .h-550 {
        height: 550px;
    }
    .w-550 {
        width: 550px;
    }

    .margin-box-model {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-color: rgb(243, 206, 165)
    }

    .border-box-model {
        width: 80%;
        height: 80%;
        position: absolute;
        left: 60px;
        top: 60px;
        z-index: 2;
        background-color: rgb(249, 222, 164)
    }

    .padding-box-model {
        width: 70%;
        height: 70%;
        position: absolute;
        left: 70px;
        top: 70px;
        z-index: 3;
        background-color: rgb(200, 208, 147)

    }

    .content-box-model {
        width: 50%;
        height: 50%;
        position: absolute;
        left: 70px;
        top: 70px;
        z-index: 4;
        background-color: rgb(148, 181, 192)

    }


</style>
