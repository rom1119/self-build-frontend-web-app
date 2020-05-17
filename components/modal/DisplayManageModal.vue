<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Pozycjonowanie elementu
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Sposób wyświetlania
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in displays" :key="el">
                        <label :for="'display-' + el">
                            {{ el }}
                            <input type="radio" v-model="display" :value="el" name="display" :id="'display-' + el">

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
import { Width, Display } from '~/src/Css';
import DisplayManageModal from '../DisplayManageModal';

    @Component
    export default class DisplayManageModalComponent extends DisplayManageModal {
      
        timeout
        // value: HtmlTag

        
        displays: string[] = Display.getAccessableProperty()
        // _paddingLeft: BasePaddingCss

        

        idName = 'text-property-modal'

        created()
        {

            
        }

        // *****************************************  WIDTH ****************************************************
        
        get display()
        {
            return  this.displayManager.getProperty().value
        }
        
        set display(newVal: string)
        {
            this.displayManager.getProperty().setValue(newVal)
            this.displayManager.updateCssProp(this.displayManager.getProperty())             
        }
        
        // get widthUnit()
        // {
        //     return  this.widthManager.getProperty().getUnit()
        // }
        
        // set widthUnit(newVal: UnitSize)
        // {
        //     this.widthManager.getProperty().setUnit(newVal)
        //     this.widthManager.updateCssProp(this.widthManager.getProperty())             
        // }        

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
    
    .w-50-pr {
        width: 50%;
    }
    
    .h-400 {
        height: 400px;
    }
</style>
