<template>

    <component class="wrapper-el" :is="value.getTagName()" :style="value.cssList" @mousedown.stop="onMouseDown($event)" @mouseover.stop="onMouseOver" @mouseout.stop="onMouseOut">
        {{ value.innerText }}
        <slot ></slot>
    </component>

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
        this.$emit('contentMouseOver', this.value)

    }

    onMouseOut() {
        this.$emit('contentMouseOut', this.value)
    }

    onMouseDown(ev) {
        
        
        this.$emit('contentMouseDown', ev)
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
