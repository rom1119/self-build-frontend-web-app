<template>
    <object id="layout-object" class="main-object">
        <html>
            <head>

            </head>
            <html-element-context-menu @createdTag="onCreateNewChildren" :value="null"  :ref="contextMenuName" />

            <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)" v-context-menu="contextMenuName" style="min-height: 100vh;">
                    
                    <template v-for="htmlTag in htmlTags">
                        <html-component
                         @contentMouseOver="onMouseOver"
                         @contentMouseOut="onMouseOut" 
                         @contentMouseDown="onMouseDown" 
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
import ActiveElController from '../../src/ActiveElController';

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    currentElement: HtmlTag
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    mouseDetector: MouseDetector = new MouseDetector()
    activeElController: ActiveElController = new ActiveElController()
    timeout
    mouseDown

    onMouseOver(val) {
        // console.log(val.innerText);
        this.activeElController.updateActiveEl(val)
        // this.value.changeAsActiveSize()

    }

    onMouseOut(value) {
        // console.log(value);
        
        value.changeAsDeactiveSize()
    }

    onCreateNewChildren(el)
    {
        this.htmlTags.push(el)

    }

    onMouseDown(source)
    {
        this.mouseDown = true
        let el = source.target
        let event = source.event
        // console.log(el.innerText);
        
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    // console.log(e);
                    this.currentElement = el
                    let compStyles = window.getComputedStyle(el.htmlEl);
                    var comp = compStyles.getPropertyValue('width')
                    console.log('aa');
                    console.log('x', event.clientX);
                    console.log('y', event.clientY);
                    console.log('width', el.width);
                    console.log('height', el.height);
                    // console.log(event.target);
                    
                    this.mouseDetector.initPosition(event.clientX, event.clientY)
                    this.mouseDetector.initSize(el.width, el.height)
                    this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }
    
    

    onMouseUp(e)
    {
        // console.log('qweqrewty');
        this.mouseDown = false
        if (!this.currentElement) {
            return
        }
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

        
    }

    onMouseMove(e)
    {
        
        if (!this.currentElement) {
            return
        }
        console.log(this.currentElement.innerText);
        // console.log(e.clientX);
        this.mouseDetector.x = e.clientX
        this.mouseDetector.y = e.clientY
        this.currentElement.initSize(this.mouseDetector.computedWidth, this.mouseDetector.computedHeight)

        
    }
}
</script>
