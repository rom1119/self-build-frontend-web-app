<template>

    <component class="wrapper-el" :is="value.getTagName()" @dblclick.stop="onDoubleClick($event)" :style="value.cssList" @mousedown.stop="onMouseDown($event)" @mouseover.stop="onMouseOver" @mouseout.stop="onMouseOut">
        <div v-show="value.isEdited" class="wrapper-el-editable" >
            <html-el-editable :value="value" ref="editableEl">
            </html-el-editable>
        </div>
        <div v-show="!value.isEdited">
            {{ value.innerText }}
        </div>
        <slot ></slot>
    </component>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from '~/src/Layout/HtmlTag';
import HTMLELEditable from "./HTMLELEditable.vue";


@Component
export default class HTMLEL extends Vue {
    @Prop()
    value: HtmlTag
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    $refs: {
        editableEl: HTMLELEditable
    }

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
        console.log(this);
        console.log(this.$refs);
        console.log(this.$refs.editableEl);
        
        this.$refs.editableEl.focus()


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
    .wrapper-el-editable {
        flex-grow: 1;
        flex-grow: 1;
        // float: left;
    }
</style>
