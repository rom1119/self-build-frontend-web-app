
<template>
    <component :is="tagName"
               :class="[positionClass, anotherClass]"
               class="css-box"
               @click.stop="onContentMouseClick(value, $event)"
               :style="[value.cssBoxList, value.cssBoxListMediaQuery, value.cssBoxListOverride, customStyles]"  
               :key="value.updateComponentKey" 
               :id="value.attrIdHtmlBox" >
        <!-- <html-element-closing-tag-context-menu v-if="value.isClosingTag" :value="value" :ref="value.uuid" />
        <html-element-short-closing-tag-context-menu v-else :value="value" :ref="value.uuid" /> -->
        <slot name="top-content" />

        <div :id="value.shortUUID + '-hidden-box'" class="hidden-box">

        </div>
        <div class="wrapper">
            <div class="none">
                {{ value.updateFlag }}
                            

                <!-- <span :style="value.cssBoxList"  ></span> -->
            </div>

            <div 
                @mouseover="onContentMouseOver(value)"
                @mouseout="onContentMouseOut(value)"
                class="animation-shadow" v-show="value.isReadyToAnimationCheck()" >
                <div class="tip-animation"  @click.stop="onCheckToAnimationElement(value, $event)">
                    Click to select TAG for Animation
                </div>
            </div>

            <div class="animation-selected" v-show="value.isActiveTagToAnimation()" >
                <div class="remove" >
                    Choose an animation frame to start manage
                </div>  
            </div>
            <div class="animation-selected" v-show="value.isReadyToStartAnimation()" >
                <div class="remove" >
                    You create animation on this element
                </div>  
            </div>

            <div class="light-shadow" v-show="value.isActiveTagToPosition()" >

            </div>

            <div class="remove" v-show="value.isActiveTagToManage()" @click.stop="onEmitRemove(value, $event)">
                X

            </div>

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
                @click.native.stop="onBorderMouseClick(borderTop, $event)"


            />
            <padding-top
                :value="paddingTop"
                :key="paddingTop.uuid"
                @paddingMouseOver="onPaddingMouseOver"
                @paddingMouseOut="onPaddingMouseOut"
                @paddingMouseDown="onPaddingMouseDown(paddingTop, $event)"
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
            <padding-bottom
                :value="paddingBottom"
                :key="paddingBottom.uuid"
                @paddingMouseOver="onPaddingMouseOver"
                @paddingMouseOut="onPaddingMouseOut"
                @paddingMouseDown="onPaddingMouseDown(paddingBottom, $event)"
            />

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


        </div>
        <html-el
            @contentMouseOver="onContentMouseOver"
            @contentMouseOut="onContentMouseOut"
            @contentMouseClick="onContentMouseClick(value, $event)"
            @contentMouseDown="onContentMouseDown(value, $event)"
            @borderMouseOver="onBorderMouseOver"
            @borderMouseOut="onBorderMouseOut"
            @borderMouseDown="onBorderMouseDown(value, $event)"

            :value="value"
        >
<slot name="middle-content" />
            <!-- <div class="wrapper-children"> -->
            <template v-for="child in children">
                <div :id="child.shortUUID + '-hidden-outsite-box'" :key="child.uuid + 'hidden-outsite-box'" class="hidden-box">

                </div>
                <component
                    :is="getComponentNameByTag(child)"
                    @contentMouseOver="onContentMouseOver"
                    @contentMouseOut="onContentMouseOut"
                    @contentMouseClick="onContentMouseClickChild($event)"
                    @borderMouseClick="onBorderMouseClickChild($event)"
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
                </component>
            </template>
            <!-- </div>  -->
        </html-el>
        <slot name="bottom-content" />
        <!--        <div class="resize-content" :style="resizeContentCss"  @mousedown.stop="onContentMouseDown(value, $event)">-->
        <!--                    {{ value.hasFlexGrow }}-->
        <!--        </div>-->
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
import { PositionCss, Width } from "../../../src/Css";
import TextNode from "~/src/Layout/TextNode";
import HtmlNode from "~/src/Layout/HtmlNode";
import BaseMediaQueryComponent from "~/components/BaseMediaQueryComponent";
import SvgTag from "~/src/Layout/tag/SvgTag";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import WidthProperty from "~/components/computedPropertyManagers/impl/ComputedProperty/Content/WidthProperty";


