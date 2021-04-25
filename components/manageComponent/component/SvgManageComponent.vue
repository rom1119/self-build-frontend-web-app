<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">

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

        @Watch('activeTag')
        updateTag() {
            console.log('TextManagComponent updated');
            console.log(this.activeTag);
            if (this.activeTag) {
                this.init(this.activeTag)
            } else {
            }
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
