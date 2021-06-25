<template>
    <context-menu
    @click.stop=""
        shift="both"
        ref="wrapped-context-menu"
        @opened="cmIsOpened">
        <context-menu
            shift="both"
            :ref="createElementNameCM">


                <template v-if="isTableTag">
                    <context-menu-item  :action="appendRowElement">New Row</context-menu-item>
                    <context-menu-item  :action="appendColumnElement">New Column</context-menu-item>

                </template>
                <template v-else>
                    <context-menu-item :action="createDivElement">Create DIV</context-menu-item>
                    <context-menu-item :action="createH1Element">Create H1</context-menu-item>
                    <context-menu-item :action="createInputTextElement">Create Input Text</context-menu-item>
                    <context-menu-item :action="createButtonElement">Create Buttom</context-menu-item>
                    <context-menu-item :action="createImgElement">Create Image</context-menu-item>
                    <context-menu-item :action="createSvgElement">Create SVG</context-menu-item>
                    <context-menu-item :action="createExampleTable">Create Table (first example)</context-menu-item>
                    <context-menu-item v-if="isTableRowTag"  :action="appendCellElement">Add Cell</context-menu-item>



                </template>



        </context-menu>
        <!-- <create-html-element-context-menu :value="value"  :ref="createElementNameCM" /> -->

        <context-menu-item v-context-menu="createElementNameCM">New HTML Element</context-menu-item>
        <context-menu-item :action="createText">Add text</context-menu-item>

        <context-menu-item v-if="isImgTag" :action="showImageModal">Edit Image</context-menu-item>
        <context-menu-item v-if="isSvgTag" :action="showSvgModal">SVG</context-menu-item>

        <template v-if="isHtmlTag">
            <context-menu-item :action="showTextCssModal">Font</context-menu-item>
            <context-menu-item @click.stop="" :action="showBackgroundCssModal">Background</context-menu-item>
            <context-menu-item :action="showShadowCssModal">Shadow</context-menu-item>
            <context-menu-item :action="showBoxModelModal">BoxModel</context-menu-item>
            <context-menu-item :action="showDisplayModal">Display</context-menu-item>
            <context-menu-item :action="showAnimationModal">Animation</context-menu-item>
            <context-menu-item :action="showGradientModal">Gradient</context-menu-item>
            <context-menu-item :action="showHtmlAttrModal">Atrybuty</context-menu-item>
            <context-menu-item :action="showThreeDimensionalModal">3D</context-menu-item>
        </template>

    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import HtmlTagFactory from '~/src/Layout/HtmlTagFactory';
import HtmlTag from '../../src/Layout/HtmlTag';
import ApiService from '~/src/Api/ApiService';
import DefaultApiService from '~/src/Api/impl/DefaultApiService';
import TextNode from '~/src/Layout/TextNode';
import LayoutEl from '../../src/LayoutEl';
import TableComponentFactory from '~/src/Layout/TableComponentFactory';
import TableTag from '~/src/Layout/tag/Table/TableTag';
import BaseMediaQueryComponent from "~/components/BaseMediaQueryComponent";
import ImgTag from '~/src/Layout/tag/ImgTag';
import SvgManageModal from '../modal/SvgManageModal.vue';
import SvgTag from '~/src/Layout/tag/SvgTag';
import FontFaceModal from '../FontFaceModal';
import TableTr from '~/src/Layout/tag/Table/TableTr';
import TableTHead from '~/src/Layout/tag/Table/TableTHead';
import TableCell from '~/src/Layout/tag/Table/TableCell';

@Component
export default class HtmlElementContextMenu extends Vue {

    value: HtmlTag
    tags: HtmlTag[]

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    tableComponentFactory: TableComponentFactory

    createElementNameCM = 'create-html-element-cm-'
    api: ApiService
    isTableTag = false
    isHtmlTag = false
    isTableRowTag = false
    isImgTag = false
    isSvgTag = false

    mounted() {
        // console.log(this.value.uuid);
        this.createElementNameCM = this.createElementNameCM
        this.api = new DefaultApiService();
        this.tableComponentFactory = new TableComponentFactory(this.api);

     console.log('CM MOUNTED');

    }


    cmIsOpened(cm, aa) {
            // console.log("The context menu is opened!", cm);
            // console.log("The context menu is opened!", aa);
            this.$emit('opened', cm)
        }

    public initOpen(tag: HtmlTag, list: HtmlTag[]) {
        this.setValue(tag)
        this.setListTags(list)
        this.isTableTag = this.value instanceof TableTag
        this.isHtmlTag = this.value instanceof HtmlTag
        this.isImgTag = this.value instanceof ImgTag
        this.isSvgTag = this.value instanceof SvgTag
        this.isTableRowTag = this.value instanceof TableTr
        // console.log("initOpen");
        // console.log(this.isTableTag);
        // console.log(this.isHtmlTag);
        // console.log(this.value);

        setTimeout(() => {

            document.querySelector('.context-menu').addEventListener('click', (e) => {
                e.stopPropagation()
                return false

            })
            document.querySelector('.context-menu-overlay').addEventListener('click', (e) => {
                e.stopPropagation()
                return false

            })

            document.querySelector('.context-menu-wrapper').addEventListener('click', (e) => {
                e.stopPropagation()
                return false

            })

            var items = document.querySelectorAll('.context-menu-item')
            // console.log('initOpen')
            // console.log(items)
            for(var i = 0; i < items.length; i++) {
                var el = items[i]

                el.addEventListener('click', (e) => {
                    e.stopPropagation()
                    return false

                })
            }
        }, 20)

    }

