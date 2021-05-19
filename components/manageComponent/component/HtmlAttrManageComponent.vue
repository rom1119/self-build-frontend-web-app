<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
            <div class="content-item" style="display: flex;" >
                
                    <div class="content-item-half"  >
                        <h4 class="content-item__header">
                            Attributes
                            <span class="add-btn" @click="addDefaultCustomAttr">
                                +
                            </span>
                        </h4>
                        <default-html-attr-component 
                            v-for="(val, index) in managers"
                            @change="onChangeAttr(val.attr, index)" 
                            @toggleAttr="onToggleAttr(val.attr, index)" 
                            :key="val.id" 
                            :tag="val.getHtmlTag()" 
                            :index="index" 
                            :value="val.attr" 
                         />

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

    @Component({
        components: {
            Chrome
        }
    })
    export default class HtmlAttrManageComponent extends HtmlAttrManage {

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
        // value: HtmlTag
 

        idName = 'text-property-modal'

        created()
        {
            console.log('DDDDDDDD');
            // console.log(this.property);
            
        }

        // onChangeTextShadow(prop) {
        //     console.log('update');
        //     // console.log(val);
        //     this.textShadowManager.updateCssProp(this.textShadowManager.getProperty())             

        // }

        // onRemoveCustomAttr(val)
        // {
        //     var length = this.customManagerList.length
        //     for (var i = 0; i < length; i++) {
        //         var el = this.customManagerList[i].attr
        //         if (el.key == val.key) {
        //             this.customManagerList.splice(i, 1)
        //             break
        //         }
        //     }
        // }
        
        onToggleAttr(val: HtmlAttr, i) {
            // console.log('val', val);
            // console.log('i', i);
            
            if (val.active) {
            // console.log('active');

                (<HtmlAttrManager<any>>this.managers[i]).deactivateAttr(val)
                if (val instanceof CustomAttr) {
                    this.onRemoveAttr(val, i)
                } 
            } else {
                if (!(val instanceof CustomAttr)) {
                    (<HtmlAttrManager<any>>this.managers[i]).activateAttr(val)
                } 
            console.log('not active');
            }
        }

        onChangeAttr(val: HtmlAttr, i) {
            console.log('update');
            // var i = this.findAttrIndexByName(val)
            if (i != null) {
                (<HtmlAttrManager<any>>this.managers[i]).updateAttr(val)
            }            
        }

        findAttrIndexByName(val: HtmlAttr) {
            var length = this.managers.length
            for (var i = 0; i < length; i++) {
                var el: HtmlAttrManager<any> = <HtmlAttrManager<any>>this.managers[i]
                if (el.attr.key == val.key) {
                    return i
                }
            }

            return null
        }

        onRemoveAttr(val: HtmlAttr, i)
        {
            // var i = this.findAttrIndexByName(val)
            if (i != null) {
                this.managers.splice(i, 1)
            }
        }
        
        // *****************************************  TEXT-SHADOW ****************************************************        
    

        // get hasTextShadow()
        // {
        //     return  this.textShadowManager.getProperty().active
        // }
        
        // set hasTextShadow(newVal: boolean)
        // {
        //     if (!newVal) {
        //         this.textShadowManager.deactivePropCss(this.textShadowManager.getProperty())
        //     } else {
        //         this.textShadowManager.activePropCss(this.textShadowManager.getProperty())
        //     }
        // }

        addDefaultCustomAttr()
        {
            // @ts-ignore
            var man = this.addCustomAttr()
            // this.textShadowManager.getProperty().addValue(initVal)
            man.activateAttr(man.attr)
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