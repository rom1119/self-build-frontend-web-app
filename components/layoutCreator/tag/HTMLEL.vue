<template>

    <div class="wrapper-el" :style="value.cssList" v-html="value.tag" @mouseover="onMouseOver" @mouseout="onMouseOut">
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from '~/src/Layout/HtmlTag';


@Component
export default class HTMLEL extends Vue {


    @Prop()
    value: HtmlTag
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()


    contextMenuName = 'cm-create-html-element123'

    onMouseOver() {
        this.value.changeAsActiveSize()

    }

    onMouseOut() {
        this.value.changeAsDeactiveSize()
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
    .wrapper-el {
        // float: left;
    }
    #loadingDialog {
        .v-dialog {
        width: auto;
        }
    }
</style>
