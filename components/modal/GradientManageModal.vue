<template >

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Gradient tła 
            </h4>
        </template>
        <template slot="content">
            
            <!-- <select-unit-context-menu :propertyUnit="val.offsetXUnit" @changePropUnit="val.offsetXUnit = $event" :ref="cmNameTextShadowOffX" /> -->

            <div class="content-item" style="display: flex;" >
                <label v-for="gradient in availableGradients" :key="gradient" style="margin: 10px;">
                    {{ gradient }}
                    <input type="radio" name="gradient-type" :id="gradient" :value="gradient" v-model="currentGradient" >
                </label>
            </div>
            
            <button @click="addDefaultGradient">
                                    Dodaj gradient 
                                </button>
            <div class="content-item" @dblclick="hasGradient = !hasGradient" :class="{'active': hasGradient}" style="display: flex;"  >

                <div v-for="(manager, key) in managers" :key="manager.getProperty().id" class="content-item" style="display: flex;" >

                        <div class="content-item-half"  >
                            <h4 class="content-item__header">
                                {{ key + 1 }}.
                                <button v-if="hasGradient" @click="onRemoveGradient(manager.property.id)">
                                    Usuń gradient 
                                </button>
                                
                            </h4>
                            <linear-gradient-direction-component v-if="isLinear && hasGradientActive" @change="onChangeGradient(manager)" :tag="value" :value="manager.getProperty().direction" />
                            <radial-gradient-direction-component v-else-if="!isLinear && hasGradientActive" :tag="value" @change="onChangeGradient(manager)" :value="manager.getProperty().direction" />
                            <div class="content-item-half" :key="val.id" v-for="(val, index) in manager.getProperty().getValues()" >
                                
                                <gradient-value-component 
                                    
                                    @change="onChangeGradient(manager)" 
                                    @remove="onRemoveGradientValue(val, manager.getProperty().id)" 
                                     
                                    :tag="manager.getHtmlTag()" 
                                    :index="index" 
                                    :value="val" 
                                />
                            </div>

                            <h4 class="content-item__header">
                                
                                    <button class="blue" @click="addDefaultGradientVal(manager.getProperty().id)">
                                        Dodaj wartość
                                    </button>
                                </h4>

                        </div>
                    
                        
                        <!-- <li class="content-item__elem" @dblclick="hasFlexGrow = !hasFlexGrow" :class="{'active': hasFlexGrow}">
                            <label :for="'flexGrow-'">
                                Flex Grow
                                <input type="number" style="width: 40px;" class="input-text" v-model="flexGrow" name="flexGrow" :id="'flexGrow-'">

                            </label>
                        </li> -->
                    
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
import { Width, Display, JustifyContent, AlignItems, FlexDirection, FlexWrap, Float, Clear, BackgroundImage } from '~/src/Css';
import DisplayManageModal from '../DisplayManageModal';
import ShadowManageModal from '../ShadowManageModal';
import TextShadowCss from '../../src/Css/Shadow/TextShadowCss';
import TextShadowProperty from '../computedPropertyManagers/impl/ComputedProperty/Shadow/TextShadowProperty';
import GradientManageModal from '../GradientManageModal';
import LinearGradientCss from '../../src/Css/Gradient/impl/LinearGradientCss';
import RadialGradientCss from '~/src/Css/Gradient/impl/RadialGradientCss';
import LinearGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/LinearGradientProperty';
import RadialGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/RadialGradientProperty';
import RepeatingLinearGradientCss from '~/src/Css/Gradient/impl/RepeatingLinearGradientCss';
import RepeatingRadialGradientCss from '~/src/Css/Gradient/impl/RepeatingRadialGradientCss';

    @Component
    export default class GradientModalComponent extends GradientManageModal {
      
        timeout
        // value: HtmlTag
 

        idName = 'text-property-modal'

        availableGradients = [
            LinearGradientCss.PROP_NAME,
            RepeatingLinearGradientCss.PROP_NAME,
            RadialGradientCss.PROP_NAME,
            RepeatingRadialGradientCss.PROP_NAME
        ]

        

    

        created()
        {
            console.log('DDDDDDDD');

        }

        mounted() {
            // console.log('KKKKKKKKKK');
            // console.log(this._currentGradient);
            // console.log(this.currentGradient);
            
        }

        get currentGradient()
        {
            return this.currentGradientData
        }

        set currentGradient(val)
        {
            // this.managers = []
            var gradientLength = this.managers.length
            for (var i = 0; i < gradientLength; i++) {
                var manager = this.managers[i]
                
                manager.deactivePropCss(manager.getProperty())
                this.managers.splice(i, 1)
                break
            }
            var newManager = this.createPropertyManagerFromName(val)
            if(newManager.property instanceof LinearGradientCss) {
                this.isLinear = true
            } else {
                this.isLinear = false
            }
            newManager.setHtmlEl(this.value)
            newManager.init()
            this.managers.push(newManager)
            newManager.property.active = true
            newManager.property.id = null

            var backgroundImage = <BackgroundImage><unknown>this.value.cssAccessor.getProperty(BackgroundImage.PROP_NAME)   
            backgroundImage.addGradient(newManager.property)
            this.value.synchronize()
            this.value.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)

            console.log('SET', val);
            console.log('SET2', this.currentGradientData);
            
            this.currentGradientData = val
        }

        @Watch('currentGradient', {deep: false, immediate: false})
        async onCurrentGradientChange(newVal, oldVal)
        {
            console.log('watch');
            
        //    var gradientLength = this.managers.length
        //     for (var i = 0; i < gradientLength; i++) {
        //         var manager = this.managers[i]
                
        //         manager.deactivePropCss(manager.getProperty())
        //         this.managers.splice(i, 1)
        //         break
        //     }
           
        }

        onChangeGradient(manager) {
            console.log('update');
            // console.log(val);
            manager.updateCssProp(manager.getProperty())             

        }

        onRemoveGradientValue(val, gradientId)
        {
            var gradientLength = this.managers.length
            for (var m = 0; m < gradientLength; m++) {
                var manager = this.managers[m]
                if (manager.getProperty().id != gradientId) {
                    continue
                }

                var length = manager.getProperty().getValues().length
                for (var i = 0; i < length; i++) {
                    var el = manager.getProperty().getValues()[i]
                    if (el.id == val.id) {
                        manager.getProperty().getValues().splice(i, 1)
                        break
                    }
                }
                this.onChangeGradient(manager)
            }
        }
        
        onRemoveGradient(gradientId)
        {
            var gradientLength = this.managers.length
            for (var i = 0; i < gradientLength; i++) {
                var manager = this.managers[i]
                if (manager.getProperty().id != gradientId) {
                    continue
                }
                manager.deactivePropCss(manager.getProperty())
                this.managers.splice(i, 1)
                break
            }
        }
            

        get hasGradient()
        {

            return  this.hasGradientActive
        }
        
        set hasGradient(newVal: boolean)
        {
            if (!newVal) {
                for (const manager of this.managers) {
                    manager.deactivePropCss(manager.getProperty())
                }
       
            } else {
                for (const manager of this.managers) {
                    manager.activePropCss(manager.getProperty())
                }
               
            }

            this.hasGradientActive = newVal
        }

        addDefaultGradientVal(id)
        {
            var manager = this.getCurrentGradientManager(id)
            // @ts-ignore
            let initVal = manager.createInitValue()
            manager.getProperty().addValue(initVal)
            this.onChangeGradient(manager)
        }

        removeGradient(id){

        }
        
        addDefaultGradient()
        {
            // // @ts-ignore
            // let initVal = manager.createInitValue()
            // manager.getProperty().addValue(initVal)

            var gradientManager = this.createPropertyManagerFromName(this.currentGradient)
             
            gradientManager.setHtmlEl(this.value)
            gradientManager.init()
            gradientManager.getProperty().setActive(true)
            this.managers.push(gradientManager)
            var background = <BackgroundImage>this.getPropertyCssFromModel(BackgroundImage.PROP_NAME)
            background.addGradient(gradientManager.getProperty())
            this.onChangeGradient(gradientManager)

        }

        protected getCurrentGradientManager(id)
        {
            return this.managers.find((el) => {
                return el.getProperty().id === id
            })
            // switch(this.currentGradient) {
            //     case LinearGradientCss.PROP_NAME:
            //     case RadialGradientCss.PROP_NAME:
            //         return this.radialGradientManagers.find((el) => {
            //             return el.getProperty().id === id
            //         })
            // }   

            throw Error('Can not get current gradientManager manager for current name = ' + this.currentGradient)
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
