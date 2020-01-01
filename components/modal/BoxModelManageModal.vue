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
                    Wyrównanie tekstu
                </h4>
                <div class=" content-item__elem_container">
                    <!-- <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Padding-right

                        </div>
                        <div class="item">
                            <input type="checkbox" v-model="hasPaddingTop" name="hasPaddingTop" id="padding-top-check">

                        </div>
                        <div class="item" >
                            Value
                            <input class="item" type="number" v-model="paddingTop" name="paddingTop" id="padding-top">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitTop" class="item" v-model="paddingUnitTop" id="paddingUnitTop">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Padding-right

                        </div>
                        <div class="item">
                            <input type="checkbox" v-model="hasPaddingRight" name="hasPaddingRight" id="padding-right-check">

                        </div>
                        <div class="item" >
                            Value
                            <input class="item" type="number" v-model="paddingRight" name="paddingRight" id="padding-right">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitRight" class="item" v-model="paddingUnitRight" id="paddingUnitRight">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Padding-bottom

                        </div>
                        <div class="item">
                            <input type="checkbox" v-model="hasPaddingBottom" name="hasPaddingBottom" id="padding-bottom-check">

                        </div>
                        <div class="item" >
                            Value
                            <input class="item" type="number" v-model="paddingBottom" name="paddingBottom" id="padding-bottom">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitBottom" class="item" v-model="paddingUnitBottom" id="paddingUnitBottom">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit">{{ unit.name }}</option>
                        </select>
                    </div>
   -->
                    <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Padding-left

                        </div>
                        <label for="padding-left" class="item">
                            <input type="checkbox" v-model="hasPaddingLeft" name="hasPaddingLeft" id="padding-left-check">

                        </label>
                        <label class="item" for="padding-right">
                            Value
                            <input class="item" type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitLeft" class="item" v-model="paddingUnitLeft" id="paddingUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
                <div class=" content-item__elem_container">
                    <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Padding-global

                        </div>
                        <label for="padding-global" class="item">
                            <input type="checkbox" v-model="hasPaddingGlobal" name="hasPaddingGlobal" id="padding-global-check">

                        </label>
                        <label class="item" for="padding-global">
                            Value
                            <input class="item" type="number" v-model="paddingGlobal" name="paddingGlobal" id="padding-global">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="paddingUnitGlobal" class="item" v-model="paddingUnitGlobal" id="paddingUnitGlobal">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <!-- <div class="content-item">
                <h4 class="content-item__header">
                    Pogrubienie tekstu
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in fontWeights" :key="el">
                        <label :for="'fontWeight-' + el">
                            {{ el }}
                            <input type="radio" v-model="fontWeight" :value="el" name="fontWeight" :id="'fontWeight-' + el">

                        </label>
                    </li>
                </ul>
            </div> -->
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
    import Named from '../../src/Unit/Color/Named';
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

    @Component
    export default class BoxModelManageModal extends AbstractModal {
      
        DEFAULT_PADDING = 0
        DEFAULT_PADDING_UNIT = new Pixel()
        paddingLeftData: BasePaddingCss = new PaddingLeftCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
        paddingGlobalData: BasePaddingCss = new PaddingCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)

        paddingRealFetcher: FetcherRealCssProp
        
        timeout
        // value: HtmlTag
        paddingMarginUnits: UnitSize[] = []
        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()
        // _paddingLeft: BasePaddingCss

        idName = 'text-property-modal'

        created()
        {
            this.paddingMarginUnits.push(new Pixel())
            this.paddingMarginUnits.push(new Percent())
            this.paddingMarginUnits.push(new EM())
            this.paddingMarginUnits.push(new REM())
            this.paddingMarginUnits.push(new VW())
            this.paddingMarginUnits.push(new VH())

            this.paddingGlobalData.setActive(false)
            this.paddingLeftData.setActive(false)

        }

        createDefaultPaddingProp()
        {

        }

        show(val: HtmlTag){
            super.show(val)
            this.paddingRealFetcher = this.value.paddingRealFetcher
            this.initPaddings()
        }

        initPaddings()
        {
            // var propLeft = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            // var propGlobal = this.getPropertyCssFromModel(PaddingCss.PROP_NAME)
            // console.log(propLeft);
            // console.log(propGlobal);
            let leftPadding = this.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME)
            let leftPaddingUnit = this.paddingRealFetcher.fetchUnit(PaddingLeftCss.PROP_NAME)
            
            if (leftPadding) {
                this.paddingLeftData.setActive(true)
                this.paddingLeftData.setValue(leftPadding)
            }  
            if (leftPaddingUnit) {
                this.paddingLeftData.setUnit(leftPaddingUnit)

            }
            
            let globalPadding = this.paddingRealFetcher.fetchPropValue(PaddingCss.PROP_NAME)
            let globalPaddingUnit = this.paddingRealFetcher.fetchUnit(PaddingCss.PROP_NAME)
            
            if (globalPadding) {
                this.paddingGlobalData.setActive(true)
                this.paddingGlobalData.setValue(globalPadding)
            }  
            if (globalPaddingUnit) {
                this.paddingGlobalData.setUnit(globalPaddingUnit)

            }

            // else {
            //     console.log('9999999')
            //     this.paddingLeftData.setActive(false)
            // }
            
            // if (propGlobal) {
            //     console.log('START');
            //     console.log(this.paddingGlobalData);

            //     console.log(this.paddingGlobalData);
            //     this.paddingGlobalData.setActive(true)
            //     this.paddingGlobalData.setUnit(propGlobal.getUnit())
            //     this.paddingGlobalData.setValue(propGlobal.getClearValue())
            //     console.log(this.paddingGlobalData);
            //     // console.log(a);
                
            //     // let a = this.paddingGlobal
                
            // }
            //  else {
            //     console.log('9999999')
            //     this.paddingGlobalData.setActive(false)
            // }
            // this.paddingLeftData.setValue(this.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME))
            // this.paddingGlobalData.setValue(this.paddingRealFetcher.fetchPropValue(PaddingCss.PROP_NAME))

            
        }


        getCurrentValueCssProp(){
            var prop = this.getPropertyFromModel(PaddingLeftCss.PROP_NAME)
        }

        

        deactivePaddingProp(prop: BasePaddingCss): any {
            this.value.cssAccessor.removePropWithName(prop.getName())
            this.value.paddingFilter.deactivateProp(prop)
            return null
        }

        activePaddingProp(prop: BasePaddingCss): any {
            if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
                this.value.cssAccessor.addNewProperty(prop)

            }
            console.log('activr');
            
            this.value.paddingFilter.activateProp(prop)
            return prop
        }

        updateCssPropWithPadingFilter(newProp: BasePropertyCss)
        {
            console.log('ALA MA');
            console.log(newProp.getUnit());
            console.log(newProp);
            let val = this.value.getComputedCssVal(newProp)
            let clonedCss = _.cloneDeep(newProp)
            clonedCss.setValue(parseInt(val).toString())
            clonedCss.setUnit(new Pixel())
            console.log(newProp);
            console.log(val);
            console.log(clonedCss);
            console.log('ALA MA');
            this.value.paddingFilter.injectCssProperty(clonedCss)
            console.log(newProp);
            
            this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

            return newProp.getClearValue()
        }

        

        getUnitFromPropName(name: string) 
        {
            let prop = this.getPropertyCssFromModel(name)
            if (prop) {
                return <UnitSize>prop.getUnit()
            }
            return null
        }
        

        set paddingUnitLeft(newVal: string)
        {
            if (!this.paddingLeftData) {
                return 
            }
            if (!this.paddingLeftData.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            console.log('SET paddingUnitLeft', newVal);
            var newUnit = this.getUnitByName(this.paddingMarginUnits, newVal)
            // this.updateUnitInModel(newUnit, PaddingLeftCss.PROP_NAME)
            this.paddingLeftData.setUnit(newUnit)
            this.updateCssPropWithPadingFilter(this.paddingLeftData)

        }
        
        get paddingUnitLeft(): string
        {
            if (!this.paddingLeftData) {
                return ''
            }
            console.log('GET paddingUnitLeft', this.paddingLeftData.getUnit());
            if (this.paddingLeftData.getUnit()) {
                return this.paddingLeftData.getUnit().name

            }

            return ''
        }
        
        get paddingLeft(): number
        {
            if (!this.paddingLeftData) {
                return 0
            }
            // this._paddingLeft = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            console.log('GET paddingLeft', this.paddingLeftData.getClearValue());
            // console.log(this._paddingLeft.getClearValue().toString());
            var v = this.paddingLeftData.getClearValue()
            
            if (this.paddingGlobalData.getUnit() instanceof Pixel) {
                return parseInt(v)

            }

            return parseFloat(v)
        }
        
        set paddingLeft(newVal: number)
        {
            if (!this.paddingLeftData) {
                return 
            }
            if (!this.paddingLeftData.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            this.paddingLeftData.setValue(newVal.toString())
            var a = this.updateCssPropWithPadingFilter(this.paddingLeftData)
            console.log('SET paddingLeft', newVal);
            // this._paddingLeft = null
            console.log(this.paddingLeftData);
            
        }
        
        get hasPaddingLeft(): boolean
        {
            if (!this.paddingLeftData) {
                return false
            }
            console.log('hasPaddingLeft', this.paddingLeftData.getUnit());
            console.log(this.paddingLeftData);
            
            return  this.paddingLeftData.getActive()
        }
        
        set hasPaddingLeft(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            if (!newVal) {
                console.log('FALSE');
                
                this.paddingLeftData.setActive(false)
                this.deactivePaddingProp(new PaddingLeftCss(null, null))
            } else {
                console.log('TRUE');
                if (!this.paddingLeftData) {
                    this.paddingLeftData = new PaddingLeftCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
                }
                this.paddingLeftData.setActive(true)
                let defaultPadding = this.paddingLeftData

                this.activePaddingProp(defaultPadding)
                
            }
        }
        
        
        set paddingUnitGlobal(newVal: string)
        {
            if (!this.paddingGlobalData.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            console.log('SET paddingUnitGlobal', newVal);
            var newUnit = this.getUnitByName(this.paddingMarginUnits, newVal)
            // this.updateUnitInModel(newUnit, PaddingCss.PROP_NAME)
            this.paddingGlobalData.setUnit(newUnit)
            this.updateCssPropWithPadingFilter(this.paddingGlobalData)

        }
        
        get paddingUnitGlobal(): string
        {
            if (!this.paddingGlobalData) {
                return ''
            }
            console.log('GET paddingUnitGlobal', this.paddingGlobalData.getUnit());
            if (this.paddingGlobalData.getUnit()) {
                return this.paddingGlobalData.getUnit().name
            }

            return ''
        }
        
        get paddingGlobal(): number
        {
            if (!this.paddingGlobalData) {
                return 0
            }
            // this._paddingLeft = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            console.log('GET paddingGlobal', this.paddingGlobalData.getClearValue());
            // console.log(this._paddingLeft.getClearValue().toString());
            var v = this.paddingGlobalData.getClearValue()
            
            if (this.paddingGlobalData.getUnit() instanceof Pixel) {
                return parseInt(v)

            }

            return parseFloat(v)
        }
        
        set paddingGlobal(newVal: number)
        {
            if (!this.paddingGlobalData) {
                return
            }
            if (!this.paddingGlobalData.isActive()) {
                return
            }
            if (!newVal) {
                return
            }
            this.paddingGlobalData.setValue(newVal.toString())
            console.log('SET paddingGlobal', newVal);
            var a = this.updateCssPropWithPadingFilter(this.paddingGlobalData)
            // this._paddingLeft = null
            console.log(this.paddingGlobalData);
            
        }
        
        get hasPaddingGlobal(): boolean
        {
            
            if (!this.paddingGlobalData) {
                return false
            }
            console.log('hasPaddingLeft', this.paddingGlobalData.getUnit());
            console.log(this.paddingGlobalData);
            
            return  this.paddingGlobalData.getActive()
        }
        
        set hasPaddingGlobal(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            if (!newVal) {
                console.log('FALSE');
                
                this.paddingGlobalData.setActive(false)
                this.deactivePaddingProp(new PaddingCss(null, null))
            } else {
                console.log('TRUE');
                this.paddingGlobalData.setActive(true)
                let defaultPadding = this.paddingGlobalData

                this.activePaddingProp(defaultPadding)
                
            }
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    
</style>
