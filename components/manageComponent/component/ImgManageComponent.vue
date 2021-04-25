<template>
    <div class="component-manage" v-if="value && canManage" >
        <div class="component-manage__content">
        
            <div class="content-item__elem_container ">
            
                <div class="content-item-half">
                    <h4 class="content-item__header">
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
        </div>
   </div>
</template>

<script lang="ts">
    import {Component, Watch, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import { Chrome }  from '~/node_modules/vue-color';
import ShadowManage from '../ShadowManage';
import HtmlAttrManage from '../HtmlAttrManage';
import HtmlAttrManager from '~/components/computedPropertyManagers/HtmlAttrManager';
import { CustomAttr } from '~/src/Attribute';
import HtmlAttr from '~/src/Attribute/HtmlAttr';
import ImgManage from '../ImgManage';
import SrcManager from '~/components/computedPropertyManagers/htmlAttr/SrcManager';
import SrcAttr from '~/src/Attribute/html/SrcAttr';
import TagResource from '~/src/Css/TagResource';
import { UnitUrl } from '~/src/Unit';
import ImgTag from '~/src/Layout/tag/ImgTag';

    @Component({
        components: {
            Chrome
        }
    })
    export default class ImgManageComponent extends ImgManage {

        @Prop({default: null, required: true})
        activeTag

        @Watch('activeTag')
        updateTag() {
            console.log('TextManagComponent updated');
            console.log(this.activeTag);
            if (this.activeTag) {
                this.canManage = this.activeTag instanceof ImgTag
                this.init(this.activeTag)
            } else {
            }
        }

        canManage = false

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