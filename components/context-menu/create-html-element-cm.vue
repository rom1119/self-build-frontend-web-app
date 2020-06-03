<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">

                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
         
                <context-menu-item :action="createDivElement">Stwórz DIV</context-menu-item>
                 <context-menu-item :action="createInputTextElement">Stwórz Input Tekstowy</context-menu-item>
                <context-menu-item :action="createButtonElement">Stwórz Buttom</context-menu-item>
    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import HtmlTagFactory from '~/src/Layout/HtmlTagFactory';
import HtmlTag from '../../src/Layout/HtmlTag';
import ApiService from '~/src/Api/ApiService';
import DefaultApiService from '~/src/Api/impl/DefaultApiService';

@Component
export default class CreateHtmlElementContextMenu extends Vue {

    @Prop({required: true, default: null})
    value: HtmlTag[]

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    api: ApiService

    mounted() {
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

    initCreatedTag(el){
        el.injectInitialCssStyles()
        this.value.push(el)
        el.setProjectId(this.$route.params.id)
        this.api.appendTagToProject(el)
        el.synchronize()

        this.$emit('createdTag', el)
    }
    
   
}
</script>

<style scoped>

</style>
