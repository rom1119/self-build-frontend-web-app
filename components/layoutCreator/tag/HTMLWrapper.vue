<template>
    <div class="wrapper" :style="value.cssBoxList" :id="value.uuid" >
        <!-- <context-menu
                shift="both"
                :ref="value.uuid">
            <div class="context-menu-container">
                    <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                    <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

            </div>
        </context-menu> -->
        <html-element-context-menu :value="children"  :ref="value.uuid" />
        <!-- <border-main-component v-for="border in borders" :value="border" :key="border.uuid" >
        </border-main-component> -->

        <border-left :value="borderLeft" :key="borderLeft.uuid">
        </border-left>
        <span style="display: flex; flex-direction: column;">
            <border-top :value="borderTop" :key="borderTop.uuid">
            </border-top>
            

            <html-el 
                @contentMouseOver="onContentMouseOver" 
                @contentMouseOut="onContentMouseOut" 
                @contentMouseDown="onContentMouseDown(value, $event)"                 
                
                :value="value" 
                v-context-menu="value.uuid">
                <!-- <div class="wrapper-children"> -->
                    <!-- <template v-for="child in children"> -->
                        <html-component 
                        @contentMouseOver="onContentMouseOver" 
                        @contentMouseOut="onContentMouseOut" 
                        @contentMouseDown="onContentMouseDownChild($event)" 
                        v-for="child in children" 
                        :value="child" 
                        :key="child.uuid"  > 
                        </html-component>
                    <!-- </template>
                </div> -->
            </html-el>
                
            <border-bottom :value="borderBottom" :key="borderBottom.uuid">
            </border-bottom>
        </span>
        <border-right :value="borderRight" :key="borderRight.uuid">
        </border-right>
        
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
import LayoutEl from "../../../src/LayoutEl";


@Component
export default class HTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag

    
    borderFactory: BorderModelFactory = new BorderModelFactory()

    contextMenuName = 'cm-create-html-element123'

    onContentMouseOver(val)
    {
        this.$emit('contentMouseOver', val)  
    }

    onContentMouseOut(val)
    {
        this.$emit('contentMouseOut', val)  
    }


    onContentMouseDown(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('contentMouseDown', ev)  
    }
    onContentMouseDownChild(val)
    {
        this.$emit('contentMouseDown', val)  
    }

    get children() : LayoutEl[]
    {
        return this.value.children
    }
    
    set children(arg: LayoutEl[])
    {
        this.value.children = arg
    }

    get borders() : BorderModel[]
    {
        return this.value.borders
    }
    
    set borders(arg: BorderModel[])
    {
        this.value.borders = arg
    }


    get borderLeft() : BorderModel
    {
        return this.value.borderLeft
    }
    
    set borderLeft(arg: BorderModel)
    {
        this.value.borderLeft = arg
    }

    get borderRight() : BorderModel
    {
        return this.value.borderRight
    }
    
    set borderRight(arg: BorderModel)
    {
        this.value.borderRight = arg
    }

    get borderBottom() : BorderModel
    {
        return this.value.borderBottom
    }
    
    set borderBottom(arg: BorderModel)
    {
        this.value.borderBottom = arg
    }

    get borderTop() : BorderModel
    {
        return this.value.borderTop
    }
    
    set borderTop(arg: BorderModel)
    {
        this.value.borderTop = arg
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
        display: flex;
        // display: flex;
    }
    .relative {
        position: relative;
    }
    .wrapper-el-editable {
        flex-grow: 1;
        flex-grow: 1;
        // float: left;
    }
    #loadingDialog {
        .v-dialog {
            width: auto;
        }
    }
</style>
