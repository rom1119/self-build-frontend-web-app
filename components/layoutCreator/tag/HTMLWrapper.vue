<template>
    <div class="wrapper" :id="value.uuid" :style="value.cssList">
        <context-menu
                shift="both"
                :ref="value.uuid">
            <div class="context-menu-container">
                    <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                    <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

            </div>
        </context-menu>
        <!-- <border-main-component v-for="border in borders" :value="border" :key="border.uuid" >
        </border-main-component> -->

        <border-left :value="borderLeft" :key="borderLeft.uuid">
        </border-left>
        <div style="display: flex; flex-direction: column; width: 100%;">
            <border-top :value="borderTop" :key="borderTop.uuid">
            </border-top>
            <div v-show="value.isEdited" class="wrapper-el-editable" >
                <html-el-editable :value="value" ref="editableEl">
                </html-el-editable>
            </div>

            <html-el v-show="!value.isEdited" 
            
            @dblclick.native="onDoubleClick($event)" 
            :value="value" 
            v-context-menu="value.uuid">
            </html-el>
                
            <border-bottom :value="borderBottom" :key="borderBottom.uuid">
            </border-bottom>
        </div>
        <border-right :value="borderRight" :key="borderRight.uuid">
        </border-right>
        <div class="wrapper-children">
            <template v-for="child in children">
                <html-component :value="child" :key="child.uuid"  >
                </html-component>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HTMLELEditable from './HTMLELEditable.vue';
import MouseDetector from '~/src/Layout/MouseDetector';
import BorderModelFactory from '~/src/Layout/Border/BorderModelFactory';
import BorderModel from '~/src/Layout/Border/BorderModel';


@Component
export default class HTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag
    
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    protected borders: BorderModel[] = []
    protected borderBottom: BorderModel
    protected borderTop: BorderModel
    protected borderLeft: BorderModel
    protected borderRight: BorderModel
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    borderFactory: BorderModelFactory = new BorderModelFactory()


    $refs: {
        editableEl: any
    }
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
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }

    initBorders()
    {
        let left = this.borderFactory.createLeft()
        let right = this.borderFactory.createRight()
        let top = this.borderFactory.createTop()
        let bottom = this.borderFactory.createBottom()

        this.borders.push(left)
        this.borders.push(right)
        this.borders.push(top)
        this.borders.push(bottom)

        this.borderBottom = bottom
        this.borderTop = top
        this.borderLeft = left
        this.borderRight = right
    }

    
    onDoubleClick(e) 
    {
        this.value.onDoubleClick(e)
        let compStyles = window.getComputedStyle(e.target);
        var heightTable = compStyles.getPropertyValue('height')

        this.$refs.editableEl.focus()
            

    }
    created() {
        // console.log(this.value.uuid);
        this.initBorders()
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        
        
    }

    mounted()
    {
        var htmlEl = window.document.getElementById(this.value.uuid)
        this.value.htmlEl = htmlEl
    }
}
</script>

<style lang="scss">
    .wrapper {
        display: inline-flex;
        // display: flex;
    }
    .relative {
        position: relative;
    }
    .wrapper-el-editable {
        // float: left;
    }
    #loadingDialog {
        .v-dialog {
            width: auto;
        }
    }
</style>
