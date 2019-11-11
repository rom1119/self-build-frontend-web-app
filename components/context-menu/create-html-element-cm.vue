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

@Component
export default class CreateHtmlElementContextMenu extends Vue {

    @Prop({required: true, default: null})
    value: HtmlTag[]

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    
    createH1Element(target, cm, a) {

        var el = this.htmlFactory.createH1()
        this.value.push(el)
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
