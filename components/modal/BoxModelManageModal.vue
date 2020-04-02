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
                <div  class=" box-model content-item__elem_container rel w-400 h-400">
                    <div v-if="value" class="margin-box-model">
                        
                        <site-box-model-element
                            @changeHasProp="hasMarginTop = $event"
                            @changeProp="marginTop = $event"
                            @changePropUnit="marginUnitTop = $event"
                            :hasProperty="hasMarginTop"
                            :property="marginTop"
                            :propertyUnit="marginUnitTop"
                            :classList="['top-margin','margin']"
                            :contextMenuName="value.uuid.concat('-margin-top-box')"
                        />
                        <site-box-model-element
                            @changeHasProp="hasMarginBottom = $event"
                            @changeProp="marginBottom = $event"
                            @changePropUnit="marginUnitBottom = $event"
                            :hasProperty="hasMarginBottom"
                            :property="marginBottom"
                            :propertyUnit="marginUnitBottom"
                            :classList="['bottom-margin','margin']"
                            :contextMenuName="value.uuid.concat('-margin-bottom-box')"
                        />
                        
                        <site-box-model-element 
                            :propAuto="marginLeftAuto"
                            :setPropAuto="true"
                            @clickAuto="setPropMarginAuto(marginManager.leftProperty)"
                            @changeHasProp="hasMarginLeft = $event"
                            @changeProp="marginLeft = $event"
                            @changePropUnit="marginUnitLeft = $event"
                            :hasProperty="hasMarginLeft"
                            :property="marginLeft"
                            :propertyUnit="marginUnitLeft"
                            :classList="['left-margin','margin']"
                            :contextMenuName="value.uuid.concat('-margin-left-box')"
                        />
                        
                        <site-box-model-element 
                            :propAuto="marginRightAuto"
                            :setPropAuto="true"
                            @clickAuto="setPropMarginAuto(marginManager.rightProperty)"
                            @changeHasProp="hasMarginRight = $event"
                            @changeProp="marginRight = $event"
                            @changePropUnit="marginUnitRight = $event"
                            :hasProperty="hasMarginRight"
                            :property="marginRight"
                            :propertyUnit="marginUnitRight"
                            :classList="['right-margin','margin']"
                            :contextMenuName="value.uuid.concat('-margin-right-box')"
                        />
                        
                        
                        <site-box-model-element 
                            :globalEl="true"
                            @changeHasProp="hasMarginGlobal = $event"
                            @changeProp="marginGlobal = $event"
                            @changePropUnit="marginUnitGlobal = $event"
                            :hasProperty="hasMarginGlobal"
                            :property="marginGlobal"
                            :propertyUnit="marginUnitGlobal"
                            :classList="['global-margin','margin']"
                            :contextMenuName="value.uuid.concat('-margin-global-box')"
                        />
                        <div class="border-box-model">
                            <border-site-model-element
                                @changeProperty="marginUnitTop = $event"
                                :property="borderTop"
                                :borderManager="borderManager"
                                :classList="['top-border','border']"
                                :contextMenuName="value.uuid.concat('-border-top-box')"
                            />
                            <border-site-model-element
                                :globalEl="true"
                                @changeProperty="marginUnitTop = $event"
                                :property="borderGlobal"
                                :borderManager="borderManager"
                                :classList="['global-border','border']"
                                :contextMenuName="value.uuid.concat('-border-global-box')"
                            />
                            <div class="right-border border"></div>
                            <div class="bottom-border border"></div>
                            <div class="left-border border"></div>
                            <div class="padding-box-model">
                                
                                    <site-box-model-element
                                        @changeHasProp="hasPaddingTop = $event"
                                        @changeProp="paddingTop = $event"
                                        @changePropUnit="paddingUnitTop = $event"
                                        :hasProperty="hasPaddingTop"
                                        :property="paddingTop"
                                        :propertyUnit="paddingUnitTop"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-top-box')"
                                    />
                                    <site-box-model-element
                                        @changeHasProp="hasPaddingBottom = $event"
                                        @changeProp="paddingBottom = $event"
                                        @changePropUnit="paddingUnitBottom = $event"
                                        :hasProperty="hasPaddingBottom"
                                        :property="paddingBottom"
                                        :propertyUnit="paddingUnitBottom"
                                        :classList="['bottom-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-bottom-box')"
                                    />
                                    
                                    <site-box-model-element 
                                        @changeHasProp="hasPaddingLeft = $event"
                                        @changeProp="paddingLeft = $event"
                                        @changePropUnit="paddingUnitLeft = $event"
                                        :hasProperty="hasPaddingLeft"
                                        :property="paddingLeft"
                                        :propertyUnit="paddingUnitLeft"
                                        :classList="['left-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-left-box')"
                                    />
                                    
                                    <site-box-model-element 
                                        @changeHasProp="hasPaddingRight = $event"
                                        @changeProp="paddingRight = $event"
                                        @changePropUnit="paddingUnitRight = $event"
                                        :hasProperty="hasPaddingRight"
                                        :property="paddingRight"
                                        :propertyUnit="paddingUnitRight"
                                        :classList="['right-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-right-box')"
                                    />
                                    
                                    <site-box-model-element 
                                        @changeHasProp="hasPaddingRight = $event"
                                        @changeProp="paddingRight = $event"
                                        @changePropUnit="paddingUnitRight = $event"
                                        :hasProperty="hasPaddingRight"
                                        :property="paddingRight"
                                        :propertyUnit="paddingUnitRight"
                                        :classList="['right-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-right-box')"
                                    />
                                    
                                    <site-box-model-element 
                                        :globalEl="true"
                                        @changeHasProp="hasPaddingGlobal = $event"
                                        @changeProp="paddingGlobal = $event"
                                        @changePropUnit="paddingUnitGlobal = $event"
                                        :hasProperty="hasPaddingGlobal"
                                        :property="paddingGlobal"
                                        :propertyUnit="paddingUnitGlobal"
                                        :classList="['global-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-padding-global-box')"
                                    />
                                        
                                    
    
                                <div class="content-box-model">
                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="content-item__elem_container "> -->
                    
                <!-- <div  class=" content-item__elem_container flex-center">
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
                    
                </div> -->
            
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
import BaseBorderCss from '../../src/Css/Border/BaseBorderCss';

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
        set paddingUnitTop(newVal: UnitSize)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.topProperty)
        }
        
        get paddingUnitTop(): UnitSize
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
        set paddingUnitRight(newVal: UnitSize)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.rightProperty)
        }
        
        get paddingUnitRight(): UnitSize
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
        set paddingUnitBottom(newVal: UnitSize)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.bottomProperty)
        }
        
        get paddingUnitBottom(): UnitSize
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
        set paddingUnitLeft(newVal: UnitSize)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.leftProperty)
        }
        
        get paddingUnitLeft(): UnitSize
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
        
        set paddingUnitGlobal(newVal: UnitSize)
        {
            this.setPropPaddingUnit(newVal, this.paddingManager.globalProperty)
            this.setDirectionsPaddingsFromVal(this.paddingManager.globalProperty.getClearValue(), this.paddingManager.globalProperty.getUnit())
        }
        
        get paddingUnitGlobal(): UnitSize
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

        // MARGIN TOP
        set marginUnitTop(newVal: UnitSize)
        {
            this.setPropMarginUnit(newVal, this.marginManager.topProperty)
        }
        
        get marginUnitTop(): UnitSize
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
        set marginUnitRight(newVal: UnitSize)
        {
            this.setPropMarginUnit(newVal, this.marginManager.rightProperty)
        }
        
        get marginUnitRight(): UnitSize
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
        set marginUnitBottom(newVal: UnitSize)
        {
            this.setPropMarginUnit(newVal, this.marginManager.bottomProperty)
        }
        
        get marginUnitBottom(): UnitSize
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
        set marginUnitLeft(newVal: UnitSize)
        {
            this.setPropMarginUnit(newVal, this.marginManager.leftProperty)
        }
        
        get marginUnitLeft(): UnitSize
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
            return (<BaseMarginCss>this.marginManager.leftProperty).isAuto()

        }

        // MARGIN GLOBAL
        
        set marginUnitGlobal(newVal: UnitSize)
        {
            this.setPropMarginUnit(newVal, this.marginManager.globalProperty)
            this.setDirectionsMarginsFromVal(this.marginManager.globalProperty.getClearValue(), this.marginManager.globalProperty.getUnit())
        }
        
        get marginUnitGlobal(): UnitSize
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


        // *****************************************  BORDER ****************************************************


        get borderTop(): BaseBorderCss
        {
            return this.borderManager.topProperty
        }
        
        get borderGlobal(): BaseBorderCss
        {
            return this.borderManager.globalProperty
        }

        // *****************************************  BORDER - END ****************************************************

        private getHasProp(prop: BasePropertyCss){
            return  prop.active
        }
        
        private getUnitPropVal(prop: BasePropertyCss){
            if (!prop) {
                return null
            }
            console.log('GET paddingUnitGlobal', prop.getUnit());
            if (prop.getUnit()) {
                return prop.getUnit()
            }

            return null
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
            var newUnit = newVal
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
    
        .auto-prop {
        background-color: red;
        // padding: 3px;
        // margin-left: 3px;
        // border-radius: 5px;
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
    .w-400 {
        width: 400px;
    }
    
    .h-400 {
        height: 400px;
    }
</style>
