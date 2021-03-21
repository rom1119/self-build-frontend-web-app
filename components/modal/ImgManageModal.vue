<template>

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Zdjęcie
            </h4>
        </template>
        <template slot="content">
            <div class="content-item__elem_container ">
            
                <div class="content-item-half">
                    <h4 class="content-item__header">
                        Zdjęcie tła
                    </h4>
                    <div class=" content-item">
                        
                        <input type="file" id="imgFile" @change="previewThumbnail($event);" accept="image/*" class="input-file">  
                        <div>
                            <button v-if="imgSrcManager.getAttr().resource" @click.stop="deleteResource" type="button">
                                Usuń zasób
                            </button>
                            <img v-if="imgAttr.resource"  :src="imgAttr.resource" alt="" width="200" height="200">
                            <img v-else :src="imgSrcManager.getAttr().resourceUrl" alt="" width="200" height="200">

                        </div>
                    </div>
                    <div class=" content-item" v-if="!imgSrcManager.getAttr().resource">
                        <label for="">
                            Link do zewnętrznego zasobu
                            
                            <input type="text" style="width: 100%;" @change="updateBackgroundImage" v-model="imgSrcManager.getAttr().resourceUrl" />
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
import ImgModal from '../ImgModal';
import SrcManager from '../computedPropertyManagers/htmlAttr/SrcManager';
import DomainResource from '~/src/Css/DomainResource';
import TagResource from '~/src/Css/TagResource';
import ImgTag from '~/src/Layout/tag/ImgTag';
import SrcAttr from '~/src/Attribute/html/SrcAttr';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component
    export default class ImgManageModal extends ImgModal {
        
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'

        file: File
        idName = 'text-property-modal'

        created() {
            this.imgEl = document.getElementById('product-image')
        }

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        onChangePseudoSelector()
        {
            this.reinitManagers()
        }

        
        
        get imgAttr(): SrcAttr
        {
            return this.imgSrcManager.attr

        }
        
        set imgAttr(newVal: SrcAttr)
        {   
            let base64Img = newVal
            let color = new UnitUrl()
            console.log(123456);

            // this.setPropertyToModel(new BackgroundImage(base64Img, color)) 
            // this.imgAttrManager.getProperty().setResource(base64Img)
            (<TagResource><unknown>this.imgSrcManager.attr).file = this.file
            // this.backgroundImageManager.getqProperty().setValue(base64Img)

            // @ts-ignore
            this.imgSrcManager.updateResource(this.imgSrcManager.getHtmlTag())
        }

        deleteResource()
        {
            
            (<SrcManager><unknown>(this.imgSrcManager)).deleteResource()

        }

        updateBackgroundImage()
        {
            console.log(this.value);
            (<SrcManager><unknown>(this.imgSrcManager)).updateResource()
        }


       

        previewThumbnail (event) {
          var input = event.target
          var that = this
        //   this.formData.file = event.target.files[0]
          console.log(event.target.files)
          if (input.files && input.files[0]) {
              this.file = input.files[0]
              console.log(event);
              console.log(event.target);
              console.log(event.target.files[0]);
              
            var reader = new FileReader()
            reader.onload = function (e) {
                // @ts-ignore
              that.imgAttr = e.target.result
              // el.imgUrl = e.target.result
            //   console.log(el)
//              $('#logo-demo').attr('src', e.target.result)
            }
            reader.readAsDataURL(input.files[0])
          }
        }
        
        
        
        // private setPropUnit(newVal, prop: BasePropertyCss){
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