    public setValue(val) {
        this.value = val
    }

    public setListTags(val) {
        this.tags = val
    }

    protected initTag(tag: HtmlTag){

        // tag.injectInitialCssStyles()
        // tag.injectInitialSelectors()
        tag.setProjectId(this.$route.params.id)
        tag.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)

    }

    appendCellElement(target, cm, a) {
        var el
        if (this.value.parent instanceof TableTHead) {
            el = this.tableComponentFactory.createTableTh()
        } else {
            el = this.tableComponentFactory.createTableTd()

        }
        this.initCreatedTag(el)

        this.$emit('createdTag', el)
    }

    appendRowElement(target, cm, a) {
        var el = this.tableComponentFactory.createExampleTr()
        var tab: TableTag = <TableTag>this.value
        el.parent = tab
        this.initTag(el)


        var td = this.tableComponentFactory.createExampleTd()
        td.parent = el
        this.initTag(td)
        tab.appendRowDeep(el, td)

        this.$emit('createdTag', el)
    }

    appendColumnElement(target, cm, a) {
        var el = this.tableComponentFactory.createExampleTd()
        var tab: TableTag = <TableTag>this.value
        el.projectId = tab.projectId

        // el.injectInitialCssStyles()
        // el.injectInitialSelectors()
        el.setProjectId(this.$route.params.id)
        tab.appendColumn(el)

        this.$emit('createdTag', el)
    }

    createH1Element(target, cm, a) {
        var el = this.htmlFactory.createH1()
        this.initCreatedTag(el)
    }

    createDivElement(target, cm, a) {

        var el = this.htmlFactory.createDiv()
        this.initCreatedTag(el)
    }

    createInputTextElement(target, cm, a) {
        var el = this.htmlFactory.createInputText()
        this.initCreatedTag(el)
    }

    createButtonElement(target, cm, a) {
        var el = this.htmlFactory.createButton()
        this.initCreatedTag(el)
    }

    createExampleTable(target, cm, a) {
        var el = this.htmlFactory.createNormalTable()
        this.initCreatedTag(el)
    }

    initCreatedTag(el: HtmlTag){
        if (this.value) {
            el.parent = this.value
            el.projectId = this.value.projectId

        }

        el.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
        el.injectInitialCssStyles()
        el.injectInitialSelectors()
        el.setProjectId(this.$route.params.id)

        if (this.value instanceof TableTr) {

            this.value.getTable().addCell(<TableCell>el, this.value)
            return
        }

        if (this.value) {
            this.value.appendChildDeep(el)

        } else {
            this.tags.push(el)
            this.api.appendTagToProject(el)
        }

        this.$emit('createdTag', el)
    }

    createSvgElement()
    {
        var el = this.htmlFactory.createSvg()
        this.initCreatedTag(el)
        this.$svgManageModal.show(el)

    }

    createImgElement()
    {
        var el = this.htmlFactory.createImage()
        this.initCreatedTag(el)
        this.$imgManageModal.show(el)

    }

    createText()
    {
        let text = this.htmlFactory.createText();
        text.parent = this.value
        text.projectId = this.value.projectId
        text.setProjectId(this.$route.params.id)

        this.value.appendChildDeep(text)
    }

    showSvgModal()
    {
        this.$svgManageModal.show(this.value)
    }
    
    showImageModal()
    {
        this.$imgManageModal.show(this.value)
    }

    showTextCssModal()
    {
        this.$textManageModal.show(this.value)
    }
    
    showThreeDimensionalModal()
    {
        this.$threeDimensionalManageModal.show(this.value)
    }
    
    showFontFaceModal()
    {
        this.$fontFaceManageModal.init(this.value.projectId)
        this.$fontFaceManageModal.show()
    }

    showBackgroundCssModal()
    {
        this.$backgroundManageModal.show(this.value)
    }

    showBorderCssModal()
    {
        this.$borderManageModal.show(this.value)
    }

    showShadowCssModal()
    {
        this.$shadowManageModal.show(this.value)
    }

    showHtmlAttrModal()
    {
        this.$htmlAttrManageModal.show(this.value)
    }

    showBoxModelModal()
    {
        this.$boxModelManageModal.show(this.value)
    }

    showDisplayModal()
    {
        this.$displayManageModal.show(this.value)
    }

    showAnimationModal()
    {
        this.$animationManageModal.show(this.value)
    }

    showGradientModal()
    {
        this.$gradientManageModal.show(this.value)
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

<style  scoped>
   * {
       text-shadow: none;
       font-size: 1em;
       font-weight: initial;
       font-stretch: initial;
       font-style: initial;
        line-height: initial;

   }
</style>
