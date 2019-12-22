<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Tło elementu
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Kolor tła
                </h4>
                <div class=" content-item__elem_container">
                    <h2>
                        {{ backgroundColor }}
                    </h2>
                    <Chrome v-model="backgroundColor" :color="backgroundColor" label="Color" />

                    
                </div>
            </div>  
            <div class="content-item">
                <h4 class="content-item__header">
                    Zdjęcie tła
                </h4>
                <div class=" content-item__elem_container">
                    <h2>
                        {{ backgroundColor }}
                    </h2>
                    <input type="file" id="imgFile" @change="previewThumbnail($event);" accept="image/*" class="input-file">  
                </div>
            </div> 
            <div class="content-item">
                <h4 class="content-item__header">
                    Background position
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in backgroundPositions" :key="el">
                        <label :for="'backgroundPosition-' + el">
                            {{ el }}
                            <input type="radio" v-model="backgroundPosition" :value="el" name="backgroundPosition" :id="'backgroundPosition-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item">
                <h4 class="content-item__header">
                    Background size
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in backgroundSizes" :key="el">
                        <label :for="'backgroundSize-' + el">
                            {{ el }}
                            <input type="radio" v-model="backgroundSize" :value="el" name="backgroundSize" :id="'backgroundSize-' + el">

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
import Named from '~/src/Unit/Color/Named';
import BackgroundImage from '../../src/Css/Background/BackgroundImage';
import UnitUrl from '../../src/Unit/UnitUrl';
import base64 from 'base-64';
import BackgroundSize from '../../src/Css/Background/BackgroundSize';
import BackgroundPosition from '../../src/Css/Background/BackgroundPosition';

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
                Chrome
            }
        }
    )
    export default class BackgroundManageModal extends AbstractModal {
        
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'
        backgroundSizes: string[] = BackgroundSize.getAccessableProperty()
        backgroundPositions: string[] = BackgroundPosition.getAccessableProperty()

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

        get backgroundColor()
        {
            var prop = this.getPropertyFromModel(BackgroundColor.PROP_NAME)
            return prop
        }
        
        set backgroundColor(newVal)
        {   
            var col: Color = <any>newVal
            let red = col.rgba.r
            let green = col.rgba.g
            let blue = col.rgba.b
            let alpha = col.rgba.a
            let color = new RGBA()
            this.setPropertyToModel(new BackgroundColor(col.rgba, color)) 
        }
        
        get backgroundImage()
        {
            return this.getPropertyFromModel(BackgroundImage.PROP_NAME)
        }
        
        set backgroundImage(newVal)
        {   
            // var col: Color = <any>newVal
            // let red = col.rgba.r
            // let green = col.rgba.g
            // let blue = col.rgba.b
            // let alpha = col.rgba.a
            // console.log(newVal);
            
            // return
            let base64Img = newVal
            let color = new UnitUrl()
                        console.log(123456);

            this.setPropertyToModel(new BackgroundImage(base64Img, color)) 
        }
        
        get backgroundSize()
        {
            return this.getPropertyFromModel(BackgroundSize.PROP_NAME)
        }
        
        set backgroundSize(newVal: string)
        {
            this.setPropertyToModel(new BackgroundSize(newVal, new Named())) 
        }
        
        get backgroundPosition()
        {
            return this.getPropertyFromModel(BackgroundPosition.PROP_NAME)
        }
        
        set backgroundPosition(newVal: string)
        {
            this.setPropertyToModel(new BackgroundPosition(newVal, new Named())) 
        }


        previewThumbnail (event) {
          var input = event.target
          var that = this
        //   this.formData.file = event.target.files[0]
          console.log(event.target.files)
          if (input.files && input.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
              that.backgroundImage = e.target.result
              // el.imgUrl = e.target.result
            //   console.log(el)
//              $('#logo-demo').attr('src', e.target.result)
            }
            reader.readAsDataURL(input.files[0])
          }
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss" scoped> 
    
</style>
