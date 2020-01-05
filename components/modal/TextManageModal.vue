<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Zarządzaj tekstem
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Wyrównianie tekstu
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in textAligns" :key="el">
                        <label :for="'textAlign-' + el">
                            {{ el }}
                            <input type="radio" v-model="textAlign" :value="el" name="textAlign" :id="'textAlign-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item">
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
            </div>
            <div class=" content-item__elem_container">
                    <div class="content-item__elem content-item__elem-4" >
                        <div class="item">
                            Font-size

                        </div>
                        <label for="has-font-size" class="item">
                            <input v-if="fontSizeUnit" type="checkbox" v-model="hasFontSize" name="hasFontSize" id="has-font-size">
                            <input v-else disabled type="checkbox" v-model="hasFontSize" name="hasFontSize" id="has-font-size">

                        </label>
                        <label class="item" for="font-size">
                            Value
                            <input class="item" type="number" v-model="fontSize" name="fontSize" id="font-size">
                        </label>
                        <div class="item">
                            Unit
                        </div> 
                        <select name="fontSizeUnit" class="item" v-model="fontSizeUnit" id="fontSizeUnit">
                            <option disabled value="">Please select one</option>
                            <option v-for="unit in units" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
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
    import {Pagination} from "~/types/Pagination";
    import HtmlTag from '../../src/Layout/HtmlTag';
    import TextAlign from '../../src/Css/Text/TextAlign';
    import BaseModal from '~/components/BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';
    import CssPropertyAccessor from '../../src/Css/CssPropertyAccessor';
    import AbstractModal from '../AbstractModal';
    import Named from '../../src/Unit/Color/Named';
import UnitSize from '~/src/Unit/UnitSize';
import Pixel from '~/src/Unit/Size/Pixel';
import Percent from '~/src/Unit/Size/Percent';
import VW from '~/src/Unit/Size/VW';
import EM from '~/src/Unit/Size/EM';
import REM from '~/src/Unit/Size/REM';
import FontSize from '../../src/Css/Text/FontSize';

    @Component
    export default class TextManageModal extends AbstractModal {
        
        timeout
        // value: HtmlTag
        DEFAULT_FONT_SIZE = 20
        DEFAULT_FONT_SIZE_UNIT = new EM()
        fontSizeData = new FontSize(this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE_UNIT)
        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()

        units: UnitSize[] = []

        idName = 'text-property-modal'

        get hashID(): string
        {
            return this.idName
        }

        created() 
        {
            this.units.push(new Pixel())
            this.units.push(new Percent())
            this.units.push(new VW())
            this.units.push(new EM())
            this.units.push(new REM())
        }

        show(val: HtmlTag){
            super.show(val)
            var propLeft = this.getPropertyCssFromModel(FontSize.PROP_NAME)
            if (propLeft) {
                this.fontSizeData.setActive(true)
                this.fontSizeData.setUnit(propLeft.getUnit())
                this.fontSizeData.setValue(propLeft.getClearValue())
            } else {
                console.log('9999999')
                this.fontSizeData.setActive(false)
            }
            
        }

        deactiveProp(prop: BasePropertyCss): any {
            this.value.cssAccessor.removePropWithName(prop.getName())
            // this.value.paddingFilter.deactivateProp(prop)
            return null
        }

        activeProp(prop: BasePropertyCss): any {
            if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
                this.value.cssAccessor.addNewProperty(prop)

            }
            console.log('activr');
            
            // this.value.paddingFilter.activateProp(prop)
            return prop
        }

        get textAlign()
        {
            return this.getPropertyFromModel(TextAlign.PROP_NAME)
        }
        
        set textAlign(newVal: string)
        {
            this.setPropertyToModel(new TextAlign(newVal, new Named())) 
        }
        
        get fontWeight()
        {
            return this.getPropertyFromModel(FontWeight.PROP_NAME)
        }
        
        set fontWeight(newVal: string)
        {
            console.log(newVal);
            this.setPropertyToModel(new FontWeight(newVal, new Named())) 
        }

        set fontSizeUnit(newVal: string)
        {
            console.log('SET paddingUnitGlobal', newVal);
            var newUnit = this.getUnitByName(this.units ,newVal)
            this.updateUnitInModel(newUnit, FontSize.PROP_NAME)
            this.fontSizeData.setUnit(newUnit)
        }
        
        get fontSizeUnit(): string
        {
            console.log('GET paddingUnitGlobal', this.fontSizeData.getUnit());

            if (this.fontSizeData.getUnit()) {
                return this.fontSizeData.getUnit().name
            }

            return ''
        }
        
        get fontSize(): number
        {
            // this._paddingLeft = this.getPropertyCssFromModel(PaddingLeftCss.PROP_NAME)
            console.log('GET paddingGlobal', this.fontSizeData.getClearValue());
            // console.log(this._paddingLeft.getClearValue().toString());
            var v = this.fontSizeData.getClearValue()
            
            return parseFloat(v)
        }
        
        set fontSize(newVal: number)
        {
            if (!this.fontSizeData.isActive()) {
                return
            }

            console.log('SET fontSize', newVal);
            if (!newVal) {
                return
            }
            var newProp = new FontSize(newVal, this.fontSizeData.getUnit())
            this.value.updateCssProperty(newProp.getName(), newProp)
            // this._paddingLeft = null
            this.fontSizeData.setValue(newProp.getClearValue())
            console.log(this.fontSizeData);
            
        }
        
        get hasFontSize(): boolean
        {
            console.log('hasPaddingLeft', this.fontSizeData.getUnit());
            console.log(this.fontSizeData);
            
            return  this.fontSizeData.active
        }
        
        set hasFontSize(newVal: boolean)
        {
            // console.log('hasPaddingLeft', newVal);
            if (!newVal) {
                console.log('FALSE');
                
                this.fontSizeData.setActive(false)
                this.deactiveProp(new FontSize(null, null))
            } else {
                console.log('TRUE');
                this.fontSizeData.setActive(true)
                let defaultPadding = this.fontSizeData

                this.activeProp(defaultPadding)
                
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
