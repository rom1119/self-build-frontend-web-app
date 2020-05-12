<template>
    <component :is="value.getTagName()" class="wrapper" :style="value.cssBoxList"  :key="value.updateComponentKey" :id="value.uuid" >
        <div class="none">
            <!-- <span :style="value.cssBoxList"  ></span> -->
        </div>
        <div class="remove" v-show="value.isActiveTagToManage()" @click.stop="onEmitRemove(value, $event)">
            X
        </div>
        <!-- <context-menu
                shift="both"
                :ref="value.uuid">
            <div class="context-menu-container">
                    <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                    <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

            </div>
        </context-menu> -->
        <html-element-context-menu :value="value" :ref="value.uuid" />
        <!-- <border-main-component v-for="border in borders" :value="border" :key="border.uuid" >
        </border-main-component> -->

        <margin-left 
            :value="marginLeft"
            :key="marginLeft.uuid"
            @marginMouseOver="onMarginMouseOver" 
            @marginMouseOut="onMarginMouseOut"
            @marginMouseDown="onMarginMouseDown(marginLeft, $event)"

            />

        <border-left 
            :value="borderLeft"
            :key="borderLeft.uuid"
            @borderMouseOver="onBorderMouseOver" 
            @borderMouseOut="onBorderMouseOut"
            @borderMouseDown="onBorderMouseDown(borderLeft, $event)"

            />

        <padding-left 
            :value="paddingLeft" 
            :key="paddingLeft.uuid"
            @paddingMouseOver="onPaddingMouseOver" 
            @paddingMouseOut="onPaddingMouseOut"
            @paddingMouseDown="onPaddingMouseDown(paddingLeft, $event)"
        />

        <margin-top 
            :value="marginTop"
            :key="marginTop.uuid"
            @marginMouseOver="onMarginMouseOver" 
            @marginMouseOut="onMarginMouseOut"
            @marginMouseDown="onMarginMouseDown(marginTop, $event)"

            />

        <border-top 
            :value="borderTop" 
            :key="borderTop.uuid"
            @borderMouseOver="onBorderMouseOver" 
            @borderMouseOut="onBorderMouseOut"
            @borderMouseDown="onBorderMouseDown(borderTop, $event)"

            /> 

            <padding-top 
                :value="paddingTop" 
                :key="paddingTop.uuid"
                @paddingMouseOver="onPaddingMouseOver" 
                @paddingMouseOut="onPaddingMouseOut"
                @paddingMouseDown="onPaddingMouseDown(paddingTop, $event)"
            />

            <padding-bottom 
                :value="paddingBottom" 
                :key="paddingBottom.uuid"
                @paddingMouseOver="onPaddingMouseOver" 
                @paddingMouseOut="onPaddingMouseOut"
                @paddingMouseDown="onPaddingMouseDown(paddingBottom, $event)"
            />
            <border-bottom 
                :value="borderBottom" 
                :key="borderBottom.uuid"
                @borderMouseOver="onBorderMouseOver" 
                @borderMouseOut="onBorderMouseOut"
                @borderMouseDown="onBorderMouseDown(borderBottom, $event)"
                />

            <margin-bottom 
                :value="marginBottom"
                :key="marginBottom.uuid"
                @marginMouseOver="onMarginMouseOver" 
                @marginMouseOut="onMarginMouseOut"
                @marginMouseDown="onMarginMouseDown(marginBottom, $event)"

            />

            <padding-right 
                :value="paddingRight" 
                :key="paddingRight.uuid"
                @paddingMouseOver="onPaddingMouseOver" 
                @paddingMouseOut="onPaddingMouseOut"
                @paddingMouseDown="onPaddingMouseDown(paddingRight, $event)"
            />
            <border-right 
                :value="borderRight" 
                :key="borderRight.uuid"
                @borderMouseOver="onBorderMouseOver" 
                @borderMouseOut="onBorderMouseOut"
                @borderMouseDown="onBorderMouseDown(borderRight, $event)"
            />
            <margin-right 
                :value="marginRight"
                :key="marginRight.uuid"
                @marginMouseOver="onMarginMouseOver" 
                @marginMouseOut="onMarginMouseOut"
                @marginMouseDown="onMarginMouseDown(marginRight, $event)"
            />

            <span class="content-and-padding-and-border">
                        <html-el 
                            @contentMouseOver="onContentMouseOver" 
                            @contentMouseOut="onContentMouseOut" 
                            @contentMouseClick="onContentMouseClick(value, $event)" 
                            @contentMouseDown="onContentMouseDown(value, $event)"                 
                            @borderMouseOver="onBorderMouseOver" 
                            @borderMouseOut="onBorderMouseOut"
                            @borderMouseDown="onBorderMouseDown(value, $event)"                 
                            
                            :value="value" 
                            v-context-menu="value.uuid">
                            <!-- <div class="wrapper-children"> -->
                                <template v-for="child in children">
                                    <html-component 
                                        v-if="!child.isTextNode"
                                        @contentMouseOver="onContentMouseOver" 
                                        @contentMouseOut="onContentMouseOut" 
                                        @contentMouseClick="onContentMouseClickChild($event)" 
                                        @tagRemove="onEmitRemoveChild($event)" 
                                        @borderMouseOver="onBorderMouseOver" 
                                        @borderMouseOut="onBorderMouseOut" 
                                        @paddingMouseOver="onPaddingMouseOver" 
                                        @paddingMouseOut="onPaddingMouseOut" 
                                        @marginMouseOver="onMarginMouseOver" 
                                        @marginMouseOut="onMarginMouseOut" 
                                        @contentMouseDown="onContentMouseDownChild($event)" 
                                        @borderMouseDown="onBorderMouseDownChild($event)" 
                                        @paddingMouseDown="onPaddingMouseDownChild($event)" 
                                        @marginMouseDown="onMarginMouseDownChild($event)" 
                                        
                                        :value="child" 
                                        :key="child.uuid"  > 
                                    </html-component>
                                    <html-text-node 
                                        v-else 
                                        @tagRemove="onEmitRemove(child, $event)"
                                        :value="child" 
                                        :key="child.uuid"
                                        >
                                    </html-text-node>
                                </template>
                            <!-- </div>  -->
                        </html-el>
                    </span>
    </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HTMLELEditable from './HTMLELEditable.vue';
