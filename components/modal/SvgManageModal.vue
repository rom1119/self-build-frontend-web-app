<template>

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" width="1000px" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Kreator SVG
            </h4>
        </template>
        <template slot="content">
            <svg-builder ref="svgBuilder" v-if="value" @changeSvg="onChangeSvg" :value="value.svgContent" />
            <div class="content-item__elem_container ">
            
                <div class="content-item">
                    <h4 class="content-item__header">
                        Treść SVG
                    </h4>
                    
                    <div class=" content-item" >
                        <label style="width: 100%;">
                            Link do zewnętrznego zasobu
                            
                            <textarea style="width: 100%; height: 300px;" @input="inputSvgContent"  v-model="svgContenComp" >

                            </textarea>
                        </label>
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
import { Chrome }  from '~/node_modules/vue-color';
import BackgroundColor from '~/src/Css/Background/BackgroundColor';
import RGBA from '../../src/Unit/Color/RGBA';
import Named from '~/src/Unit/Named';
import BackgroundImage from '../../src/Css/Background/BackgroundImage';
import UnitUrl from '../../src/Unit/UnitUrl';
import base64 from 'base-64';
import BackgroundSize from '../../src/Css/Background/BackgroundSize';
import BackgroundPosition from '../../src/Css/Background/BackgroundPosition';
import BackgroundModal from '../BackgroundModal';
import UnitColor from '../../src/Unit/UnitColor';
import FileInput from '../forms/FileInput.vue';
import { BackgroundRepeat, BackgroundAttachment } from '~/src/Css';
import BackgroundImageProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundImageProperty';
import SvgModal from '../SvgModal';
import SrcManager from '../computedPropertyManagers/htmlAttr/SrcManager';
import DomainResource from '~/src/Css/DomainResource';
import TagResource from '~/src/Css/TagResource';
import ImgTag from '~/src/Layout/tag/ImgTag';
import SrcAttr from '~/src/Attribute/html/SrcAttr';
import SvgTag from '~/src/Layout/tag/SvgTag';
import SvgBuilder from '~/components/fabricjs/SvgBuilder.vue';
import { fabric } from 'fabric';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component(
        {
            components: {
                SvgBuilder
            }
        }
    )
    export default class SvgManageModal extends SvgModal {
        
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'

        $refs : {
            svgBuilder: SvgBuilder
        }
        file: File
        idName = 'text-property-modal'

        canvas

        created() {
            this.imgEl = document.getElementById('product-image')
        }

        get hashID(): string
        {
            return this.idName
        }

        inputSvgContent() {
            this.$refs.svgBuilder.updateSvg(this.svgContenComp)
        }

        async mounted()
        {
            // this.canvas = new fabric.Canvas('svg-editor');

            // // create a rectangle object
            // var rect = new fabric.Rect({
            // left: 100,
            // top: 100,
            // fill: 'red',
            // width: 20,
            // height: 20
            // });

            // // "add" rectangle onto canvas
            // this.canvas.add(rect);
        }




        onChangePseudoSelector()
        {
            this.reinitManagers()
        }

        onChangeSvg(e){
            this.svgContenComp = e
        }
        
        get svgContenComp()
        {
            return this.svgContent

        }
        
        set svgContenComp(newVal)
        {   
            // let base64Img = newVal
            // let color = new UnitUrl()
            // console.log(123456);

            // this.setPropertyToModel(new BackgroundImage(base64Img, color)) 
            // this.imgAttrManager.getProperty().setResource(base64Img)
            (<SvgTag><unknown>this.value).svgContent = newVal
            this.svgContent = newVal

            this.value.synchronize()

            // this.value.updateModelComponent()
        
        }


        
        
        
        //     if (!prop.isActive()) {
        //         return
        //     }
        //     if (!newVal) {
        //         return
        //     }
        //     // console.log('SET paddingUnitGlobal', newVal);
        //     var newUnit = this.getUnitByName(this.allUnits, newVal)
        //     // this.updateUnitInModel(newUnit, MarginCss.PROP_NAME)
        //     prop.setUnit(newUnit)
        //     this.updateCssPropWithMarginFilter(prop)

        // }

        // private setProp(newVal, prop: BasePropertyCss)
        // {
        //     if (!prop) {
        //         return
        //     }
        //     if (!prop.isActive()) {
        //         return
        //     }
        //     if (!newVal) {
        //         return
        //     }
        //     prop.setValue(newVal.toString())
        //     var a = this.updateCssPropWithMarginFilter(prop)
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
</style>
