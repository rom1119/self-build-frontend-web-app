<template>

    <component v-if="value.isInput"
               v-model="text"
               :id="value.attrIdHtmlEl"
               class="wrapper-el"
               :is="value.getTagName()"
               :style="[value.cssList, value.cssListMediaQuery, value.cssListOverride, customStyles]"
               @click.stop="onClick($event)"
               @mousedown.stop="onMouseDown($event)"
               @mouseover.stop="onMouseOver($event)"
               @mouseout.stop="onMouseOut($event)"
    >
    <span v-show="false">
        <!-- {{ updattrs }} -->
    </span>
    </component>

    <div v-else-if="value.hasMiddleTag" :style="value.middleTagCss">
        <component :class="positionClass" class="wrapper-el" 
        :is="value.getTagName()" 
        :id="value.attrIdHtmlEl" 
        :style="[value.cssList, value.cssListOverride]"
         @click.stop="onClick($event)" @mousedown.stop="onMouseDown($event)" @mouseover.stop="onMouseOver($event)" @mouseout.stop="onMouseOut($event)">
            <span v-show="false">
                <!-- {{ updattrs }} -->
            </span>
            <slot>
            </slot>
        </component>
    </div>
     <component v-else-if="value.isSvg" 
                :class="positionClass"
               class="wrapper-el"
               v-html="filteredSvg"
               :is="value.getTagName()"
               :id="value.attrIdHtmlEl"
               :style="[value.cssList, value.cssListMediaQuery, value.cssListOverride]"
               @click.stop="onClick($event)"
               @mousedown.stop="onMouseDown($event)"
               @mouseover.stop="onMouseOver($event)"
               @mouseout.stop="onMouseOut($event)">
            <span v-show="false">
                <!-- {{ updattrs }} -->
            </span>
        <slot>
        </slot>
    </component>
    <component
            v-else :class="positionClass"
            class="wrapper-el"
            :is="value.getTagName()"
            :id="value.attrIdHtmlEl"
            :style="[value.cssList, value.cssListMediaQuery, value.cssListOverride, customStyles]"
            @click.stop="onClick($event)"
            @mousedown.stop="onMouseDown($event)"
            @mouseover.stop="onMouseOver($event)"
            @mouseout.stop="onMouseOut($event)">
            <span v-show="false">
                <!-- {{ updattrs }} -->
            </span>
        <slot>
        </slot>
    </component>

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from '~/src/Layout/HtmlTag';
import HTMLELEditable from "./HTMLELEditable.vue";
import { PositionCss } from "~/src/Css";


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

    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)

        // console.log(this.value.styleList)
    }

    get customStyles() {
        var res: any = {}

        // @ts-ignore
        if (this.value.gridTemplateColumns) {
            // @ts-ignore
            res.gridTemplateColumns = this.value.gridTemplateColumns + ' !important'
        }
        
        // @ts-ignore
        if (this.value.gridTemplateRows) {
            // @ts-ignore
            res.gridTemplateRows = this.value.gridTemplateRows + ' !important'
        }
        
        

        return res
    }

    get filteredSvg() {
        // console.log('filteredSvg');
        // console.log(this.value.isSvg);
        // @ts-ignore
        if (typeof this.value.isSvg) {
            // @ts-ignore
            var lines = this.value.svgContent.split('\n');
            // remove one line, starting at the first position
            lines.splice(lines.length - 1, 1);
            lines.splice(0,3);
            // join the array back into a single string
            var newtext = lines.join('\n');
    
            return newtext

        }
        return ''
    }

    get text()
    {
        return this.value.text
    }

    set text(arg)
    {
        this.value.text = arg
    }

    mounted() {
        var attrsArr = this.value.attributeAccessor.all
        // console.log(this.$el);

        for (const attr of attrsArr) {
            if (attr.key == 'value') {
                continue
            }
            var oldValAttr = this.$el.getAttribute(attr.key)
            if (oldValAttr) {
                this.$el.setAttribute(attr.key, oldValAttr + ' ' + attr.value)
            } else {
                this.$el.setAttribute(attr.key, attr.value)

            }

        }
        // console.log(this.$el);
    }

    get attrAccesor() {
                // console.log('    get attrAccesor() {', this.value._attributeAccesor.all.length);

        return this.value.attributeAccessor.all
    }

    get updattrs() {
        var el = this.value.getHtmlContentEl()
        // console.log('    get updattrs() {', el);

        if (!this.attrAccesor) {
            return
        }
        // if (!this.value.attributeAccessor) {
        //     return
        // }

        
        if (!el) {
            return
        }
        var attrsArr = this.attrAccesor
        // console.log(this.$el);

        for (const attr of attrsArr) {
            if (attr.key == 'value') {
                continue
            }
            // var oldValAttr = el.getAttribute(attr.key)
            // if (oldValAttr) {
            //     el.setAttribute(attr.key, oldValAttr + ' ' + attr.value)
            // } else {
                
            //     }
                el.setAttribute(attr.key, attr.value)

        }

        return this.attrAccesor.length

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

    onMouseDown(ev) {
        this.$emit('contentMouseDown', ev)
    }

    onClick(ev) {
        this.$emit('contentMouseClick', ev)
    }

    get positionClass(): string {
        var currentPositionName = this.value.positionPropName
        switch(currentPositionName) {
            case PositionCss.ABSOLUTE:
                return 'absolute-important'
            case PositionCss.FIXED:
                return 'absolute-important'
            default:
                return 'relative-important'
        }
    }

    onDoubleClick(e)
    {
        // this.value.onDoubleClick(e)
        // // console.log(this);
        // // console.log(this.$refs);
        // // console.log(this.$refs.editableEl);

        // this.$refs.editableEl.focus()


        // console.log(heightTable);


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
        // width: 100%;
        // height: 100%;
        background-color: transparent;
        position: relative;
        // top: 0;
        // left: 0;
        z-index: 9;
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

    .inner-text-el {
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
