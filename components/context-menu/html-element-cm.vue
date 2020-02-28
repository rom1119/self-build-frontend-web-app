<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">
        <context-menu
        shift="both"
        :ref="createElementNameCM">

                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
         
                <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>
  
        </context-menu>
        <!-- <create-html-element-context-menu :value="value"  :ref="createElementNameCM" /> -->
        
                <context-menu-item v-context-menu="createElementNameCM">Nowy Element</context-menu-item>

           
                <context-menu-item :action="showTextCssModal">Font</context-menu-item>
                <context-menu-item :action="showBackgroundCssModal">Background</context-menu-item>
                <context-menu-item :action="showBorderCssModal">Border</context-menu-item>
                <context-menu-item :action="showBoxModelModal">BoxModel</context-menu-item>

    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import HtmlTagFactory from '~/src/Layout/HtmlTagFactory';
import HtmlTag from '../../src/Layout/HtmlTag';

@Component
export default class HtmlElementContextMenu extends Vue {

    @Prop({required: true, default: null})
    value: HtmlTag[]

    @Prop({required: true, default: null})
    htmlTagModel: HtmlTag

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    createElementNameCM = 'create-html-element-cm-'
    
    createH1Element(target, cm, a) {

        var el = this.htmlFactory.createH1()
        el.injectInitialCssStyles()
        this.value.push(el)

        this.$emit('createdTag', el)

    }

    showTextCssModal()
    {
        this.$textManageModal.show(this.htmlTagModel)
    }
    
    showBackgroundCssModal()
    {
        this.$backgroundManageModal.show(this.htmlTagModel)
    }
    
    showBorderCssModal()
    {
        this.$borderManageModal.show(this.htmlTagModel)
    }
    
    showBoxModelModal()
    {
        this.$boxModelManageModal.show(this.htmlTagModel)
    }

    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }

    mounted() {
        // console.log(this.value.uuid);
        this.createElementNameCM = this.createElementNameCM.concat(this.htmlTagModel.uuid)
    
        
    }
}
</script>

<style  scoped>
   
</style>
