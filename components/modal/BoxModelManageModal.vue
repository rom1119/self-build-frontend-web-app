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
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitTop" class=" item" v-model="paddingUnitTop" id="paddingUnitTop">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                    <div :class="{'active': hasPaddingRight}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingRight === true ? hasPaddingRight = false : hasPaddingRight = true" class="item">
                            Padding-right
                        </div>
                        <div class="item" >
                            Value
                            <input v-if="hasPaddingRight" class="item" type="number" v-model="paddingRight" name="paddingRight" id="padding-right">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingRight" name="paddingRight" id="padding-right">

                        </div>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingRight" name="paddingUnitRight" class="item" v-model="paddingUnitRight" id="paddingUnitRight">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitRight" class=" item" v-model="paddingUnitRight" id="paddingUnitRight">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
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
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitBottom" class=" item" v-model="paddingUnitBottom" id="paddingUnitBottom">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
   
                    <div :class="{'active': hasPaddingLeft}" class="content-item__elem content-item__elem-4" >
                        <div @click="hasPaddingLeft === true ? hasPaddingLeft = false : hasPaddingLeft = true" class="item">
                            Padding-left

                        </div>
                        <label class="item" for="padding-left">
                            Value
                            <input v-if="hasPaddingLeft" class="item" type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">
                            <input v-else disabled class="disabled item" type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select v-if="hasPaddingLeft" name="paddingUnitLeft" class="item" v-model="paddingUnitLeft" id="paddingUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                        <select v-else disabled name="paddingUnitLeft" class=" item" v-model="paddingUnitLeft" id="paddingUnitLeft">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
                        </select>
                    </div>
                    
                </div>
                <div  class=" content-item__elem_container">
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
import BoxModelModal from '../BoxModelModal';
import PaddingBottomCss from '~/src/Css/BoxModel/Padding/PaddingBottomCss';
import PaddingTopCss from '~/src/Css/BoxModel/Padding/PaddingTopCss';

    @Component
    export default class BoxModelManageModal extends BoxModelModal {
      
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
        }

        // PADDING RIGHT
        set paddingUnitTop(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingTopData)
        }
        
        get paddingUnitTop(): string
        {
            return this.getUnitPropVal(this.paddingTopData)
        }
        
        get paddingTop(): number
        {
            return this.getProp(this.paddingTopData, 0)
        }
        
        set paddingTop(newVal: number)
        {
            this.setPadding(newVal, this.paddingTopData)
        }
        
        get hasPaddingTop(): boolean
        {
            return  this.getHasProp(this.paddingTopData)
        }
        
        set hasPaddingTop(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingTopData, new PaddingTopCss(null, null))
        }

        // PADDING RIGHT
        set paddingUnitRight(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingRightData)
        }
        
        get paddingUnitRight(): string
        {
            return this.getUnitPropVal(this.paddingRightData)
        }
        
        get paddingRight(): number
        {
            return this.getProp(this.paddingRightData, 0)
        }
        
        set paddingRight(newVal: number)
        {
            this.setPadding(newVal, this.paddingRightData)
        }
        
        get hasPaddingRight(): boolean
        {
            return  this.getHasProp(this.paddingRightData)
        }
        
        set hasPaddingRight(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingRightData, new PaddingRightCss(null, null))
        }

        // PADDING BOTTOM
        set paddingUnitBottom(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingBottomData)
        }
        
        get paddingUnitBottom(): string
        {
            return this.getUnitPropVal(this.paddingBottomData)
        }
        
        get paddingBottom(): number
        {
            return this.getProp(this.paddingBottomData, 0)
        }
        
        set paddingBottom(newVal: number)
        {
            this.setPadding(newVal, this.paddingBottomData)
        }
        
        get hasPaddingBottom(): boolean
        {
            return  this.getHasProp(this.paddingBottomData)
        }
        
        set hasPaddingBottom(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingBottomData, new PaddingBottomCss(null, null))
        }

        // PADDING LEFT
        set paddingUnitLeft(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingLeftData)
        }
        
        get paddingUnitLeft(): string
        {
            return this.getUnitPropVal(this.paddingLeftData)
        }
        
        get paddingLeft(): number
        {
            return this.getProp(this.paddingLeftData, 0)
        }
        
        set paddingLeft(newVal: number)
        {
            this.setPadding(newVal, this.paddingLeftData)
        }
        
        get hasPaddingLeft(): boolean
        {
            return  this.getHasProp(this.paddingLeftData)
        }
        
        set hasPaddingLeft(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPadding(newVal, this.paddingLeftData, new PaddingLeftCss(null, null))
        }

        // PADDING GLOBAL
        
        set paddingUnitGlobal(newVal: string)
        {
            this.setPropPaddingUnit(newVal, this.paddingGlobalData)
            this.setDirectionsPaddingsFromVal(this.paddingGlobalData.getClearValue(), this.paddingGlobalData.getUnit())
        }
        
        get paddingUnitGlobal(): string
        {
            return this.getUnitPropVal(this.paddingGlobalData)
        }
        
        get paddingGlobal(): number
        {
            return this.getProp(this.paddingGlobalData, 0)
        }
        
        set paddingGlobal(newVal: number)
        {
            this.setPadding(newVal, this.paddingGlobalData)
            this.setDirectionsPaddingsFromVal(this.paddingGlobalData.getClearValue(), this.paddingGlobalData.getUnit())
        }
        
        get hasPaddingGlobal(): boolean
        {
            
            // console.log('hasPaddingLeft', this.paddingGlobalData.getUnit());
            // console.log(this.paddingGlobalData);
            
            return  this.getHasProp(this.paddingGlobalData)
        }
        
        set hasPaddingGlobal(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            this.setHasPropPaddingGlobal(newVal, this.paddingGlobalData, new PaddingCss(null, null))
        }

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
                if (defaultVal) {
                    return defaultVal
                }
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
            var newUnit = this.getUnitByName(this.paddingMarginUnits, newVal)
            // this.updateUnitInModel(newUnit, PaddingCss.PROP_NAME)
            prop.setUnit(newUnit)
            this.updateCssPropWithPadingFilter(prop)

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
            var a = this.updateCssPropWithPadingFilter(prop)
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
</style>
