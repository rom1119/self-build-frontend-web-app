<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">

                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
         
                <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>
  
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
        el.injectInitialCssStyles()
        this.value.push(el)
        el.setApi(this.api)
        el.setProjectId(this.$route.params.id)
        this.api.appendTagToProject(el)

        this.$emit('createdTag', el)

    }

    createPElement(target, cm, a) {
        // var el = this.htmlFactory.cre()
        // this.value.push(el)
        // this.$emit('createdTag', el)
        // console.log(cm);
        // other actions...
    }
}
</script>

<style scoped>

</style>
