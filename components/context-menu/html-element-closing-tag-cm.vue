<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">
        <context-menu
            shift="both"
            :ref="createElementNameCM">

                <context-menu-item :action="createDivElement">Stwórz DIV</context-menu-item>
                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
                <context-menu-item :action="createInputTextElement">Stwórz Input Tekstowy</context-menu-item>
                <context-menu-item :action="createButtonElement">Stwórz Buttom</context-menu-item>
                <context-menu-item :action="createExampleTable">Tabela (przykład)</context-menu-item>

         
  
        </context-menu>
        <!-- <create-html-element-context-menu :value="value"  :ref="createElementNameCM" /> -->
        
        <context-menu-item v-context-menu="createElementNameCM">Nowy Element</context-menu-item>
        <context-menu-item :action="createText">Dodaj tekst</context-menu-item>

    
        <context-menu-item :action="showTextCssModal">Font</context-menu-item>
        <context-menu-item :action="showBackgroundCssModal">Background</context-menu-item>
        <context-menu-item :action="showShadowCssModal">Shadow</context-menu-item>
        <context-menu-item :action="showBoxModelModal">BoxModel</context-menu-item>
        <context-menu-item :action="showDisplayModal">Display</context-menu-item>
        <context-menu-item :action="showAnimationModal">Animation</context-menu-item>
        <context-menu-item :action="showGradientModal">Gradient</context-menu-item>

    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import HtmlTagFactory from '~/src/Layout/HtmlTagFactory';
import HtmlTag from '../../src/Layout/HtmlTag';
import ApiService from '~/src/Api/ApiService';
import DefaultApiService from '~/src/Api/impl/DefaultApiService';
import TextNode from '~/src/Layout/TextNode';
import LayoutEl from '../../src/LayoutEl';

@Component
export default class HtmlElementContextMenu extends Vue {

    @Prop({required: true, default: null})
    value: HtmlTag

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    createElementNameCM = 'create-html-element-cm-'
    api: ApiService


    mounted() {
        // console.log(this.value.uuid);
        this.createElementNameCM = this.createElementNameCM.concat(this.value.uuid)
        this.api = new DefaultApiService();
        
    }
    
    createH1Element(target, cm, a) {
        var el = this.htmlFactory.createH1()
        this.initCreatedTag(el)
    }
    
    createDivElement(target, cm, a) {

        var el = this.htmlFactory.createDiv()
        this.initCreatedTag(el)
    }
    
    createInputTextElement(target, cm, a) {
        var el = this.htmlFactory.createInputText()
        this.initCreatedTag(el)
    }
    
    createButtonElement(target, cm, a) {
        var el = this.htmlFactory.createButton()
        this.initCreatedTag(el)
    }

    createExampleTable(target, cm, a) {
        var el = this.htmlFactory.createNormalTable()
        this.initCreatedTag(el)
    }

    initCreatedTag(el){
        el.parent = this.value
        el.projectId = this.value.projectId
        
        el.injectInitialCssStyles()
        el.injectInitialSelectors()
        el.setProjectId(this.$route.params.id)
        this.value.appendChildDeep(el)

        this.$emit('createdTag', el)
    }

    

    createText()
    {
        let text = this.htmlFactory.createText();
        text.parent = this.value
        text.projectId = this.value.projectId
        text.setProjectId(this.$route.params.id)

        this.value.appendChildDeep(text)
    }
    
    showTextCssModal()
    {
        this.$textManageModal.show(this.value)
    }
    
    showBackgroundCssModal()
    {
        this.$backgroundManageModal.show(this.value)
    }
    
    showBorderCssModal()
    {
        this.$borderManageModal.show(this.value)
    }
    
    showShadowCssModal()
    {
        this.$shadowManageModal.show(this.value)
    }
    
    showBoxModelModal()
    {
        this.$boxModelManageModal.show(this.value)
    }
    
    showDisplayModal()
    {
        this.$displayManageModal.show(this.value)
    }
    
    showAnimationModal()
    {
        this.$animationManageModal.show(this.value)
    }
    
    showGradientModal()
    {
        this.$gradientManageModal.show(this.value)
    }

    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }

    
}
</script>

<style  scoped>
   * {
       text-shadow: none;
       font-size: 1em;
       font-weight: initial;
       font-stretch: initial;
       font-style: initial;
        line-height: initial;

   }
</style>
