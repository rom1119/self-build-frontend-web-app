<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class=" content-item__elem_container"
        >



            <div class="content-item__elem"
                 >
                <select name="type" @change="change" v-model="mediaType">
                    <option v-for="type in types" :value="type" :key="type"> {{ type }} </option>
                </select>
            </div>
            <div class="content-item__elem"
                 >
                <select  name="operator" @change="change" v-model="mediaQueryOperator" >
                    <option v-for="operator in operators" :value="operator" :key="operator"> {{ operator }} </option>
                </select>
            </div>
            <div class="content-item__elem"
                 >
                <select name="feature" @change="change" v-model="mediaFeature">
                    <option v-for="feature in features" :value="feature" :key="feature"> {{ feature }} </option>
                </select>
            </div>
            <div class="content-item__elem"
                    v-context-menu="cmSizeGradientVal"
                 >
                <select-unit-context-menu :propertyUnit="value.featureValUnit" @changePropUnit="() => {value.featureValUnit = $event; change();}" :ref="cmSizeGradientVal" />

                <label :for="cmNameTextShadowColor" style="display: inline-flex;">
                    Feature Val
                    <input @dblclick.stop.prevent="" type="number" @input="change" style="width: 50px;" class="input-text" v-model="value.featureVal" name="textShadowBlur" :id="cmNameTextShadowColor">
<!--                    <input type="range" v-model="value.size" @input="change" :max="maxSize" />-->
                    <span v-if="value.featureValUnit">
                        {{ value.featureValUnit.label }}

                    </span>
                </label>

            </div>

            <div class="content-item__elem"
                 >
                <select  name="feature" @change="change" v-model="mediaOrientation">
                    <option value="">  </option>
                    <option v-for="orientation in orientations" :value="orientation" :key="orientation"> {{ orientation }} </option>
                </select>
            </div>

            <div class="content-item__elem"
            >
                <span v-if="index > 1"  class="remove-btn" style="left: 20px; position: relative; top: 0;" @click="removeVal">
                                X
                            </span>
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
import { RGBA, Percent } from '~/src/Unit';
import HtmlTag from '~/src/Layout/HtmlTag';
import { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import { BaseGradientStructVal } from '~/src/Css/Gradient/BaseGradientCss';
import MediaQueryOperator from '~/src/MediaQuery/MediaQueryOperator';
import MediaType from '~/src/MediaQuery/MediaType';
import MediaFeature from '~/src/MediaQuery/MediaFeature';
import MediaOrientation from '../../src/MediaQuery/MediaOrientation';
    import {MediaQueryStructVal} from "~/src/MediaQuery/BaseMediaQueryCss";


    @Component({
        components: {
            Chrome
        }
    })
    export default class MediaQueryValueComponent extends Vue {

        timeout
        // @Prop({default:null, required:true})
        // tag: HtmlTag

        @Prop({default:null, required:true})
        value: MediaQueryStructVal

        @Prop({default:null, required:true})
        index: number

        operators
        types
        features
        orientations
        // @Prop({default:null, required:false})
        // classList: string[]

        cmSizeGradientVal = Math.floor(Math.random() * 1000000000).toString() + 'cmSizeGradientVal'
        cmNameTextShadowOffY = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-off-y'
        cmNameTextShadowBlur = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-blur'
        cmNameTextShadowSpread = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-spread'
        cmNameTextShadowColor = Math.floor(Math.random() * 1000000000).toString() + 'text-shadow-color'




        get maxSize()
        {
            if (this.value.sizeUnit instanceof Percent) {
                return 100
            }

            return 99999
        }

        created(){
            this.features = MediaFeature.PROP
            this.types = MediaType.PROP
            this.operators = MediaQueryOperator.PROP
            this.orientations = MediaOrientation.PROP
        }

        mounted()
        {

            // console.log(this.contextMenuName);
            // console.log(this.cmName);



            // this.backgroundColor = this.value.getColorValue()

        }

        get mediaOrientation(){
            if (!this.value.orientation) {
                return ''
            }
            return this.value.orientation.getValue()
        }

        set mediaOrientation(arg){
            this.value.orientation = new MediaOrientation(arg)
        }

        get mediaFeature(){
            if (!this.value.mediaFeature) {
                return ''
            }
            return this.value.mediaFeature.getValue()
        }

        set mediaFeature(arg){
            this.value.mediaFeature = new MediaFeature(arg)
        }

        get mediaType(){
            if (!this.value.mediaType) {
                return ''
            }
            return this.value.mediaType.getValue()
        }

        set mediaType(arg){
            this.value.mediaType = new MediaType(arg)
        }

        get mediaQueryOperator(){
            if (!this.value.mediaQueryOperator) {
                return ''
            }
            return this.value.mediaQueryOperator.getValue()
        }

        set mediaQueryOperator(arg){
            this.value.mediaQueryOperator = new MediaQueryOperator(arg)
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
    .content-item__elem_container {
        position: absolute;
        display: flex;
        width: 700px;
        background-color: green;

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
    .rel {
        position: relative;
    }

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
