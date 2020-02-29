<template>
    <div class="wrapper" :style="value.cssBoxList"  :key="value.updateComponentKey" :id="value.uuid" >
        
        <div class="none">
            <!-- <span :style="value.cssBoxList"  ></span> -->
        </div>
        <!-- <context-menu
                shift="both"
                :ref="value.uuid">
            <div class="context-menu-container">
                    <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                    <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

            </div>
        </context-menu> -->
        <html-element-context-menu :value="children" :htmlTagModel="value"  :ref="value.uuid" />
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

        <span style="display: block;" >
            <span style="display: flex;" :style="value.cssContentBoxList" class="content-and-padding-and-border">
                <span style="display: flex; flex-direction: column;">
                    <span style="display: inline-flex;">     
                        <html-el 
                            @contentMouseOver="onContentMouseOver" 
                            @contentMouseOut="onContentMouseOut" 
                            @borderMouseOver="onBorderMouseOver" 
                            @borderMouseOut="onBorderMouseOut"
                            @contentMouseDown="onContentMouseDown(value, $event)"                 
                            @borderMouseDown="onBorderMouseDown(value, $event)"                 
                            
                            :value="value" 
                            v-context-menu="value.uuid">
                            <!-- <div class="wrapper-children"> -->
                                <!-- <template v-for="child in children"> -->
                                    <html-component 
                                    @contentMouseOver="onContentMouseOver" 
                                    @contentMouseOut="onContentMouseOut" 
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
                                    v-for="child in children" 
                                    :value="child" 
                                    :key="child.uuid"  > 
                                    </html-component>
                                <!-- </template>
                            </div> -->
                        </html-el>
                    </span>
                </span>
            </span>        
        </span>
    </div>
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


@Component
export default class HTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag

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
        // var htmlEl = window.document.getElementById(this.value.uuid)
        // this.value.htmlEl = htmlEl
        this.value.setHtmlEl(this.$el)
        this.value.recalculateRealComputedProperties()
        
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
    .wrapper {
        display: flex;
        position: relative;
        // display: flex;
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
