<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Zarządzaj box modelem
            </h4>
            <div v-if="value" class="border-radius-container"
                    @dblclick.stop="hasBoxSizing === true ? hasBoxSizing = false : hasBoxSizing = true"
                    :class="{'green-bg': hasBoxSizing}"
                    v-context-menu="value.uuid.concat('-box-sizing')"
                >
                    <span >
                            Box sizing: {{ boxSizingManager.getProperty().getValue() }}
                        </span>
                        <div class="width-prop-container-right">
                            <select-box-sizing-menu :property="boxSizing" @changeProp="boxSizing = $event" :ref="value.uuid.concat('-box-sizing')" />

                        </div>
                </div>
        </template>
        <template slot="content">
            <div class="content-item" style="margin-top: 50px;">
                
                <!-- BOX MODEL FOR FEATURE -->
                <div v-if="value" class=" box-model content-item__elem_container rel w-400 h-400">
                    
                    <div class="border-radius-container">

                        <div :class="{'border-radius__active': hasBorderRadiusGlobal}" class="content-box-model-link_right border-radius border-radius__global">
                            <span >
                                {{ borderRadiusGlobalManager.getProperty().getValue() }}
                            </span>
                            <div class="width-prop-container-right">
                                <site-box-model-element 
                                        :globalEl="true"
                                        @changeHasProp="hasBorderRadiusGlobal = $event"
                                        @changeProp="borderRadiusGlobal = $event"
                                        @changePropUnit="borderRadiusGlobalUnit = $event"
                                        :hasProperty="hasBorderRadiusGlobal"
                                        :property="borderRadiusGlobal"
                                        :propertyUnit="borderRadiusGlobalUnit"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-border-radius-global-box')"
                                    />
                            </div>
                        </div>
                        <div :class="{'border-radius__active': hasBorderRadiusTopLeft}" class="content-box-model-link_right border-radius border-radius__top-left">
                            <span >
                                {{ borderRadiusTopLeftManager.getProperty().getValue() }}
                            </span>
                            <div class="width-prop-container-right">
                                <site-box-model-element 
                                        @changeHasProp="hasBorderRadiusTopLeft = $event"
                                        @changeProp="borderRadiusTopLeft = $event"
                                        @changePropUnit="borderRadiusTopLeftUnit = $event"
                                        :hasProperty="hasBorderRadiusTopLeft"
                                        :property="borderRadiusTopLeft"
                                        :propertyUnit="borderRadiusTopLeftUnit"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-border-radius-top-left-box')"
                                    />
                            </div>
                        </div>
                        <div :class="{'border-radius__active': hasBorderRadiusTopRight}" class="content-box-model-link_right border-radius border-radius__top-right">
                            <span >
                                {{ borderRadiusTopRightManager.getProperty().getValue() }}
                            </span>
                            <div class="width-prop-container-right">
                                <site-box-model-element 
                                        @changeHasProp="hasBorderRadiusTopRight = $event"
                                        @changeProp="borderRadiusTopRight = $event"
                                        @changePropUnit="borderRadiusTopRightUnit = $event"
                                        :hasProperty="hasBorderRadiusTopRight"
                                        :property="borderRadiusTopRight"
                                        :propertyUnit="borderRadiusTopRightUnit"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-border-radius-top-right-box')"
                                    />
                            </div>
                        </div>
                        <div :class="{'border-radius__active': hasBorderRadiusBottomLeft}" class="content-box-model-link_right border-radius border-radius__bottom-left">
                            <span >
                                {{ borderRadiusBottomLeftManager.getProperty().getValue() }}
                            </span>
                            <div class="width-prop-container-right">
                                <site-box-model-element 
                                        @changeHasProp="hasBorderRadiusBottomLeft = $event"
                                        @changeProp="borderRadiusBottomLeft = $event"
                                        @changePropUnit="borderRadiusBottomLeftUnit = $event"
                                        :hasProperty="hasBorderRadiusBottomLeft"
                                        :property="borderRadiusBottomLeft"
                                        :propertyUnit="borderRadiusBottomLeftUnit"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-border-radius-bottom-left-box')"
                                    />
                            </div>
                        </div>
                        <div :class="{'border-radius__active': hasBorderRadiusBottomRight}" class="content-box-model-link_right border-radius border-radius__bottom-right">
                            <span >
                                {{ borderRadiusBottomRightManager.getProperty().getValue() }}
                            </span>
                            <div class="width-prop-container-right">
                                <site-box-model-element 
                                        @changeHasProp="hasBorderRadiusBottomRight = $event"
                                        @changeProp="borderRadiusBottomRight = $event"
                                        @changePropUnit="borderRadiusBottomRightUnit = $event"
                                        :hasProperty="hasBorderRadiusBottomRight"
                                        :property="borderRadiusBottomRight"
                                        :propertyUnit="borderRadiusBottomRightUnit"
                                        :classList="['top-padding','padding']"
                                        :contextMenuName="value.uuid.concat('-border-radius-bottom-right-box')"
                                    />
                            </div>
                        </div>
                    </div>
                    <div class="margin-box-model">
                        
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
                                :property="borderTop"
                                :borderManager="borderManager"
                                :classList="['top-border','border']"
                                :contextMenuName="value.uuid.concat('-border-top-box')"
                            />
                            <border-site-model-element
                                :property="borderRight"
                                :borderManager="borderManager"
                                :classList="['right-border','border']"
                                :contextMenuName="value.uuid.concat('-border-right-box')"
                            />
                            
                            <border-site-model-element
                                :property="borderBottom"
                                :borderManager="borderManager"
                                :classList="['bottom-border','border']"
                                :contextMenuName="value.uuid.concat('-border-bottom-box')"
                            />
                            
                            <border-site-model-element
                                :property="borderLeft"
                                :borderManager="borderManager"
                                :classList="['left-border','border']"
                                :contextMenuName="value.uuid.concat('-border-left-box')"
                            />
                            
                            <border-site-model-element
                                :globalEl="true"
                                :property="borderGlobal"
                                :borderManager="borderManager"
                                :classList="['global-border','border']"
                                :contextMenuName="value.uuid.concat('-border-global-box')"
                            />
            
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
                                    <div class="content-box-model-link">
                                        Width 
                                        <span v-show="hasWidth">
                                            {{ value.getWidthValue() }}
                                        </span>
                                        <div class="width-prop-container">
                                                <site-box-model-element 
                                                    @changeHasProp="hasWidth = $event"
                                                    @changeProp="width = $event"
                                                    @changePropUnit="widthUnit = $event"
                                                    :hasProperty="hasWidth"
                                                    :property="width"
                                                    :propertyUnit="widthUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('-width-box')"
                                                />
                                        </div>
                                    </div>
                                    <div class="content-box-model-link">
                                        <span class="content-box-model-link_left" style="width: 48%; display: inline-block;">
                                            <span>
                                                Min:

                                            </span>
                                            </br>
                                            <span>
                                                {{ minWidthManager.getProperty().getValue() }}

                                            </span>
                                            <div class="width-prop-container-left">
                                                <site-box-model-element 
                                                    @changeHasProp="hasMinWidth = $event"
                                                    @changeProp="minWidth = $event"
                                                    @changePropUnit="minWidthUnit = $event"
                                                    :hasProperty="hasMinWidth"
                                                    :property="minWidth"
                                                    :propertyUnit="minWidthUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('min-width-box')"
                                                />
                                            </div>
                                        </span> 
                                        
                                        <span class="content-box-model-link_right" style="width: 48%; display: inline-block;">
                                            <span>
                                                Max: 

                                            </span>
                                            </br>

                                            <span>
                                                    {{ maxWidthManager.getProperty().getValue() }}
                                             </span>
                                            <div class="width-prop-container-right">
                                                <site-box-model-element 
                                                    @changeHasProp="hasMaxWidth = $event"
                                                    @changeProp="maxWidth = $event"
                                                    @changePropUnit="maxWidthUnit = $event"
                                                    :hasProperty="hasMaxWidth"
                                                    :property="maxWidth"
                                                    :propertyUnit="maxWidthUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('-max-width')"
                                                />
                                            </div>
                                        </span> 
                                        
                                        
                                    </div>
                                    <div class="content-box-model-link">
                                        Height
                                        <span v-show="hasHeight">
                                            {{ value.getHeightValue() }}
                                        </span>
                                        <div class="width-prop-container">
                                                <site-box-model-element 
                                                    @changeHasProp="hasHeight = $event"
                                                    @changeProp="height = $event"
                                                    @changePropUnit="heightUnit = $event"
                                                    :hasProperty="hasHeight"
                                                    :property="height"
                                                    :propertyUnit="heightUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('-height-box')"
                                                />
                                        </div>
                                    </div>
                                    <div class="content-box-model-link">
                                        
                                         <span class="content-box-model-link_left" style="width: 48%; display: inline-block;">
                                            <span>
                                                Min:

                                            </span>
                                            </br>
                                            <span>
                                                {{ minHeightManager.getProperty().getValue() }}

                                            </span>
                                            <div class="width-prop-container-left">
                                                <site-box-model-element 
                                                    @changeHasProp="hasMinHeight = $event"
                                                    @changeProp="minHeight = $event"
                                                    @changePropUnit="minHeightUnit = $event"
                                                    :hasProperty="hasMinHeight"
                                                    :property="minHeight"
                                                    :propertyUnit="minHeightUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('min-height-box')"
                                                />
                                            </div>
                                        </span> 
                                        
                                        <span class="content-box-model-link_right" style="width: 48%; display: inline-block;">
                                            <span>
                                                Max: 

                                            </span>
                                            </br>

                                            <span>
                                                    {{ maxHeightManager.getProperty().getValue() }}
                                             </span>
                                            <div class="width-prop-container-right">
                                                <site-box-model-element 
                                                    @changeHasProp="hasMaxHeight = $event"
                                                    @changeProp="maxHeight = $event"
                                                    @changePropUnit="maxHeightUnit = $event"
                                                    :hasProperty="hasMaxHeight"
                                                    :property="maxHeight"
                                                    :propertyUnit="maxHeightUnit"
                                                    :classList="['top-padding','padding']"
                                                    :contextMenuName="value.uuid.concat('-max-height')"
                                                />
                                            </div>
                                        </span> 
                                         
                                    </div>

                                    
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
import { Width } from '~/src/Css';

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

        onChangePseudoSelector()
        {
            this.reinitManagers()
        }

        // *****************************************  BOX-SIZING ****************************************************
        
        get boxSizing()
        {
            return  this.boxSizingManager.getProperty().value
        }
        
        set boxSizing(newVal: string)
        {
            this.boxSizingManager.getProperty().setValue(newVal)
            this.boxSizingManager.updateCssProp(this.boxSizingManager.getProperty())             
        }  

        get hasBoxSizing()
        {
            return  this.boxSizingManager.getProperty().active
        }
        
        set hasBoxSizing(newVal: boolean)
        {
            if (!newVal) {
                this.boxSizingManager.deactivePropCss(this.boxSizingManager.getProperty())
            } else {
                this.boxSizingManager.activePropCss(this.boxSizingManager.getProperty())
            }
        }
        
        // *****************************************  BORDER-RADIUS ****************************************************
        
        get borderRadiusGlobal()
        {
            return  this.borderRadiusGlobalManager.getProperty().value
        }
        
        set borderRadiusGlobal(newVal: string)
        {
            this.borderRadiusGlobalManager.getProperty().setValue(newVal)
            this.borderRadiusGlobalManager.updateCssProp(this.borderRadiusGlobalManager.getProperty())             
        }
        
        get borderRadiusGlobalUnit()
        {
            return  this.borderRadiusGlobalManager.getProperty().getUnit()
        }
        
        set borderRadiusGlobalUnit(newVal: UnitSize)
        {
            this.borderRadiusGlobalManager.getProperty().setUnit(newVal)
            this.borderRadiusGlobalManager.updateCssProp(this.borderRadiusGlobalManager.getProperty())             
        }

        get hasBorderRadiusGlobal()
        {
            return  this.borderRadiusGlobalManager.getProperty().active
        }
        
        set hasBorderRadiusGlobal(newVal: boolean)
        {
            if (!newVal) {
                this.borderRadiusGlobalManager.deactivePropCss(this.borderRadiusGlobalManager.getProperty())
            } else {
                this.borderRadiusGlobalManager.activePropCss(this.borderRadiusGlobalManager.getProperty())
            }
        }
        
        // *****************************************  BORDER-RADIUS_LEFT-TOP ****************************************************
        
        get borderRadiusTopLeft()
        {
            return  this.borderRadiusTopLeftManager.getProperty().value
        }
        
        set borderRadiusTopLeft(newVal: string)
        {
            this.borderRadiusTopLeftManager.getProperty().setValue(newVal)
            this.borderRadiusTopLeftManager.updateCssProp(this.borderRadiusTopLeftManager.getProperty())             
        }
        
        get borderRadiusTopLeftUnit()
        {
            return  this.borderRadiusTopLeftManager.getProperty().getUnit()
        }
        
        set borderRadiusTopLeftUnit(newVal: UnitSize)
        {
            this.borderRadiusTopLeftManager.getProperty().setUnit(newVal)
            this.borderRadiusTopLeftManager.updateCssProp(this.borderRadiusTopLeftManager.getProperty())             
        }

        get hasBorderRadiusTopLeft()
        {
            return  this.borderRadiusTopLeftManager.getProperty().active
        }
        
        set hasBorderRadiusTopLeft(newVal: boolean)
        {
            if (!newVal) {
                this.borderRadiusTopLeftManager.deactivePropCss(this.borderRadiusTopLeftManager.getProperty())
            } else {
                this.borderRadiusTopLeftManager.activePropCss(this.borderRadiusTopLeftManager.getProperty())
            }
        }
        
        // *****************************************  BORDER-RADIUS_RIGHT-TOP ****************************************************
        
        get borderRadiusTopRight()
        {
            return  this.borderRadiusTopRightManager.getProperty().value
        }
        
        set borderRadiusTopRight(newVal: string)
        {
            this.borderRadiusTopRightManager.getProperty().setValue(newVal)
            this.borderRadiusTopRightManager.updateCssProp(this.borderRadiusTopRightManager.getProperty())             
        }
        
        get borderRadiusTopRightUnit()
        {
            return  this.borderRadiusTopRightManager.getProperty().getUnit()
        }
        
        set borderRadiusTopRightUnit(newVal: UnitSize)
        {
            this.borderRadiusTopRightManager.getProperty().setUnit(newVal)
            this.borderRadiusTopRightManager.updateCssProp(this.borderRadiusTopRightManager.getProperty())             
        }

        get hasBorderRadiusTopRight()
        {
            return  this.borderRadiusTopRightManager.getProperty().active
        }
        
        set hasBorderRadiusTopRight(newVal: boolean)
        {
            if (!newVal) {
                this.borderRadiusTopRightManager.deactivePropCss(this.borderRadiusTopRightManager.getProperty())
            } else {
                this.borderRadiusTopRightManager.activePropCss(this.borderRadiusTopRightManager.getProperty())
            }
        }

        // *****************************************  BORDER-RADIUS_BOTTOM-LEFT ****************************************************
        
        get borderRadiusBottomLeft()
        {
            return  this.borderRadiusBottomLeftManager.getProperty().value
        }
        
        set borderRadiusBottomLeft(newVal: string)
        {
            console.log(newVal);
            
            this.borderRadiusBottomLeftManager.getProperty().setValue(newVal)
            this.borderRadiusBottomLeftManager.updateCssProp(this.borderRadiusBottomLeftManager.getProperty())             
        }
        
        get borderRadiusBottomLeftUnit()
        {
            return  this.borderRadiusBottomLeftManager.getProperty().getUnit()
        }
        
        set borderRadiusBottomLeftUnit(newVal: UnitSize)
        {
            this.borderRadiusBottomLeftManager.getProperty().setUnit(newVal)
            this.borderRadiusBottomLeftManager.updateCssProp(this.borderRadiusBottomLeftManager.getProperty())             
        }

        get hasBorderRadiusBottomLeft()
        {
            return  this.borderRadiusBottomLeftManager.getProperty().active
        }
        
        set hasBorderRadiusBottomLeft(newVal: boolean)
        {
            if (!newVal) {
                this.borderRadiusBottomLeftManager.deactivePropCss(this.borderRadiusBottomLeftManager.getProperty())
            } else {
                this.borderRadiusBottomLeftManager.activePropCss(this.borderRadiusBottomLeftManager.getProperty())
            }
        }
        
        // *****************************************  BORDER-RADIUS_BOTTOM-RIGHT ****************************************************
        
        get borderRadiusBottomRight()
        {
            return  this.borderRadiusBottomRightManager.getProperty().value
        }
        
        set borderRadiusBottomRight(newVal: string)
        {
            this.borderRadiusBottomRightManager.getProperty().setValue(newVal)
            this.borderRadiusBottomRightManager.updateCssProp(this.borderRadiusBottomRightManager.getProperty())             
        }
        
        get borderRadiusBottomRightUnit()
        {
            return  this.borderRadiusBottomRightManager.getProperty().getUnit()
        }
        
        set borderRadiusBottomRightUnit(newVal: UnitSize)
        {
            this.borderRadiusBottomRightManager.getProperty().setUnit(newVal)
            this.borderRadiusBottomRightManager.updateCssProp(this.borderRadiusBottomRightManager.getProperty())             
        }

        get hasBorderRadiusBottomRight()
        {
            return  this.borderRadiusBottomRightManager.getProperty().active
        }
        
        set hasBorderRadiusBottomRight(newVal: boolean)
        {
            if (!newVal) {
                this.borderRadiusBottomRightManager.deactivePropCss(this.borderRadiusBottomRightManager.getProperty())
            } else {
                this.borderRadiusBottomRightManager.activePropCss(this.borderRadiusBottomRightManager.getProperty())
            }
        }

        // *****************************************  WIDTH ****************************************************
        
        get width()
        {
            return  this.widthManager.getProperty().value
        }
        
        set width(newVal: string)
        {
            this.widthManager.getProperty().setValue(newVal)
            this.widthManager.updateCssProp(this.widthManager.getProperty())             
        }
        
        get widthUnit()
        {
            return  this.widthManager.getProperty().getUnit()
        }
        
        set widthUnit(newVal: UnitSize)
        {
            this.widthManager.getProperty().setUnit(newVal)
            this.widthManager.updateCssProp(this.widthManager.getProperty())             
        }

        get hasWidth()
        {
            return  this.widthManager.getProperty().active
        }
        
        set hasWidth(newVal: boolean)
        {
            if (!newVal) {
                this.widthManager.deactivePropCss(this.widthManager.getProperty())
            } else {
                this.widthManager.activePropCss(this.widthManager.getProperty())
            }
        }

        // *****************************************  MIN-WIDTH ****************************************************
        
        get minWidth()
        {
            return  this.minWidthManager.getProperty().value
        }
        
        set minWidth(newVal: string)
        {
            this.minWidthManager.getProperty().setValue(newVal)
            this.minWidthManager.updateCssProp(this.minWidthManager.getProperty())             
        }
        
        get minWidthUnit()
        {
            return  this.minWidthManager.getProperty().getUnit()
        }
        
        set minWidthUnit(newVal: UnitSize)
        {
            this.minWidthManager.getProperty().setUnit(newVal)
            this.minWidthManager.updateCssProp(this.minWidthManager.getProperty())             
        }

        get hasMinWidth()
        {
            return  this.minWidthManager.getProperty().active
        }
        
        set hasMinWidth(newVal: boolean)
        {
            if (!newVal) {
                this.minWidthManager.deactivePropCss(this.minWidthManager.getProperty())
            } else {
                this.minWidthManager.activePropCss(this.minWidthManager.getProperty())
            }
        }
        
        // *****************************************  MAX-WIDTH ****************************************************
        
        get maxWidth()
        {
            return  this.maxWidthManager.getProperty().value
        }
        
        set maxWidth(newVal: string)
        {
            this.maxWidthManager.getProperty().setValue(newVal)
            this.maxWidthManager.updateCssProp(this.maxWidthManager.getProperty())             
        }
        
        get maxWidthUnit()
        {
            return  this.maxWidthManager.getProperty().getUnit()
        }
        
        set maxWidthUnit(newVal: UnitSize)
        {
            this.maxWidthManager.getProperty().setUnit(newVal)
            this.maxWidthManager.updateCssProp(this.maxWidthManager.getProperty())             
        }

        get hasMaxWidth()
        {
            return  this.maxWidthManager.getProperty().active
        }
        
        set hasMaxWidth(newVal: boolean)
        {
            if (!newVal) {
                this.maxWidthManager.deactivePropCss(this.maxWidthManager.getProperty())
            } else {
                this.maxWidthManager.activePropCss(this.maxWidthManager.getProperty())
            }
        }
        
        // *****************************************  HEIGHT ****************************************************
        
        get height()
        {
            return  this.heightManager.getProperty().value
        }
        
        set height(newVal: string)
        {
            this.heightManager.getProperty().setValue(newVal)
            this.heightManager.updateCssProp(this.heightManager.getProperty())             
        }
        
        get heightUnit()
        {
            return  this.heightManager.getProperty().getUnit()
        }
        
        set heightUnit(newVal: UnitSize)
        {
            this.heightManager.getProperty().setUnit(newVal)
            this.heightManager.updateCssProp(this.heightManager.getProperty())             
        }

        get hasHeight()
        {
            return  this.heightManager.getProperty().active
        }
        
        set hasHeight(newVal: boolean)
        {
            if (!newVal) {
                this.heightManager.deactivePropCss(this.heightManager.getProperty())
            } else {
                this.heightManager.activePropCss(this.heightManager.getProperty())
            }
        }

        // *****************************************  MIN-HEIGHT ****************************************************
        
        get minHeight()
        {
            return  this.minHeightManager.getProperty().value
        }
        
        set minHeight(newVal: string)
        {
            this.minHeightManager.getProperty().setValue(newVal)
            this.minHeightManager.updateCssProp(this.minHeightManager.getProperty())             
        }
        
        get minHeightUnit()
        {
            return  this.minHeightManager.getProperty().getUnit()
        }
        
        set minHeightUnit(newVal: UnitSize)
        {
            this.minHeightManager.getProperty().setUnit(newVal)
            this.minHeightManager.updateCssProp(this.minHeightManager.getProperty())             
        }

        get hasMinHeight()
        {
            return  this.minHeightManager.getProperty().active
        }
        
        set hasMinHeight(newVal: boolean)
        {
            if (!newVal) {
                this.minHeightManager.deactivePropCss(this.minHeightManager.getProperty())
            } else {
                this.minHeightManager.activePropCss(this.minHeightManager.getProperty())
            }
        }
        
        // *****************************************  MAX-HEIGHT ****************************************************
        
        get maxHeight()
        {
            return  this.maxHeightManager.getProperty().value
        }
        
        set maxHeight(newVal: string)
        {
            this.maxHeightManager.getProperty().setValue(newVal)
            this.maxHeightManager.updateCssProp(this.maxHeightManager.getProperty())             
        }
        
        get maxHeightUnit()
        {
            return  this.maxHeightManager.getProperty().getUnit()
        }
        
        set maxHeightUnit(newVal: UnitSize)
        {
            this.maxHeightManager.getProperty().setUnit(newVal)
            this.maxHeightManager.updateCssProp(this.maxHeightManager.getProperty())             
        }

        get hasMaxHeight()
        {
            return  this.maxHeightManager.getProperty().active
        }
        
        set hasMaxHeight(newVal: boolean)
        {
            if (!newVal) {
                this.maxHeightManager.deactivePropCss(this.maxHeightManager.getProperty())
            } else {
                this.maxHeightManager.activePropCss(this.maxHeightManager.getProperty())
            }
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
        
        get borderRight(): BaseBorderCss
        {
            return this.borderManager.rightProperty
        }
        
        get borderBottom(): BaseBorderCss
        {
            return this.borderManager.bottomProperty
        }
        
        get borderLeft(): BaseBorderCss
        {
            return this.borderManager.leftProperty
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
    
    .w-50-pr {
        width: 50%;
    }
    
    .h-400 {
        height: 400px;
    }
</style>
