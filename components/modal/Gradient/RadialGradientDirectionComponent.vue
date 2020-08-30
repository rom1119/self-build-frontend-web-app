<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class=" content-item__elem_container"
        >
        <div class="content-item__elem"
                >

            <label :for="'textShadowBlur-'">
                Shape
                {{ value.shape }}
                <select name="shape" @change="change" v-model="value.shape" id="shape">
                    <option v-for="shape in shapes" :value="shape" :key="shape"> {{ shape }} </option>
                </select>
            </label>
            
        </div>
        
        <div class="content-item__elem"
                >

            <label :for="'size'">
                Size
                {{ value.shape }}
                <select name="size" @change="change" v-model="value.size" id="size">
                    <option v-for="size in sizes" :value="size" :key="size"> {{ size }} </option>
                </select>
            </label>
            
        </div>
        
        <div class="content-item__elem"
                v-context-menu="cmXpos"
                >
            <select-radial-gradient-direction-unit-menu :propertyUnit="value.xPosUnit" @changePropUnit="($event) => {value.xPosUnit = $event; change();}" :ref="cmXpos" />

            <label :for="'posX'">
                X position
                {{ value.getXPosValue() }}
                <select v-if="isNamedPosXUnit" name="posX" @change="change" v-model="value.xPos" id="posX">
                    <option v-for="posX in xPosList" :value="posX" :key="posX"> {{ posX }} </option>
                </select>
                <input v-else type="number" style="width: 50px;" @input="change" v-model="value.xPos" />
            </label>
            
        </div>
        
        <div class="content-item__elem"
                v-context-menu="cmYpos"
                >
            <select-radial-gradient-direction-unit-menu :propertyUnit="value.yPosUnit" @changePropUnit="($event) => {value.yPosUnit = $event; change();}" :ref="cmYpos" />

            <label :for="'posY'">
                Y position
                {{ value.getYPosValue() }}
                <select v-if="isNamedPosYUnit" @change="change" name="posX" v-model="value.yPos" id="yPos">
                    <option v-for="posY in yPosList" :value="posY" :key="posY"> {{ posY }} </option>
                </select>
                <input v-else type="number" style="width: 50px;" @input="change" v-model="value.yPos" />
            </label>
            
        </div>
  
            

    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";
import { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
    import { Chrome }  from '~/node_modules/vue-color';
import { RGBA, Percent, Named } from '~/src/Unit';
import HtmlTag from '~/src/Layout/HtmlTag';
import { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import { BaseGradientStructVal } from '~/src/Css/Gradient/BaseGradientCss';
import LinearSites from '~/src/Css/Gradient/LinearSites';
import { LinearGradientDirection } from '../../../src/Css/Gradient/impl/LinearGradientCss';
import UnitTurn from '~/src/Unit/UnitTurn';
import { RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import RadialSites from '~/src/Css/Gradient/RadialSites';


    @Component({
        components: {
            Chrome
        }
    })
    export default class RadialGradientDirectionComponent extends Vue {
        
        timeout
        @Prop({default:null, required:true})
        tag: HtmlTag

        @Prop({default:null, required:true})
        value: RadialGradientDirection
        

        shapes = RadialSites.SHAPES
        sizes = RadialSites.getAccessableProperty()
        xPosList = RadialSites.X_POS
        yPosList = RadialSites.Y_POS
   
        
        // @Prop({default:null, required:false})
        // classList: string[]

        cmXpos = Math.floor(Math.random() * 1000000000).toString() + 'text_shadow_off_x'
        cmYpos = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-off-y'
        cmNameTextShadowBlur = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-blur'
        cmNameTextShadowSpread = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-spread'
        cmNameTextShadowColor = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-color'

        pickerActive = false

        color: any = {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        }  

        get isNamedPosYUnit(){
            if (this.value.yPosUnit instanceof Named) {
                return true
            }
            return false
        }
        
        get isNamedPosXUnit(){
            if (this.value.xPosUnit instanceof Named) {
                return true
            }
            return false
        }
        
        get maxSize()
        {
            // if (this.value.directionUnit instanceof UnitTurn) {
            //     return 1
            // }

            // return 
            return 0
        }

        mounted() 
        {
            // console.log(this.contextMenuName);
            // console.log(this.cmName);

            // if (this.value.colorUnit instanceof RGBA) {
            //     console.log('00000000000000000');
            //     console.log(this.value.color);
                
            //     this.color.r = this.value.color.r
            //     this.color.g = this.value.color.g
            //     this.color.b = this.value.color.b
            //     this.color.a = this.value.color.a
            // }
            
        }

        toggleColorPicker()
        {
            this.pickerActive = !this.pickerActive
        }

        cancelColor()
        {
            console.log(this.color);
            
            this.toggleColorPicker()
        }

        removeVal()
        {
            this.tag.api.deleteCssValue(this.value).then(
                () => {
                    this.$emit('remove')
                },
                () => {
                    alert('server error')
                }
            )
        }
        
        

        change()
        {
            this.$emit('change')
        }

        



        // get allClass()
        // {
        //     var res = this.classList
        //     if (this.hasProperty) {
        //         if (this.globalEl) {
        //             res.push('active-global')

        //         } else {
        //             res.push('active')

        //         }
        //     }

        //     return res
        // }


        // get customHasProp()
        // {
        //     return this.hasProperty
        // }

        // set customHasProp(val)
        // {
        //     this.$emit('changeHasProp', val)
        // }

        // get customProp()
        // {
        //     return this.property
        // }

        // set customProp(val)
        // {
        //     this.$emit('changeProp', val)
        // }
        
        // get customPropUnit()
        // {
        //     return this.propertyUnit
        // }

        // set customPropUnit(val)
        // {
        //     if (val) {
        //         this.$emit('changePropUnit', val)

        //     }
        // }
        
        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    .disabled {
        opacity: 0.6;
    }
    .auto-prop {
        background-color: red;
        padding: 5px;
        // margin-left: 3px;
        border-radius: 5px;
    }
    .green-bg {
        background-color: greenyellow;

    }
    // .rel {
    //     position: relative;
    // }

    // .h-550 {
    //     height: 550px;
    // }
    // .w-400 {
    //     width: 400px;
    // }
    
    // .h-400 {
    //     height: 400px;
    // }
</style>
