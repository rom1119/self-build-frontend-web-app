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
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit">{{ unit.name }}</option>
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

    @Component
    export default class BoxModelManageModal extends AbstractModal {
      
      
        
        timeout
        // value: HtmlTag
        paddingMarginUnits: UnitSize[] = []

        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()

        _currentPaddingUnit: UnitSize
        _currentMarginUnit: UnitSize
        _paddingLeft

        idName = 'text-property-modal'

        created()
        {
            this.paddingMarginUnits.push(new Pixel())
            this.paddingMarginUnits.push(new Percent())
            this.paddingMarginUnits.push(new EM())
            this.paddingMarginUnits.push(new REM())

            this.currentPaddingUnit = this.paddingMarginUnits[0]
            this.currentMarginUnit = this.paddingMarginUnits[0]
        }

        deactiveCssProp(prop: BasePaddingCss): any {
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
            this.value.paddingFilter.injectCssProperty(newProp)
            console.log(newProp);
            
            this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)
        }

        updateUnitInModel(unit: UnitSize)
        {
            console.log('1111111111');
            
            let prop = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            if (prop) {
            console.log('222222');
            console.log(unit);
                prop.setUnit(unit)
                this.setPropertyToModel(prop)
                this.value.paddingFilter.injectCssProperty(prop)
            }
        }

        getUnitFromPropName(name: string) 
        {
            let prop = this.getPropertyCssFromModel(name)
            if (prop) {
                return <UnitSize>prop.getUnit()
            }
            return null
        }

        set paddingUnitLeft(newVal: UnitSize)
        {
            this.updateUnitInModel(newVal)
        }
        
        get paddingUnitLeft(): UnitSize
        {
            return this.getUnitFromPropName(PaddingLeftCss.PROP_NAME)
        }

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        get paddingAll()
        {
            return this.getPropertyFromModel(PaddingRightCss.PROP_NAME)
        }
        
        set paddingAll(newVal: string)
        {
            this.setPropertyToModel(new PaddingRightCss(newVal, new Pixel())) 
        }
        
        get paddingRight()
        {

            return this.getPropertyFromModel(PaddingRightCss.PROP_NAME)
        }
        
        set paddingRight(newVal: string)
        {
            let newProp = new PaddingRightCss(newVal, new Pixel())
            this.value.paddingFilter.injectCssProperty(newProp)
            this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)
            // this.setPropertyToModel() 
        }
        
        get paddingLeft()
        {
            this._paddingLeft = this.getPropertyFromModel(PaddingLeftCss.PROP_NAME)
            return this._paddingLeft
        }
        
        set paddingLeft(newVal: string)
        {
            console.log('SET paddingLeft', newVal);
            this._paddingLeft = this.updateCssPropWithPadingFilter(new PaddingLeftCss(newVal, new Pixel()))
            
        }
        
        get hasPaddingLeft(): boolean
        {
            // console.log('hasPaddingLeft', this.getPropertyFromModel(PaddingLeftCss.PROP_NAME).length);
            
            return this._paddingLeft
        }
        
        set hasPaddingLeft(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            if (!newVal) {
                this._paddingLeft = this.deactiveCssProp(new PaddingLeftCss(null, null))
            } else {
                this._paddingLeft = this.activePaddingProp(new PaddingLeftCss(null, null))
                
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
