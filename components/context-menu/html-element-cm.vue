<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">
        <div class="context-menu-container">
            <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

            <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>
        </div>
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

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    
    createH1Element(target, cm, a) {

        var el = this.htmlFactory.createH1()
        this.value.push(el)
        this.$emit('createdTag', el)

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

<style scoped>

</style>
