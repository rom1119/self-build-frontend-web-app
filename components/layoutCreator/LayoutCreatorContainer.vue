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
import ActiveContentElController from '../../src/Controller/ActiveContentElController';
import ActiveBorderElController from '../../src/Controller/ActiveBorderElController';
import BorderModel from "../../src/Layout/Border/BorderModel";

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    activeElController: ActiveElController = new ActiveContentElController()
    activeBorderController: ActiveElController = new ActiveBorderElController()

    onMouseOver(val) {
        // console.log(val.innerText);
        let controller = this.getActiveElController('mouseover', val)
 
        controller.updateActiveEl(val)

    }

    onMouseOut(val) {
        // console.log(value);
        let controller = this.getActiveElController('mouseout', val)

        controller.deactiveEl(val)
    }

    onMouseDown(source)
    {
        let controller = this.getActiveElController('mouseDown', source.target)

        controller.mouseDownHandler(source)
    }

    onMouseUp(e)
    {        
        let controller = this.getActiveElController('mouseUp')
        if (controller) {
            controller.mouseUpHandler(e)
        }
    }

    onMouseMove(e)
    {
        let controller = this.getActiveElController('mouseover')
        if (controller) {
            controller.mouseMoveHandler(e)

        }

    }
    
    private getActiveElController(eventName, el?): ActiveElController
    {
        if (this.activeElController.hasActiveEl()) {
            return this.activeElController
        } else if (this.activeBorderController.hasActiveEl()) {
            return this.activeBorderController
        }

        if (el == null) {
            return null
        }

        if (el instanceof BorderModel) {
            return this.activeBorderController
        }
        
        if (el instanceof HtmlTag) {
            return this.activeElController
        }

        if (el == null) {
            throw Error(`Unable to choose ActiveElController for event || ${eventName} ||`)
        }


    }
}
</script>
