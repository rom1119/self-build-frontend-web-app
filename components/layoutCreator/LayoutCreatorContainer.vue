<template>
    <div v-context-menu="'layout-builder-cm'">
        <div class="media-query-controls">
            <media-query-component ref="mediaQueryComponent"  @selectMediaQuery="onSelectMediaQuery" @changeThisMedia="onSelectMediaQuery" />
        </div>
        <html-element-context-menu   @click.stop=""  @opened="cmIsOpened" ref="layout-builder-cm" />

        <object id="layout-object" class="main-object" :style="windowStyles" >
            <html>
                <head>
                    <template v-if="$layoutCreatorMode">

                        <style v-if="$layoutCreatorMode.mode.canRun(pseudoSelectorAction)" v-html="pseudoSelectorsTags">

                        </style>

                        <style v-if="$layoutCreatorMode.mode.canRun(pseudoSelectorAction)" v-html="mediaQueryElements">

                        </style>
                        
                        <style v-if="$layoutCreatorMode.mode.canRun(fontFaceAction)" v-html="fontFaceElements">

                        </style>

                    </template>
                </head>
                <!-- <create-html-element-context-menu :value="htmlTags"  :ref="contextMenuName" /> -->

                <body @mouseup="onMouseUp($event)"  @mousemove="onMouseMove($event)"  style="min-height: 100vh; overflow-x: visible;">
                        <!-- <ul>
                            {{ pseudoSelectorsTags }}
                        </ul> -->

                        <template v-for="htmlTag in htmlTags">
                            <component
                                :is="getComponentNameByTag(htmlTag)"
                                @tagRemove="onTagRemove"
                                @anyElementMouseOver="onMouseOver"
                                @anyElementMouseOut="onMouseOut"
                                @anyElementMouseDown="onMouseDown"
                                @contentMouseClick="onContentMouseClick"
                                @anyElementMouseClick="onAnyElementMouseClick"
                                :value="htmlTag"
                                :key="htmlTag.uuid">
                            </component>

                        </template>
                </body>
            </html>
        </object>
    </div>
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
import HtmlNodeRemover from '../../src/Remover/HtmlNodeRemover';
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
import TableElement from "~/src/Layout/tag/Table/elements/TableElement";
import TextNode from "~/src/Layout/TextNode";
import Height from "~/src/Css/Size/Height";
import RemoverAdvisor from "~/src/Remover/RemoverAdvisor";
import DefaultRemoverAdvisor from "~/src/Remover/advisor/DefaultRemoverAdvisor";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryComponent from "~/components/MediaQueryComponent.vue";
import MediaQueryForCssList from "~/src/MediaQuery/headSection/MediaQueryForCssList";
import FontFaceViewAction from "~/src/Mode/action/FontFaceViewAction";
import FontFaceAccessor from "~/src/Fonts/FontFaceAccessor";
import FontFaceModal from "../FontFaceModal";

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    public mediaQueryComponent: MediaQueryComponent

    $refs: {
        mediaQueryComponent: MediaQueryComponent
    }

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
    tagRemoverAdvisor: RemoverAdvisor
    hasAccualControllerWorks = false
    currentMouseOverTag: HtmlTag

    windowWidth = '100%'

    mode
    pseudoSelectorAction = new PseudoSelectorViewAction()
    fontFaceAction = new FontFaceViewAction()
    mediaQueryList: MediaQueryForCssList

    @Prop({required: true})
    fontFaceAccesor: FontFaceAccessor = null

    updateTagsOnChangeMediaQuery(list){
        for (const el of list) {
            if (el instanceof HtmlTag) {
                // el.clearSelectedSelectors()
                el.onChangeMediaQuery()

                this.updateTagsOnChangeMediaQuery(el.children)
            }
        }
    }

    created()
    {

    }
    mounted()
    {
        this.mediaQueryComponent = this.$refs['mediaQueryComponent']
        this.mediaQueryList = new MediaQueryForCssList()
        var api = new DefaultApiService()
        this.tagRemoverAdvisor = new DefaultRemoverAdvisor(this.htmlTags, api)
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

    get windowStyles()
    {
        return {
            width: this.windowWidth,
            overflow: 'hidden',
            borderRight: '2px solid black',
        }
    }

    public onSelectMediaQuery(media: BaseMediaQueryCss)
    {
        console.log('onSelectMediaQuery')
        // console.log(media)
        // console.log(media.values[0])
        this.updateTagsOnChangeMediaQuery(this.htmlTags)

        if (media) {
            if (media.values.length > 0) {
                var val = media.values[0]
                if (val.getFeatureValue()) {
                    this.windowWidth = val.getFeatureValue()
                    return
                }

            }
        }




        this.windowWidth = '100%';
    }

    public addHtmlTag(tag: HtmlTag)
    {
        this.htmlTags.push(tag)
    }
    cmIsOpened(cm) {
    // @ts-ignore
        this.$refs['layout-builder-cm'].initOpen(this.currentMouseOverTag, this.htmlTags)
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

    private recursiveBuildMediaQueries(list, tag: HtmlTag) {

        for (const el of tag.children) {
            if (el instanceof HtmlTag) {
                list.push(el.mediaQueryWithElements)
                this.recursiveBuildMediaQueries(list, el)
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

    // @Watch('fontFaceAccesor', {deep: true})
    // asd(a) {
    //     console.error('watch FontFaceAccessor')
    //     console.log(a)

    // }

    get fontFaceElements(): string
    {
        var res = ''
        var reas = this.fontFaceAccesor
        // console.log('onChangeFontFace')
        // console.log(FontFaceAccessor.getInstance())
        // console.log(this.fontFaceAccesor)

        if (!this.fontFaceAccesor) {
            return res

        }

        for (const fontFace of this.fontFaceAccesor.all) {
            res += '@font-face {'
            res += `font-family: "${fontFace.name}";`
            res += `src: `

            for (var i = 0; i < fontFace.src.length; i++) {
                var srcItem = fontFace.src[i]
                var url 
                if (srcItem.resource){
                    url = srcItem.resource
                } else {
                    url = srcItem.resourceUrl
                }
                res += `url("${url}")`

                if (srcItem.format) {
                    res += ` `
                    res += `format("${srcItem.format}")`
                }

                if (i === fontFace.src.length - 1) {
                    res += ` ;`
                } else {
                    res += ` ,`
                }
            }

            res += '}'
        }
        // console.log('END onChangeFontFace')
        // console.log(res)

        return res
    }

    get mediaQueryElements(): string
    {
        let list = []
        this.mediaQueryList.reset()
        for (const tag of this.htmlTags) {
            // console.log(tag.mediaQueryWithElements);
            list.push(tag.mediaQueryWithElements)
            this.recursiveBuildMediaQueries(list, tag)
        }

        var res = ''

        // for (const mediaItemKey of this.mediaQueryList.items) {
        //     var mediaItem = this.mediaQueryList.items
            for (const el of list) {

                for (const mediaTag of el) {
                    this.mediaQueryList.addMediaQueryTag(mediaTag)
                }
            }
        // }

        for (const mediaItemKey in this.mediaQueryList.items) {
            var mediaItem = this.mediaQueryList.items[mediaItemKey]
            res += mediaItem.mediaQuery.getValue() + ' {'

            for (const mediaTag of mediaItem.tags) {

                var cssList = mediaTag.cssList
                res += mediaTag.selector + ' {'
                for (const css of cssList) {

                    res += css.getName() + ':' + css.getValue() + ' !important ;'
                }
                res += '}'
            }

            res += '}'
        }

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
        } else if (val instanceof TableElement) {
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

    onAnyElementMouseClick(source)
    {
        if (!this.$layoutCreatorMode.mode.canRun(new MouseClickAction())) {
            return
        }
        var val = source.target
        // console.log('onAnyElementMouseClick');
        // console.log(source.target);
        // console.log(source.target.columns);
        // console.log(source.target.rows);
        if (!this.hasAccualControllerWorks) {
            if (val instanceof PaddingModel || val instanceof BorderModel || val instanceof MarginModel) {

                this.activeToManageController.updateActiveTag(val.getHtmlTag())
            } else {
                this.activeToManageController.updateActiveTag(val)

            }

        }
    }

    onContentMouseClick(source)
    {
        // if (!this.$layoutCreatorMode.mode.canRun(new MouseClickAction())) {
        //     return
        // }
        // console.log('onContentMouseClick');
        // console.log(source.target);
        // if (!this.hasAccualControllerWorks) {
        //     this.activeToManageController.updateActiveTag(source.target)
        //
        // }
    }

    onTagRemove(source)
    {
        // console.log('tagRemove');
        // console.log(source);
        let tag: HtmlNode = source.target

        this.tagRemoverAdvisor.advise(tag).remove(tag)
        // console.log(a);
    }

    isLeftButtonMouseClick(evt) {
        evt = evt || window.event;
        if ("buttons" in evt) {
            return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        return button == 1;
    }

    onMouseDown(source)
    {
        if (!this.isLeftButtonMouseClick(source.event)) {
            return;
        }
        var el = source.target
        // if (el instanceof PaddingModel || el instanceof BorderModel || el instanceof MarginModel) {

        //     el = el.getHtmlTag()
        // } else if (el instanceof HtmlTag) {
        //     el = el.

        // }
        if (!this.$layoutCreatorMode.mode.canRun(new MouseDownAction())) {
            return
        }
        if (el.getHtmlTag) {
            var a = el.getHtmlTag().getComputedVal(Height.PROP_NAME)
            console.log(a)

        }
        let controller = this.getAdviseController('mouseDown', source.target)
        // console.log('down');
        // console.log(source.target);
        // console.log(source);
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
        // console.log("e.shiftKey");
        // console.log(e.shiftKey);
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
