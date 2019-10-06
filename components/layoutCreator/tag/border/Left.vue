<template>

    <div class="stretch stretch__flex">
        <context-menu
                shift="both"
                :ref="value.uuid">
            <div class="context-menu-container">
                    <context-menu-item :action="setSolid">Solids</context-menu-item>

                    <context-menu-item :action="setDotted">Dotted</context-menu-item>
                    <context-menu-item :action="setDashed">Dashed</context-menu-item>
                    <context-menu-item :action="setNone">None</context-menu-item>

            </div>
        </context-menu>
        <div class="stretch" :style="value.cssList" v-context-menu="value.uuid"  @click="value.onClick(value)" @mouseover="value.onMouseOver(value)" @mouseout="value.onMouseOut(value)">
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Left from '~/src/Site/Left';
import HtmlTag from "~/src/Layout/HtmlTag";
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderComponent from './Border.vue';


@Component
export default class BorderLeftComponent extends BorderComponent {


    @Prop()
    value: BorderLeft
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()


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
        // console.log(this.$children);
        // console.log(cm);
        // other actions...
    }
    onDoubleClick(e) 
    {
        this.value.onClick(e)
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

<style scoped lang="scss">
    .stretch {
        align-content: stretch;
        &.stretch__flex {
            display: flex;
        }
    }
</style>
