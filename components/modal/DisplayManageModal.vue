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
            <div class="content-item" @dblclick="hasDisplay = !hasDisplay" :class="{'active': hasDisplay}">
                <h4 class="content-item__header">
                    Sposób wyświetlania ( Display )
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
            <div class="content-item" @dblclick="hasJustifyContent = !hasJustifyContent" :class="{'active': hasJustifyContent}">
                <h4 class="content-item__header">
                    Justify content
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in justifyContents" :key="el">
                        <label :for="'justifyContent-' + el">
                            {{ el }}
                            <input type="radio" v-model="justifyContent" :value="el" name="justifyContent" :id="'justifyContent-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item" @dblclick="hasAlignItems = !hasAlignItems" :class="{'active': hasAlignItems}">
                <h4 class="content-item__header">
                    Align items
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in alignItemsList" :key="el">
                        <label :for="'alignItems-' + el">
                            {{ el }}
                            <input type="radio" v-model="alignItems" :value="el" name="alignItems" :id="'alignItems-' + el">

                        </label>
                    </li>
                </ul>
            </div>
         
            
            <div class="content-item" @dblclick="hasFlexDirection = !hasFlexDirection" :class="{'active': hasFlexDirection}">
                <h4 class="content-item__header">
                    Flex directions
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in flexDirections" :key="el">
                        <label :for="'flexDirection-' + el">
                            {{ el }}
                            <input type="radio" v-model="flexDirection" :value="el" name="flexDirection" :id="'flexDirection-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            
            <div class="content-item" @dblclick="hasFlexWrap = !hasFlexWrap" :class="{'active': hasFlexWrap}">
                <h4 class="content-item__header">
                    Flex wrap
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in flexWraps" :key="el">
                        <label :for="'flexWrap-' + el">
                            {{ el }}
                            <input type="radio" v-model="flexWrap" :value="el" name="flexWrap" :id="'flexWrap-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item" >
                <h4 class="content-item__header">
                    Flex anothers
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" @dblclick="hasFlexOrder = !hasFlexOrder" :class="{'active': hasFlexOrder}">
                        <label :for="'flexOrder-'">
                            Flex order
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexOrder" name="flexOrder" :id="'flexOrder-'">

                        </label>
                    </li>
                    <li class="content-item__elem" @dblclick="hasFlexGrow = !hasFlexGrow" :class="{'active': hasFlexGrow}">
                        <label :for="'flexGrow-'">
                            Flex Grow
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexGrow" name="flexGrow" :id="'flexGrow-'">

                        </label>
                    </li>
                    <li class="content-item__elem" @dblclick="hasFlexBasis = !hasFlexBasis" :class="{'active': hasFlexBasis}">
                        <label :for="'flexBasis-'">
                            Flex Basis
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexBasis" name="flexBasis" :id="'flexBasis-'">

                        </label>
                    </li>
                    
                    <li class="content-item__elem" @dblclick="hasFlexShrink = !hasFlexShrink" :class="{'active': hasFlexShrink}">
                        <label :for="'flexShrink-'">
                            Flex Shrink
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexShrink" name="flexShrink" :id="'flexShrink-'">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item" @dblclick="hasFloat = !hasFloat" :class="{'active': hasFloat}">
                <h4 class="content-item__header">
                    Float
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in floats" :key="el">
                        <label :for="'float-' + el">
                            {{ el }}
                            <input type="radio" v-model="float" :value="el" name="float" :id="'float-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item" @dblclick="hasClear = !hasClear" :class="{'active': hasClear}">
                <h4 class="content-item__header">
                    Clear
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in clears" :key="el">
                        <label :for="'clear-' + el">
                            {{ el }}
                            <input type="radio" v-model="clear" :value="el" name="clear" :id="'clear-' + el">

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
import { Width, Display, JustifyContent, AlignItems, FlexDirection, FlexWrap, Float, Clear } from '~/src/Css';
import DisplayManageModal from '../DisplayManageModal';

    @Component
    export default class DisplayManageModalComponent extends DisplayManageModal {
      
        timeout
        // value: HtmlTag

        
        displays: string[] = Display.getAccessableProperty()
        justifyContents: string[] = JustifyContent.getAccessableProperty()
        alignItemsList: string[] = AlignItems.getAccessableProperty()
        flexDirections: string[] = FlexDirection.getAccessableProperty()
        flexWraps: string[] = FlexWrap.getAccessableProperty()
        floats: string[] = Float.getAccessableProperty()
        clears: string[] = Clear.getAccessableProperty()
        // _paddingLeft: BasePaddingCss

        

        idName = 'text-property-modal'

        created()
        {

        }

        // *****************************************  DISPLAY ****************************************************
        
        get display()
        {
            return  this.displayManager.getProperty().value
        }
        
        set display(newVal: string)
        {
            this.displayManager.getProperty().setValue(newVal)
            this.displayManager.updateCssProp(this.displayManager.getProperty())             
        }

        get hasDisplay()
        {
            return  this.displayManager.getProperty().active
        }
        
        set hasDisplay(newVal: boolean)
        {
            if (!newVal) {
                this.displayManager.deactivePropCss(this.displayManager.getProperty())
            } else {
                this.displayManager.activePropCss(this.displayManager.getProperty())
            }
        }
        
        // *****************************************  JUSTIFY-CONTENT ****************************************************
        
        get justifyContent()
        {
            return  this.justifyContentManager.getProperty().value
        }
        
        set justifyContent(newVal: string)
        {
            this.justifyContentManager.getProperty().setValue(newVal)
            this.justifyContentManager.updateCssProp(this.justifyContentManager.getProperty())             
        }

        get hasJustifyContent()
        {
            return  this.justifyContentManager.getProperty().active
        }
        
        set hasJustifyContent(newVal: boolean)
        {
            if (!newVal) {
                this.justifyContentManager.deactivePropCss(this.justifyContentManager.getProperty())
            } else {
                this.justifyContentManager.activePropCss(this.justifyContentManager.getProperty())
            }
        }
        
        // *****************************************  ALIGN-ITEMS ****************************************************
        
        get alignItems()
        {
            return  this.alignItemsManager.getProperty().value
        }
        
        set alignItems(newVal: string)
        {
            this.alignItemsManager.getProperty().setValue(newVal)
            this.alignItemsManager.updateCssProp(this.alignItemsManager.getProperty())             
        }

        get hasAlignItems()
        {
            return  this.alignItemsManager.getProperty().active
        }
        
        set hasAlignItems(newVal: boolean)
        {
            if (!newVal) {
                this.alignItemsManager.deactivePropCss(this.alignItemsManager.getProperty())
            } else {
                this.alignItemsManager.activePropCss(this.alignItemsManager.getProperty())
            }
        }
        
        // *****************************************  FlEX-DIRECTION ****************************************************
        
        get flexDirection()
        {
            return  this.flexDirectionManager.getProperty().value
        }
        
        set flexDirection(newVal: string)
        {
            this.flexDirectionManager.getProperty().setValue(newVal)
            this.flexDirectionManager.updateCssProp(this.flexDirectionManager.getProperty())             
        }

        get hasFlexDirection()
        {
            return  this.flexDirectionManager.getProperty().active
        }
        
        set hasFlexDirection(newVal: boolean)
        {
            if (!newVal) {
                this.flexDirectionManager.deactivePropCss(this.flexDirectionManager.getProperty())
            } else {
                this.flexDirectionManager.activePropCss(this.flexDirectionManager.getProperty())
            }
        }
        
        // *****************************************  FLEX-WRAP ****************************************************
        
        get flexWrap()
        {
            return  this.flexWrapManager.getProperty().value
        }
        
        set flexWrap(newVal: string)
        {
            this.flexWrapManager.getProperty().setValue(newVal)
            this.flexWrapManager.updateCssProp(this.flexWrapManager.getProperty())             
        }

        get hasFlexWrap()
        {
            return  this.flexWrapManager.getProperty().active
        }
        
        set hasFlexWrap(newVal: boolean)
        {
            if (!newVal) {
                this.flexWrapManager.deactivePropCss(this.flexWrapManager.getProperty())
            } else {
                this.flexWrapManager.activePropCss(this.flexWrapManager.getProperty())
            }
        }
        
        // *****************************************  FLEX-ORDER ****************************************************
        
        get flexOrder()
        {
            return  this.flexOrderManager.getProperty().value
        }
        
        set flexOrder(newVal: string)
        {
            this.flexOrderManager.getProperty().setValue(newVal)
            this.flexOrderManager.updateCssProp(this.flexOrderManager.getProperty())             
        }

        get hasFlexOrder()
        {
            return  this.flexOrderManager.getProperty().active
        }
        
        set hasFlexOrder(newVal: boolean)
        {
            if (!newVal) {
                this.flexOrderManager.deactivePropCss(this.flexOrderManager.getProperty())
            } else {
                this.flexOrderManager.activePropCss(this.flexOrderManager.getProperty())
            }
        }
        
        // *****************************************  FLEX-GROW ****************************************************
        
        get flexGrow()
        {
            return  this.flexGrowManager.getProperty().value
        }
        
        set flexGrow(newVal: string)
        {
            this.flexGrowManager.getProperty().setValue(newVal)
            this.flexGrowManager.updateCssProp(this.flexGrowManager.getProperty())             
        }

        get hasFlexGrow()
        {
            return  this.flexGrowManager.getProperty().active
        }
        
        set hasFlexGrow(newVal: boolean)
        {
            if (!newVal) {
                this.flexGrowManager.deactivePropCss(this.flexGrowManager.getProperty())
            } else {
                this.flexGrowManager.activePropCss(this.flexGrowManager.getProperty())
            }
        }
        
        // *****************************************  FLEX-BASIS ****************************************************
        
        get flexBasis()
        {
            return  this.flexBasisManager.getProperty().value
        }
        
        set flexBasis(newVal: string)
        {
            this.flexBasisManager.getProperty().setValue(newVal)
            this.flexBasisManager.updateCssProp(this.flexBasisManager.getProperty())             
        }

        get hasFlexBasis()
        {
            return  this.flexBasisManager.getProperty().active
        }
        
        set hasFlexBasis(newVal: boolean)
        {
            if (!newVal) {
                this.flexBasisManager.deactivePropCss(this.flexBasisManager.getProperty())
            } else {
                this.flexBasisManager.activePropCss(this.flexBasisManager.getProperty())
            }
        }
        
        // *****************************************  FLEX-SHRINK ****************************************************
        
        get flexShrink()
        {
            return  this.flexShrinkManager.getProperty().value
        }
        
        set flexShrink(newVal: string)
        {
            this.flexShrinkManager.getProperty().setValue(newVal)
            this.flexShrinkManager.updateCssProp(this.flexShrinkManager.getProperty())             
        }

        get hasFlexShrink()
        {
            return  this.flexShrinkManager.getProperty().active
        }
        
        set hasFlexShrink(newVal: boolean)
        {
            if (!newVal) {
                this.flexShrinkManager.deactivePropCss(this.flexShrinkManager.getProperty())
            } else {
                this.flexShrinkManager.activePropCss(this.flexShrinkManager.getProperty())
            }
        }
        
        // *****************************************  FLOAT ****************************************************
        
        get float()
        {
            return  this.floatManager.getProperty().value
        }
        
        set float(newVal: string)
        {
            this.floatManager.getProperty().setValue(newVal)
            this.floatManager.updateCssProp(this.floatManager.getProperty())             
        }

        get hasFloat()
        {
            return  this.floatManager.getProperty().active
        }
        
        set hasFloat(newVal: boolean)
        {
            if (!newVal) {
                this.floatManager.deactivePropCss(this.floatManager.getProperty())
            } else {
                this.floatManager.activePropCss(this.floatManager.getProperty())
            }
        }
        
        // *****************************************  CLEAR ****************************************************
        
        get clear()
        {
            return  this.clearManager.getProperty().value
        }
        
        set clear(newVal: string)
        {
            this.clearManager.getProperty().setValue(newVal)
            this.clearManager.updateCssProp(this.clearManager.getProperty())             
        }

        get hasClear()
        {
            return  this.clearManager.getProperty().active
        }
        
        set hasClear(newVal: boolean)
        {
            if (!newVal) {
                this.clearManager.deactivePropCss(this.clearManager.getProperty())
            } else {
                this.clearManager.activePropCss(this.clearManager.getProperty())
            }
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
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
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
