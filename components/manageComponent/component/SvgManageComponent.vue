<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">

            <svg-builder ref="svgBuilder" v-if="value" @changeSvg="onChangeSvg" :value="value.svgContent" />
            <div class="content-item__elem_container ">
            
                <div class="content-item">
                    <h4 class="content-item__header">
                        SVG content
                    </h4>
                    
                    <div class=" content-item" >
                        <label style="width: 100%;">
                            Link to external resource
                            
                            <textarea style="width: 100%; height: 300px;" @input="inputSvgContent"  v-model="svgContenComp" >

                            </textarea>
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
    import SvgBuilder from '~/components/fabricjs/SvgBuilder.vue';
    import SvgManage from '../SvgManage';
    import SvgTag from '~/src/Layout/tag/SvgTag';

    @Component({
        components: {
            SvgBuilder
        }
    })
    export default class SvgManageComponent extends SvgManage {

        @Prop({default: null, required: true})
        activeTag

        @Prop({default: false, required: false})
        autoUpdate

        @Watch('activeTag')
        updateTag() {
            this.onInitTag()
        }

        onInitTag(){
            if (this.activeTag) {
                this.setAutoSave(this.autoUpdate)
                this.init(this.activeTag)
            }
        }

        async mounted() {
            this.onInitTag()
        }

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
