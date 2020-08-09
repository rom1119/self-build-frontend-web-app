<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Animacje elementu 
            </h4>
        </template>
        <template slot="content">
            
            <!-- <select-unit-context-menu :propertyUnit="val.offsetXUnit" @changePropUnit="val.offsetXUnit = $event" :ref="cmNameTextShadowOffX" /> -->

            <div class="content-item" style="display: flex;" >
                
                    <div class="content-item-half" @dblclick="hasTransition = !hasTransition" :class="{'active': hasTransition}" >
                        <h4 class="content-item__header">
                            Transition
                            <span class="add-btn" @click="addDefaultTransitionVal">
                                +
                            </span>
                        </h4>
                        <transition-value-component 
                            v-for="(val, index) in transitionManager.getProperty().getValues()"
                            @change="onChangeTransition(val)" 
                            @remove="onRemoveTransition(val)" 
                            :key="val.id" 
                            :tag="transitionManager.getHtmlTag()" 
                            :index="index" 
                            :value="val" 
                         />

                    </div>
                    <!-- <div class="content-item-half" @dblclick="hasBoxShadow = !hasBoxShadow" :class="{'active': hasBoxShadow}" >
                        <h4 class="content-item__header">
                            Box shadow
                            <span class="add-btn" @click="addDefaultBoxShadowVal">
                                +
                            </span>
                        </h4>
                        <box-shadow-value-component 
                            v-for="(val, index) in boxShadowManager.getProperty().getValues()"
                            @change="onChangeBoxShadow(val)" 
                            @remove="onRemoveBoxShadow(val)" 
                            :key="val.id" 
                            :tag="boxShadowManager.getHtmlTag()" 
                            :index="index" 
                            :value="val" 
                         />

                    </div> -->
                    
                    <!-- <li class="content-item__elem" @dblclick="hasFlexGrow = !hasFlexGrow" :class="{'active': hasFlexGrow}">
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
                    </li> -->
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
import ShadowManageModal from '../ShadowManageModal';
import TextShadowCss from '../../src/Css/Shadow/TextShadowCss';
import TextShadowProperty from '../computedPropertyManagers/impl/ComputedProperty/Shadow/TextShadowProperty';
import AnimationManageModal from '../AnimationManageModal';

    @Component
    export default class AnimationModalComponent extends AnimationManageModal {
      
        timeout
        // value: HtmlTag
 

        idName = 'text-property-modal'

        created()
        {
            console.log('DDDDDDDD');
            // console.log(this.property);
            
        }



        onRemoveTransition(val)
        {
            var length = this.transitionManager.getProperty().getValues().length
            for (var i = 0; i < length; i++) {
                var el = this.transitionManager.getProperty().getValues()[i]
                if (el.id == val.id) {
                    this.transitionManager.getProperty().getValues().splice(i, 1)
                    break
                }
            }
        }
        
        onChangeTransition(prop) {
            console.log('update');
            // console.log(val);
            this.transitionManager.updateCssProp(this.transitionManager.getProperty())             

        }

       
        
        // *****************************************  TRANSITION ****************************************************        
    

        get hasTransition()
        {
            return  this.transitionManager.getProperty().active
        }
        
        set hasTransition(newVal: boolean)
        {
            if (!newVal) {
                this.transitionManager.deactivePropCss(this.transitionManager.getProperty())
            } else {
                this.transitionManager.activePropCss(this.transitionManager.getProperty())
            }
        }

        addDefaultTransitionVal()
        {
            // @ts-ignore
            let initVal = this.transitionManager.createInitValue()
            this.transitionManager.getProperty().addValue(initVal)
            this.onChangeTransition(initVal)
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