@Component
export default class BaseHTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag
    
    @Prop({required: false})
    propBoxClass: string

    protected borderRecalculator: HtmlTagRecalculator
    protected marginRecalculator: HtmlTagRecalculator

    contextMenuName = 'cm-create-html-element123'

    get customStyles() {
        var res: any = {}

        if (this.value.displayNone) {
            res.display = 'none !important'
        }
        
        if (this.value.visibilityHidden) {
            res.visibility = 'hidden !important'
            // res.background = 'darkred !important'
            // res.border = '10px dotted pink !important'
        }
        // console.log('%c get customStyles', 'font-size: 20px;');
        // console.log(this.value.widthBoxCalc);
        
        // if (this.value.widthBoxCalc) {
        //     res.width = this.value.widthBoxCalc + ' !important'
        // }
        
        

        return res
    }

    getComponentNameByTag(tag: HtmlNode) {

            // console.log(tag)
        // @ts-ignore
        if (tag.isTableTag) {
            // console.log('html-table-component')
            return 'html-table-component'
        // @ts-ignore
        } else if (tag.isTableCellTag) {
            // console.log('html-table-cell-component')
            return 'html-table-cell-component'

        // @ts-ignore
        } else if (!(tag instanceof TextNode)) {

            // console.log('html-component')
            return 'html-component'
        } else {
            // console.log('html-text-node')
            return 'html-text-node'

        }
    }

    get resizeContentCss(){
        var w = this.value.borderRight.width
        var unit = this.value.borderRight.widthUnit

        return {
            'right': 'calc(0px - 30px - ' + unit.getValue(w) + ')'
        }
    }

    get tagName(){
        if (this.value instanceof SvgTag) {
            return 'div'

        }
        if (this.value.isClosingTag) {
            return this.value.getTagName()
        }

        return 'div'
    }
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
    onBorderMouseClick(val, event)
    {
        let ev = {
            event: event,
            target: val
        }
        this.$emit('borderMouseClick', ev)
        this.$emit('anyElementMouseClick', ev)
    }
    onBorderMouseClickChild(val)
    {
        this.$emit('borderMouseClick', val)
        this.$emit('anyElementMouseClick', val)
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
        console.log(this)


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
        var children = this.value.children
        // @ts-ignore
        if (this.value.allChildren) {
            // @ts-ignore
            children = this.value.allChildren
        }
        
        // @ts-ignore
        if (this.value.childrenCells) {
            // @ts-ignore
            if (this.value.childrenCells.length) {
                // @ts-ignore
                children = this.value.childrenCells
            }
        }
        return children
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

    get anotherClass(): string {
        var res = ''
        if (this.propBoxClass) {
            res += this.propBoxClass
        }

        return res

        
    }
    get positionClass(): string {
        var currentPositionName = this.value.positionPropName
        switch(currentPositionName) {
            case PositionCss.ABSOLUTE:
                return 'absolute-important'
            case PositionCss.FIXED:
                return 'fixed-important'
            default:
                return 'relative-important'
        }
    }

    created() {
        // console.log(this.value.uuid);

        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)

        this.widthManager = new WidthProperty()
        this.widthManager.setHtmlEl(this.value)

    }

    widthManager: BaseComputedPropertyManager<Width> = null


    get hasWidth() {
        if (!this.widthManager) {
            return false
        }
        return  this.widthManager.getProperty().active
    }

    runWithTimeoutrRandNumber(fnCallback) {
        var rand = Math.floor(Math.random() * 3000)
        var that = this
        var timer = setInterval(() => {
            // console.log(this.value.uuid)
            // console.log(this.$el)
            // console.log('typeof $el', typeof this.$el)
            // console.log(typeof a)

            if (typeof this.$el == 'object') {
                fnCallback(that)

                clearInterval(timer)
            }
        }, rand)
    }

    public mounted()
    {
        this.value.setLayoutMode(this.$layoutCreatorMode)

        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()
        // var htmlEl = window.document.getElementById(this.value.uuid)
        // this.value.htmlEl = htmlEl
        // return
        // console.log('CREA - COMP - BASE')
        // console.log(BaseMediaQueryComponent.accessorStatic)
        // console.log(this.$layoutCreatorMode)
        // console.log(document.getElementById(this.value.shortUUID + '-hidden-outsite-box'))
        // console.log('CREA - COMP - BASE END')
        
        this.runWithTimeoutrRandNumber((that) => {

            that.value.setHtmlElHidden(document.getElementById(that.value.shortUUID + '-hidden-box'))
            that.value.setHtmlContentEl(document.getElementById(that.value.attrIdHtmlEl))
            that.value.setHtmlElOutsiteHidden(document.getElementById(that.value.shortUUID + '-hidden-outsite-box'))
            that.value.setHtmlEl(that.$el)
            // console.log(that.$el, 'EXISTS !!!!!!!!!')

            if (that.value instanceof HtmlTag)  {
                that.value.realPositionCalculator.reInitDefaultPosition()
                that.value.recalculateRealComputedProperties()
            }

            that.borderRecalculator.recalculate(that.value)
            that.marginRecalculator.recalculate(that.value)

            that.value.updateRealView()
            // console.log('BEFORE CREATOR MODE SET');
            // console.log('AFTER CREATOR MODE SET');
            that.widthManager.init()
        })

        // this.value.updateModelComponent()
        // this.value.updateModelComponent()


        // console.log('11@@@@@@@@@@@@@11');

      

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

    .relative-important {
        position: relative !important;
    }
    .absolute-important {
        position: absolute !important;
    }

    .fixed-important {
        position: fixed !important;
    }

    .css-box {
        user-select: none;
    }
    
    .visible-hidden {
        visibility: hidden !important;
    }

    .wrapper {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        // display: flex;
    }

    .red-bg {
        background-color: red !important;
    }
    
    .green-shadow {
        box-shadow:inset 0 0 2px 3px rgb(43, 255, 0) !important;
    }

    .tip-animation {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        border-radius: 20px;
        background-color: rgb(229, 255, 0);
        z-index: 99999999;
        border: 2px solid #998866;
        text-shadow: none;
        color: black;
        font-size: 14px;
    }

    .animation-shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 3px 15px rgb(248, 72, 18) !important;
    }
    .light-shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 3px 15px greenyellow !important;
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
        border: 2px solid #998866;
        text-shadow: none;
        color: black;
        font-size: 14px;

    }
    .remove:hover {
        background-color: rgb(67, 184, 184);
    }

    .resize-content {
        z-index: 999;
        font-size: 10px;
        position: absolute;
        cursor: n-resize;
        bottom: 0;
        right: 0;
        display: block;
        width: 30px;
        background-color: rgb(24, 245, 53);

    }

    .wrapper-el-editable {
        flex-grow: 1;
        // float: left;
    }
    .hidden-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        visibility: hidden;
    }
    #loadingDialog {
        .v-dialog {
            width: auto;
        }
    }
</style>
