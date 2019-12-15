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
                    <li class="content-item__elem" >
                        <label for="padding-left">
                            Padding-left
                            <input type="number" v-model="paddingLeft" name="paddingLeft" id="padding-left">

                        </label>
                    </li>
                    
                    <li class="content-item__elem" >
                        <label for="padding-right">
                            Padding-right
                            <input type="number" v-model="paddingRight" name="paddingRight" id="padding-right">

                        </label>
                    </li>
                    <li class="content-item__elem" >
                        Padding Unit
                        <select name="paddingUnit" id="paddingUnit">
                            <option v-for="unit in paddingMarginUnits" :key="unit.name" :value="unit">{{ unit.name }}</option>
                        </select>
                    </li>
                </ul>
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

    @Component
    export default class BoxModelManageModal extends AbstractModal {
        
        timeout
        // value: HtmlTag
        paddingMarginUnits: UnitSize[] = []

        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()

        idName = 'text-property-modal'

        created()
        {
            this.paddingMarginUnits.push(new Pixel())
            this.paddingMarginUnits.push(new Percent())
            this.paddingMarginUnits.push(new EM())
            this.paddingMarginUnits.push(new REM())
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
            return this.getPropertyFromModel(TextAlign.PROP_NAME)
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
            return this.getPropertyFromModel(TextAlign.PROP_NAME)
        }
        
        set paddingLeft(newVal: string)
        {
            this.setPropertyToModel(new TextAlign(newVal, new Named())) 
        }
        


        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    
</style>
