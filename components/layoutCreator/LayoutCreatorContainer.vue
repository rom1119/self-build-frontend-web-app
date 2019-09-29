<template>
    <object id="layout-object" class="main-object">
        <html>
            <head>

            </head>
            <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)" v-context-menu="contextMenuName" style="min-height: 100px;">
                    <context-menu
                        shift="both"
                        :ref="contextMenuName">
                        <div class="context-menu-container">
                                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                                <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

                        </div>
                    </context-menu>
                    <template v-for="htmlTag in htmlTags">
                        <html-component
                         @mousedown.native="onMouseDown(htmlTag, $event)" 
                         :value="htmlTag" 
                         :key="htmlTag.uuid">
                        </html-component>
                    </template>
            </body>
        </html>
    </object>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import HtmlTag from '../../src/Layout/HtmlTag';
import HtmlTagFactory from '../../src/Layout/HtmlTagFactory';
import MouseDetector from "~/src/Layout/MouseDetector";

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    currentElement: HtmlTag
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    mouseDetector: MouseDetector = new MouseDetector()
    timeout
    mouseDown
    
    createH1Element(target, cm, a) {
        console.log('asda'
        )

        var el = this.htmlFactory.createH1()

        this.htmlTags.push(el)

    }

    onMouseDown(el, event)
    {
        this.mouseDown = true
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    // console.log(e);
                    this.currentElement = el
                    this.mouseDetector.initPosition(event.clientX, event.clientY)
                    this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }
    
    

    onMouseUp(e)
    {
        console.log('qweqrewty');
        if (!this.currentElement) {
            return
        }
        this.mouseDown = false
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

        
    }

    onMouseMove(e)
    {
        if (!this.currentElement) {
            return
        }
        console.log(e.clientX);
        this.mouseDetector.x = e.clientX
        this.mouseDetector.y = e.clientY
        this.currentElement.onMouseMove(this.mouseDetector.XLengthMove, this.mouseDetector.XLengthMove)

        
    }

    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }
}
</script>
