<template>
    <span @dblclick.stop="onDoubleClick($event)" @mousedown.stop="" @click.stop="" :id="value.shortUUID" >
        <span v-show="value.isEdited" class="wrapper-el-editable" >
            <div class="remove-text" @mousedown.stop="setAsClicked" @click.stop="onEmitRemove(value, $event)">
                X
            </div>
            <html-el-editable :value="value" style="width: 100%" class="boxsizingBorder" @blur="onBlur" ref="editableEl">
            </html-el-editable>
        </span>
        <!-- {{ value.paddingRightWidth }} -->
        <span  v-show="!value.isEdited" :id="value.shortUUID + '-content'" :key="value.paddingRightWidth" class="inner-text-el">
            {{ value.text }}
        </span>
    </span>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from '~/src/Layout/HtmlTag';
import HTMLELEditable from "./HTMLELEditable.vue";
import TextNode from "../../../src/Layout/TextNode";


@Component
export default class HTMLTextNode extends Vue {
    @Prop()
    value: TextNode
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    isClickedRemove = false

    $refs: {
        editableEl: HTMLELEditable
    }

    contextMenuName = 'cm-create-html-element123'

    onBlur() 
    {
        if (!this.isClickedRemove) {
            this.value.setNotEdited()

        }

    }

    onMouseOver() {   
        // console.log('over');
        // console.log(this.value);
        // console.log('over');
             
        this.$emit('contentMouseOver', this.value)

    }

    onMouseOut() {
        // console.log('out');
        // console.log(this.value);
        // console.log('out');
        this.$emit('contentMouseOut', this.value)
    }

    setAsClicked()
    {
        this.isClickedRemove = true
    }

    onEmitRemove(val) {
        this.isClickedRemove = true
        setTimeout(() => {
            this.isClickedRemove = false
            this.onDoubleClick()
        }, 50)
        this.$emit('tagRemove', this.value)  

    }
    
    onClick(ev) {
        this.$emit('contentMouseClick', ev)
    }
    
    onDoubleClick() 
    {
        this.value.onDoubleClick()
        // console.log(this);
        // console.log(this.$refs);
        // console.log(this.$refs.editableEl);
        
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
    * {
        margin: 0;
        padding: 0;
        border: 0;
    }
    .wrapper-el {
        // float: left;
    }
    .inner-text-el {
        // width: 100%;
        // height: 100%;
    }
    #loadingDialog {
        .v-dialog {
        width: auto;
        }
    }
    .wrapper-el-editable {
        // flex-grow: 1;
        // flex-grow: 1;
        position: relative;
        // float: left;
    }

    .boxsizingBorder {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
                box-sizing: border-box;
    }

    .remove-text {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        padding: 2px;
        font-size: 8px;
        border-radius: 100%;
        background-color: aqua;
        z-index: 99999999;
        border: 2px solid #998866;
        text-shadow: none;
        color: black;
        font-size: 1em;
    }
    .remove-text:hover {
        background-color: rgb(67, 184, 184);
    }
</style>