import BorderModelFactory from '~/src/Layout/Border/BorderModelFactory';
import BorderModel from '~/src/Layout/Border/BorderModel';
import LayoutEl from "../../../src/LayoutEl";
import PaddingModelFactory from "~/src/Layout/Padding/PaddingModelFactory";
import PaddingBottom from '../../../src/Layout/Padding/PaddingBottom';
import PaddingModel from "~/src/Layout/Padding/PaddingModel";
import MarginModel from "~/src/Layout/Margin/MarginModel";
import MarginModelFactory from '../../../src/Layout/Margin/MarginModelFactory';
import HtmlTagRecalculator from "~/src/Recalculator/HtmlTagRecalculator";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";


@Component
export default class HTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag

    protected borderRecalculator: HtmlTagRecalculator
    protected marginRecalculator: HtmlTagRecalculator

    contextMenuName = 'cm-create-html-element123'

    onContentMouseOver(val)
    {
        this.$emit('anyElementMouseOver', val)  
        this.$emit('contentMouseOver', val)  

    }

    onContentMouseOut(val)
    {
        this.$emit('anyElementMouseOut', val)  
        this.$emit('contentMouseOut', val)  
    }
    
    onBorderMouseOver(val)
    {
        this.$emit('anyElementMouseOver', val) 
        this.$emit('borderMouseOver', val)  
    }

    onBorderMouseOut(val)
    {
        this.$emit('anyElementMouseOut', val)  
        this.$emit('borderMouseOut', val)  
    }
    
    onPaddingMouseOver(val)
    {
        this.$emit('anyElementMouseOver', val) 
        this.$emit('paddingMouseOver', val)  
    }

    onPaddingMouseOut(val)
    {
        this.$emit('anyElementMouseOut', val)  
        this.$emit('paddingMouseOut', val)  
    }
    
    onMarginMouseOver(val)
    {
        this.$emit('anyElementMouseOver', val) 
        this.$emit('marginMouseOver', val)  
    }

    onMarginMouseOut(val)
    {
        this.$emit('anyElementMouseOut', val)  
        this.$emit('marginMouseOut', val)  
    }


    onContentMouseDown(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('contentMouseDown', ev)
        this.$emit('anyElementMouseDown', ev) 
    }
    onContentMouseDownChild(val)
    {
        this.$emit('contentMouseDown', val)  
        this.$emit('anyElementMouseDown', val) 
    }
    
    onEmitRemoveChild(val)
    {
        this.$emit('tagRemove', val)  
    }
    
    onEmitRemove(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('tagRemove', ev)
    }
    onContentMouseClick(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('contentMouseClick', ev)
        this.$emit('anyElementMouseClick', ev) 
    }
    onContentMouseClickChild(val)
    {
        this.$emit('contentMouseClick', val)  
        this.$emit('anyElementMouseClick', val) 
    }
    
    onBorderMouseDown(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('borderMouseDown', ev)  
        this.$emit('anyElementMouseDown', ev) 

    }
    onBorderMouseDownChild(val)
    {
        this.$emit('borderMouseDown', val)  
        this.$emit('anyElementMouseDown', val) 

    }
    
    onPaddingMouseDown(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('paddingMouseDown', ev)  
        this.$emit('anyElementMouseDown', ev) 

    }
    onPaddingMouseDownChild(val)
    {
        this.$emit('paddingMouseDown', val)  
        this.$emit('anyElementMouseDown', val) 

    }

    onMarginMouseDown(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('marginMouseDown', ev)  
        this.$emit('anyElementMouseDown', ev) 

    }
    onMarginMouseDownChild(val)
    {
        this.$emit('marginMouseDown', val)  
        this.$emit('anyElementMouseDown', val) 

    }

    get children() : LayoutEl[]
    {
        return this.value.children
    }
    
    set children(arg: LayoutEl[])
    {
        this.value.children = arg
    }


    get paddingLeft() : PaddingModel
    {
        return this.value.paddingLeft
    }
    
    set paddingLeft(arg: PaddingModel)
    {
        this.value.paddingLeft = arg
    }

    get paddingRight() : PaddingModel
    {
        return this.value.paddingRight
    }
    
    set paddingRight(arg: PaddingModel)
    {
        this.value.paddingRight = arg
    }

    get paddingBottom() : PaddingModel
    {
        return this.value.paddingBottom
    }
    
    set paddingBottom(arg: PaddingModel)
    {
        this.value.paddingBottom = arg
    }

    get paddingTop() : PaddingModel
    {
        return this.value.paddingTop
    }
    
    set paddingTop(arg: PaddingModel)
    {
        this.value.paddingTop = arg
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

    get marginLeft() : MarginModel
    {
        return this.value.marginLeft
    }
    
    set marginLeft(arg: MarginModel)
    {
        this.value.marginLeft = arg
    }

    get marginRight() : MarginModel
    {
        return this.value.marginRight
    }
    
    set marginRight(arg: MarginModel)
    {
        this.value.marginRight = arg
    }

    get marginBottom() : MarginModel
    {
        return this.value.marginBottom
    }
    
    set marginBottom(arg: MarginModel)
    {
        this.value.marginBottom = arg
    }

    get marginTop() : MarginModel
    {
        return this.value.marginTop
    }
    
    set marginTop(arg: MarginModel)
    {
        this.value.marginTop = arg
    }
    
    created() {
        // console.log(this.value.uuid);

        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        
      
    }

    mounted()
    {
        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()
        // var htmlEl = window.document.getElementById(this.value.uuid)
        // this.value.htmlEl = htmlEl
        // return
        this.value.setHtmlEl(this.$el)
        // this.value.updateModelComponent()
        // this.value.updateModelComponent()


        console.log('11@@@@@@@@@@@@@11');
        
        if (this.value instanceof HtmlTag)  {
            this.value.recalculateRealComputedProperties()

        }
        
        this.borderRecalculator.recalculate(this.value)
        this.marginRecalculator.recalculate(this.value)

        // this.value.updateModelComponent()

    }
}
</script>

<style lang="scss">
    .none {
        display: none !important;
        width: 0px !important;
        height: 0px !important;
        overflow: hidden !important;
        visibility: hidden !important;
        opacity: 0 !important;
    }
    .content-and-padding-and-border {
        display: block;
        width: 100%;
        height: 100%;
    }
    .wrapper {
        display: flex;
        position: relative;
        // display: flex;
    }

    .remove {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        border-radius: 100%;
        background-color: aqua;
        z-index: 99999999;
        border: 2px solid #998866
    }
    .remove:hover {
        background-color: rgb(67, 184, 184);
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
