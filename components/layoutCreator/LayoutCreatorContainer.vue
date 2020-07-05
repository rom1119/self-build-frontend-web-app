<template>
    <object id="layout-object" class="main-object" style="width: 100%;" >
        <html>
            <head>

            </head>
            <create-html-element-context-menu :value="htmlTags"  :ref="contextMenuName" />
            
            <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)" v-context-menu="contextMenuName" style="min-height: 100vh; overflow-x: visible;">
                    
                    <template v-for="htmlTag in htmlTags">
                        <html-component
                         @tagRemove="onTagRemove"
                         @anyElementMouseOver="onMouseOver"
                         @anyElementMouseOut="onMouseOut" 
                         @anyElementMouseDown="onMouseDown" 
                         @contentMouseClick="onContentMouseClick" 
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
import ActiveElController from '../../src/ActiveElController';
import SizeElController from '../../src/SizeElController';
import ContentElSizeController from '../../src/Controller/ContentElSizeController';
import BorderElSizeController from '../../src/Controller/BorderElSizeController';
import BorderModel from "../../src/Layout/Border/BorderModel";
import DefaultActiveElController from '../../src/Controller/DefaultActiveElController';
import PaddingElSizeController from '../../src/Controller/PaddingElSizeController';
import PaddingModel from "~/src/Layout/Padding/PaddingModel";
import MarginElSizeController from '../../src/Controller/MarginElSizeController';
import MarginModel from "~/src/Layout/Margin/MarginModel";
import DefaultActiveToManageController from '../../src/Controller/DefaultActiveToManageController';
import ActiveToController from "~/src/ActiveToController";
import Remover from '../../src/Remover';
import HtmlTagRemover from '../../src/Remover/HtmlTagRemover';
import ApiService from "../../src/Api/ApiService";
import DefaultApiService from "~/src/Api/impl/DefaultApiService";
import LayoutEl from "../../src/LayoutEl";
import HtmlNode from "../../src/Layout/HtmlNode";
import ActivableTagToManage from "../../src/ActivableTagToManage";
import ActivableTagToPosition from "../../src/ActivableTagToPosition";
import DefaultActiveToPositionController from '../../src/Controller/DefaultActiveToPositionController';
import HtmlTagMoveEventController from '../../src/Controller/HtmlTagMoveEventController';
import MouseMoveTagEventSource from "~/src/Controller/MouseMoveTagEventSource";
import MoveEventController from "~/src/MoveEventController";
import AdvisorTagController from '../../src/Controller/AdvisorTagController';

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()


    activeElController: ActiveElController = new DefaultActiveElController()
    activeToManageController: ActiveToController<ActivableTagToManage> = new DefaultActiveToManageController()
    activeToPositionController: ActiveToController<ActivableTagToPosition> = new DefaultActiveToPositionController()

    adivisorController: AdvisorTagController = new AdvisorTagController()
    htmlTagRemover: Remover<string>
    hasAccualControllerWorks = false
    currentMouseOverTag: HtmlTag

    public addHtmlTag(tag: HtmlTag)
    {
        this.htmlTags.push(tag)

    }

    mounted()
    {
        this.htmlTagRemover = new HtmlTagRemover(this.htmlTags)
        // @ts-ignore
        document.body.addEventListener('mousemove', (e) => {
            if (parseInt(e.clientX) % 10 == 0) {
                // console.log(e.clientX);

            }
            
        })
        window.addEventListener('resize', (e) => {
            // console.log('width', (<Window>e.target).innerWidth);
            // console.log('height', e.target.innerHeight);
            for (const htmlTag of this.htmlTags) {
                htmlTag.recalculateRealComputedProperties()
            }
        })

        window.document.body.addEventListener('keydown', this.onKeyDown)
        window.document.body.addEventListener('keyup', this.onKeyUp)

    }

    onMouseOver(val) {
        // console.log('over');
        // console.log(val);
        // console.log(val);
        if (val instanceof PaddingModel || val instanceof BorderModel || val instanceof MarginModel) {
            this.currentMouseOverTag = val.getHtmlTag()
        } else if (val instanceof HtmlTag) {
            this.currentMouseOverTag = val
        }
        
        if(this.adivisorController.hasCtrlKey) {
            if (val instanceof PaddingModel || val instanceof BorderModel || val instanceof MarginModel) {
                
                this.activeToPositionController.updateActiveTag(val.getHtmlTag())
            } else if (val instanceof HtmlTag) {
                this.activeToPositionController.updateActiveTag(val)

            }

        } else {
            this.activeElController.updateActiveEl(val)

        }
        
    }

    onMouseOut(val) {
        // console.log('out');
        // console.log(val);
        // console.log('out');
        this.currentMouseOverTag = null
        if(this.adivisorController.hasCtrlKey) {
            if (val instanceof PaddingModel || val instanceof BorderModel || val instanceof MarginModel) {
                
                this.activeToPositionController.deactiveTag()
            } else if (val instanceof HtmlTag) {
                this.activeToPositionController.deactiveTag()

            }

        } else {
            this.activeElController.deactiveEl(val)
        }
    }

    onContentMouseClick(source)
    {
        // console.log('click');
        // console.log(source.target);
        if (!this.hasAccualControllerWorks) {
            this.activeToManageController.updateActiveTag(source.target)

        }
    }
    
    onTagRemove(source)
    {
        // console.log('tagRemove');
        // console.log(source);
        let tag: HtmlNode = source.target
        tag.api.deleteTag(tag).then(
            (res) => {
                
                tag.synchronize()
                let a = this.htmlTagRemover.removeBy(source.target.uuid)
            },
            () => {
                alert("Błąd serwera")
            },
        )
        // console.log(a);
    }

    onMouseDown(source)
    {
        // var el = source.target
        // if (el instanceof PaddingModel || el instanceof BorderModel || el instanceof MarginModel) {
            
        //     el = el.getHtmlTag()
        // } else if (el instanceof HtmlTag) {
        //     el = el.

        // }
        
        let controller = this.getAdviseController('mouseDown', source.target)
        // console.log('down');
        // console.log(source.target);
        // console.log(controller);
        // console.log('down');
        controller.mouseDownHandler(source)
    }

    onMouseUp(e)
    {        
        let controller = this.getAdviseController('mouseUp')
        
        if (controller) {
            setTimeout(() => {
                controller.mouseUpHandler(e)
                this.hasAccualControllerWorks = false

            }, 0)
        }
    }

    onMouseMove(e)
    {
        let controller = this.getAdviseController('mouseover')
        if (controller) {
            controller.mouseMoveHandler(e)
            this.hasAccualControllerWorks = true
        }

    }

    onKeyDown(e){
        console.log("e.shiftKey");
        console.log(e.shiftKey);
        if(e.shiftKey) {
            this.adivisorController.hasCtrlKey = true
            if (this.currentMouseOverTag) {
                this.activeToPositionController.updateActiveTag(this.currentMouseOverTag)
            }
        }
        
    }
    
    onKeyUp(e){
        console.log("e.ctrlKey");
        console.log(e.shiftKey);
        if(this.adivisorController.hasCtrlKey) {
            this.adivisorController.hasCtrlKey = false
            this.activeToPositionController.deactiveTag()

        }
    }
    
    private getAdviseController(eventName, el?)
    {
        return this.adivisorController.advise(eventName, el)

    }
}
</script>
