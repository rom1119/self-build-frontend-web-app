<template>
    <object id="layout-object" class="main-object">
        <html>
            <head>

            </head>
            <create-html-element-context-menu :value="htmlTags"  :ref="contextMenuName" />
            
            <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)" v-context-menu="contextMenuName" style="min-height: 100vh;">
                    
                    <template v-for="htmlTag in htmlTags">
                        <html-component
                         @anyElementMouseOver="onMouseOver"
                         @anyElementMouseOut="onMouseOut" 
                         @anyElementMouseDown="onMouseDown" 
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
import TwoDimensionalPositionDetector from '~/src/PositionDetector/TwoDimensionalPositionDetector';
import ActiveElController from '../../src/ActiveElController';
import SizeElController from '../../src/SizeElController';
import ContentElSizeController from '../../src/Controller/ContentElSizeController';
import BorderElSizeController from '../../src/Controller/BorderElSizeController';
import BorderModel from "../../src/Layout/Border/BorderModel";
import DefaultActiveElController from '../../src/Controller/DefaultActiveElController';
import PaddingElSizeController from '../../src/Controller/PaddingElSizeController.1';
import PaddingModel from "~/src/Layout/Padding/PaddingModel";
import MarginElSizeController from '../../src/Controller/MarginElSizeController';
import MarginModel from "~/src/Layout/Margin/MarginModel";

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    contentElSizeController: SizeElController = new ContentElSizeController()
    borderElSizeController: SizeElController = new BorderElSizeController()
    paddingElSizeController: SizeElController = new PaddingElSizeController()
    marginElSizeController: SizeElController = new MarginElSizeController()

    activeElController: ActiveElController = new DefaultActiveElController()

    onMouseOver(val) {
        // console.log('over');
        // console.log(val);
        // console.log('over');
        
        // console.log(val.innerText);
        // let controller = this.getElSizeController('mouseover', val)
 
        this.activeElController.updateActiveEl(val)

    }

    onMouseOut(val) {
        // console.log('out');
        // console.log(val);
        // console.log('out');
        this.activeElController.deactiveEl(val)
    }

    onMouseDown(source)
    {
        let controller = this.getElSizeController('mouseDown', source.target)
        // console.log('down');
        // console.log(source.target);
        // console.log(controller);
        // console.log('down');
        controller.mouseDownHandler(source)
    }

    onMouseUp(e)
    {        
        let controller = this.getElSizeController('mouseUp')
        
        if (controller) {
            controller.mouseUpHandler(e)
        }
    }

    onMouseMove(e)
    {
        let controller = this.getElSizeController('mouseover')
        if (controller) {
            controller.mouseMoveHandler(e)

        }

    }
    
    private getElSizeController(eventName, el?): SizeElController
    {
        if (this.contentElSizeController.hasActiveEl()) {
            return this.contentElSizeController
        } else if (this.borderElSizeController.hasActiveEl()) {
            return this.borderElSizeController
        } else if (this.paddingElSizeController.hasActiveEl()) {
            return this.paddingElSizeController
        } else if (this.marginElSizeController.hasActiveEl()) {
            return this.marginElSizeController
        }

        if (el == null) {
            return null
        }

        if (el instanceof BorderModel) {
            return this.borderElSizeController
        }
        
        if (el instanceof HtmlTag) {
            return this.contentElSizeController
        }
        
        if (el instanceof PaddingModel) {
            return this.paddingElSizeController
        }
        
        if (el instanceof MarginModel) {
            return this.marginElSizeController
        }

        if (el == null) {
            throw Error(`Unable to choose ActiveElController for event || ${eventName} ||`)
        }


    }
}
</script>
