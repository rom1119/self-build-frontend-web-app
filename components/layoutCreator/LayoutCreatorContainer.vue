<template>
    <object id="layout-object" class="main-object" style="width: 100%;" >
        <html>
            <head>
                <template v-if="$layoutCreatorMode">
            
                    <style v-if="$layoutCreatorMode.mode.canRun(pseudoSelectorAction)" v-html="pseudoSelectorsTags">
                        
                    </style>
                        
                
                </template>
            </head>
            <create-html-element-context-menu :value="htmlTags"  :ref="contextMenuName" />
            
            <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)" v-context-menu="contextMenuName" style="min-height: 100vh; overflow-x: visible;">
                    <ul>
                        {{ pseudoSelectorsTags }}
                    </ul>

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
import Form from '../forms/Form';
import { css } from 'js-beautify';
import MouseDownAction from '../../src/Mode/action/MouseDownAction';
import PseudoSelectorViewAction from "../../src/Mode/action/PseudoSelectorViewAction";
import { Icon } from 'leaflet';
import MouseOverAction from '../../src/Mode/action/MouseOverAction';
import MouseUpAction from "~/src/Mode/action/MouseUpAction";
import MouseOutAction from '../../src/Mode/action/MouseOutAction';
import MouseMoveAction from '../../src/Mode/action/MouseMoveAction';
import KeyDownAction from "~/src/Mode/action/KeyDownAction";
import KeyUpAction from "~/src/Mode/action/KeyUpAction";
import MouseClickAction from "~/src/Mode/action/MouseClickAction";
import ViewMode from "~/src/Mode/impl/ViewMode";

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    a = `<template v-for="selectors in pseudoSelectorsTags">
                        
            <template v-for="(key, cssList) in selectors">
                {{ key }} {
                    <template v-for="css in cssList">
                            {{ css.getName() }}: {{ css.getValue() }};                                     -->
                    </template>
                }
            </template> 
        </template> `

    activeElController: ActiveElController = new DefaultActiveElController()
    activeToManageController: ActiveToController<ActivableTagToManage> = new DefaultActiveToManageController()
    activeToPositionController: ActiveToController<ActivableTagToPosition> = new DefaultActiveToPositionController()

    adivisorController: AdvisorTagController = new AdvisorTagController()
    htmlTagRemover: Remover<string>
    hasAccualControllerWorks = false
    currentMouseOverTag: HtmlTag

    mode 
    pseudoSelectorAction = new PseudoSelectorViewAction() 

    public addHtmlTag(tag: HtmlTag)
    {
        this.htmlTags.push(tag)
    }

    private recursiveClearSelectedSelector(list) {
        
        for (const el of list) {
            if (el instanceof HtmlTag) {
                el.clearSelectedSelectors()
                el.onChangeSelector()

                this.recursiveClearSelectedSelector(el.children)
            }
        }

    }

    private recursiveBuildPseudoSelectors(list, tag: HtmlTag) {
        
        for (const el of tag.children) {
            if (el instanceof HtmlTag) {
                list.push(el.pseudoSelectorsList)
                this.recursiveBuildPseudoSelectors(list, el)
            }
        }

        return list
    }


    get pseudoSelectorsTags(): string
    {   
        let list = []
        for (const tag of this.htmlTags) {
            console.log(tag.pseudoSelectorsList);
            list.push(tag.pseudoSelectorsList)
            this.recursiveBuildPseudoSelectors(list, tag)
        }

        var res = ''
        for (const selectors of list) {
            for (const key in selectors) {
            var cssList = selectors[key]
                res += key + ' {'
                    for (const css of cssList) {

                        res += css.getName() + ':' + css.getValue() + ' !important ;'                                   
                    }
                res += '}'
            }
        }
        

        return res
        
    }

    mounted()
    {
        this.htmlTagRemover = new HtmlTagRemover(this.htmlTags)
        document.body.addEventListener('mousemove', (e) => {
        // @ts-ignore
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

        this.$layoutCreatorMode.$on('change', (e) => {
            if (e instanceof ViewMode) {
                this.recursiveClearSelectedSelector(this.htmlTags)
            }
            
        })


    }

    get canRunPseudoSelector()
    {

        if (!this.mode) {
            return false
        }
        return this.mode.canRun(new PseudoSelectorViewAction())
    }

    onMouseOver(val) {
        if (!this.$layoutCreatorMode.mode.canRun(new MouseOverAction())) {
            return
        }
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
        if (!this.$layoutCreatorMode.mode.canRun(new MouseOutAction())) {
            return
        }
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
        if (!this.$layoutCreatorMode.mode.canRun(new MouseClickAction())) {
            return
        }
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
        if (!this.$layoutCreatorMode.mode.canRun(new MouseDownAction())) {
            return
        }
        
        let controller = this.getAdviseController('mouseDown', source.target)
        // console.log('down');
        // console.log(source.target);
        // console.log(controller);
        // console.log('down');
        controller.mouseDownHandler(source)
    }

    onMouseUp(e)
    {        
        if (!this.$layoutCreatorMode.mode.canRun(new MouseUpAction())) {
            return
        }
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
        if (!this.$layoutCreatorMode.mode.canRun(new MouseMoveAction())) {
            return
        }
        let controller = this.getAdviseController('mouseover')
        if (controller) {
            controller.mouseMoveHandler(e)
            this.hasAccualControllerWorks = true
        }

    }

    onKeyDown(e){
        if (!this.$layoutCreatorMode.mode.canRun(new KeyDownAction())) {
            return
        }
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
        if (!this.$layoutCreatorMode.mode.canRun(new KeyUpAction())) {
            return
        }
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
