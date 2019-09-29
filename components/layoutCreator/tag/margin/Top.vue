<template>

    <div class="wrapper-el" v-html="value.tag" :style="value.styleList">
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '../../src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";


@Component
export default class HTMLEL extends Vue {


    @Prop()
    value: HtmlTag
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()


    contextMenuName = 'cm-create-html-element123'

    createH1Element(target, cm, a) {
        console.log(
        )

        var el = this.htmlFactory.createH1()
        // console.log('qqqqq')

        this.children.push(el)

    }

    createPElement(target, cm, a) {
        console.log(
        )
        // console.log(this.$children);
        // console.log(cm);
        // other actions...
    }
    onDoubleClick(e) 
    {
        this.value.onDoubleClick(e)
        let compStyles = window.getComputedStyle(e.target);
        var heightTable = compStyles.getPropertyValue('height')

        // console.log(heightTable);
            

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>

<style lang="scss">
#loadingDialog {
    .v-dialog {
    width: auto;
    }
}
</style>
