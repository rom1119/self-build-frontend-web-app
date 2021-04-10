<template>

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Font Face
            </h4>
        </template>
        <template slot="content">
            <div class="content-item" style="display: flex">
                <div
                class="content-item-half"
                >
                    <h4 class="content-item__header">
                        
                        <span class="add-btn btn" @click="addNewFont"> Dodaj FONT </span>
                    </h4>
                </div>
            </div>
            <div v-if="active" class="container ">
            
                <div v-for="font in accessor.all" :key="font.id" class="content-item-left green-b p-5">
                    <p class="content-item__header rel">
                        <button class="right-btn btn btn_sm" @click="addFontSrc(font)"> Add Src </button>

                    </p>
                    <div class=" content-item rel">
                        Nazwa czcionki
                        <input type="text" class="w90" @input="changeFont(font)" v-model="font.name" :name="'name' + font.id">
                        <span class="p-abs">
                            <span class="btn btn_red btn_sm" @click="removeFont(font)"> USUN FONT </span>
                        </span>

                    </div>
                        <span>
                            Src list:
                        </span>
                    <div class="content-item red-b m-2 rel" v-for="srcEl, key in font.src" :key="srcEl.id">
                        <span style="left: 0px;" class="p-abs lab">
                            {{ key + 1 }}.
                        </span>
                        <span class="p-abs" style="right: 0px;">
                            <span class="btn btn_red btn_sm" @click="removeFontSrc(font, srcEl)"> USUN SRC </span>
                        </span>
                        <input type="file" id="imgFile" @change="updateFile($event, font, srcEl);" accept="font/ttf, font/otf, font/woff, font/woff2" class="input-file">  
                        </br>
                        <span v-show="srcEl.resourceError" class="error">
                            {{ srcEl.resourceError }}
                        </span>
                        <div>
                            <button v-if="srcEl.resource"  class="btn btn_sm" @click.stop="deleteResource(font, srcEl)" type="button">
                                Usuń zasób
                            </button>
                            <p v-if="srcEl.resource" style="overflow-x:scroll;"   alt="" width="200" height="200">
                                Wewnętrzny zasób <span  class="white-gray small-font">{{ srcEl.resource }}</span>
                            </p>
                            <p v-else alt="" width="200" height="200">
                                Link do zasobu <span class="white-b">{{ srcEl.resourceUrl }}</span>
                            </p>

                        </div>
                        <div class=" " v-if="!srcEl.resource">
                            <label for="">
                                Link do zewnętrznego zasobu
                                
                                <input type="text" style="width: 100%;" @input="updateFontUrl(font, srcEl)" v-model="srcEl.resourceUrl" />
                            </label>
                        </div>
                        
                        <div>
                            <label for="">
                                Format
                                <select @change="updateFontUrl(font, srcEl)" v-model="srcEl.format" :name="'font-src-format-' + srcEl.id" >
                                    <option v-for="format, k in formatsFont" :key="k"  :value="format">{{ format }}</option>
                                </select>
                            </label>
                        </div>
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
import DomainResource from '~/src/DomainResource';
import TagResource from '~/src/Css/TagResource';
import ImgTag from '~/src/Layout/tag/ImgTag';
import SrcAttr from '~/src/Attribute/html/SrcAttr';
import FontFaceModal from '../FontFaceModal';
import AssetDomain from '~/src/Assets/AssetDomain';
import SrcFont from '~/src/Fonts/SrcFont';
import FontFace from '~/src/Fonts/FontFace';
import FontFaceAccessor from '~/src/Fonts/FontFaceAccessor';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component
    export default class FontFaceManageModal extends FontFaceModal {
        
        formatsFont = ['woff', 'woff2', 'truetype', 'opentype', 'embedded-opentype', 'svg']
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'
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
            // this.managers = 
        }

        onChangePseudoSelector()
        {
            // this.reinitManagers()
        }

        changeFont(font: FontFace){
            this.accessor.updateFont(font)
        }

        addNewFont() {
            this.accessor.addFontAndSave(FontFaceAccessor.NEW_DEFAULT_INSTANCE())
        }

        addFont(font: FontFace) {
            // console.trace(font)
            this.accessor.addFont(font)
        }
        
        removeFont(font: FontFace) {
            this.accessor.removeFont(font)
        }
        addFontSrc(font: FontFace) {
            var fontSrc = new SrcFont()
            this.accessor.addFontSrcAndSave(font, fontSrc)
        }
        
        removeFontSrc(font: FontFace, src: SrcFont) {
            this.accessor.removeFontSrcAndSave(font, src)
        }
        
        setFile(font: FontFace, src: SrcFont, file)
        {   
            let color = new UnitUrl()
            console.log(123456);
            src.file = file

            // this.setPropertyToModel(new BackgroundImage(base64Img, color)) 
            // this.imgAttrManager.getProperty().setResource(base64Img)
            // this.backgroundImageManager.getqProperty().setValue(base64Img)
    
            this.accessor.updateResource(font, src).then(
                (res) => {
                    // console.log('GIT');
                    // console.log(res);
                    src.file = null
                    src.resource = res.data.resourcePath
                },
                (error) => {
                    if (error.response.data) {
                        if (error.response.data.errors[0]) {
                            src.resourceError = error.response.data.errors[0].message
                        }
                    } else {
                        alert('server ERR')
                    }
                    // console.log('ERR');
                    // console.log(error.response.data.errors);
                }
            )
        }

        deleteResource(font: FontFace, src: SrcFont)
        {
            this.accessor.deleteResource(font, src)

        }

        updateFontUrl(font: FontFace, src: SrcFont)
        {
            // console.log(src)
            this.$nextTick(() => {
                this.accessor.updateSrcResurceUrl(font, src)

            })
        }

        updateFile (event, font: FontFace, src: SrcFont) {
          var input = event.target
          var that = this
          var file 
          console.log();
        //   this.formData.file = event.target.files[0]
          console.log(event.target.files)
          if (input.files && input.files[0]) {
              file = input.files[0]
            //   console.log(event);
            //   console.log(event.target);
            //   console.log(event.target.files[0]);
              
                this.setFile(font, src, file)
//             var reader = new FileReader()
//             reader.onload = (e) => {
//                 // @ts-ignore
//               // el.imgUrl = e.target.result
//             //   console.log(el)
// //              $('#logo-demo').attr('src', e.target.result)
//             }
//             reader.readAsDataURL(input.files[0])
          }
        }

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
