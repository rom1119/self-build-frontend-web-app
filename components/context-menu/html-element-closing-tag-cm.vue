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
                    <context-menu-item  :action="createTrElement">Dodaj Wiersz</context-menu-item>
                    <context-menu-item  :action="createTdElement">Dodaj Kolumnę</context-menu-item>



                </template>
                <template v-else>
                    <context-menu-item :action="createDivElement">Stwórz DIV</context-menu-item>
                    <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
                    <context-menu-item :action="createInputTextElement">Stwórz Input Tekstowy</context-menu-item>
                    <context-menu-item :action="createButtonElement">Stwórz Buttom</context-menu-item>
                    <context-menu-item :action="createExampleTable">Tabela (przykład)</context-menu-item>



                </template>



        </context-menu>
        <!-- <create-html-element-context-menu :value="value"  :ref="createElementNameCM" /> -->

        <context-menu-item v-context-menu="createElementNameCM">Nowy Element</context-menu-item>
        <context-menu-item :action="createText">Dodaj tekst</context-menu-item>


        <template v-if="isHtmlTag">
            <context-menu-item :action="showTextCssModal">Font</context-menu-item>
            <context-menu-item @click.stop="" :action="showBackgroundCssModal">Background</context-menu-item>
            <context-menu-item :action="showShadowCssModal">Shadow</context-menu-item>
            <context-menu-item :action="showBoxModelModal">BoxModel</context-menu-item>
            <context-menu-item :action="showDisplayModal">Display</context-menu-item>
            <context-menu-item :action="showAnimationModal">Animation</context-menu-item>
            <context-menu-item :action="showGradientModal">Gradient</context-menu-item>
            <context-menu-item :action="showHtmlAttrModal">Atrybuty</context-menu-item>
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
        console.log("initOpen");
        console.log(this.isTableTag);
        console.log(this.isHtmlTag);
        console.log(this.value);

        setTimeout(() => {

            document.querySelector('.context-menu').addEventListener('click', (e) => {
                e.stopPropagation()
                return false

            })

            document.querySelector('.context-menu-wrapper').addEventListener('click', (e) => {
                e.stopPropagation()
                return false

            })

            var items = document.querySelectorAll('.context-menu-item')
            console.log('initOpen')
            console.log(items)
            for(var i = 0; i < items.length; i++) {
                var el = items[i]

                el.addEventListener('click', (e) => {
                    e.stopPropagation()
                    return false

                })
            }
        }, 200)

    }

    public setValue(val) {
        this.value = val
    }

    public setListTags(val) {
        this.tags = val
    }

    createTrElement(target, cm, a) {
        var el = this.tableComponentFactory.createExampleTr()
        var tab: TableTag = <TableTag>this.value
        el.parent = tab
        el.projectId = tab.projectId

        el.injectInitialCssStyles()
        el.injectInitialSelectors()
        el.setProjectId(this.$route.params.id)
        tab.appendRowDeep(el)

        this.$emit('createdTag', el)
    }

    createTdElement(target, cm, a) {
        var el = this.tableComponentFactory.createExampleTd()
        var tab: TableTag = <TableTag>this.value
        el.projectId = tab.projectId

        el.injectInitialCssStyles()
        el.injectInitialSelectors()
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

    initCreatedTag(el){
        if (this.value) {
            el.parent = this.value
            el.projectId = this.value.projectId

        }

        el.injectInitialCssStyles()
        el.injectInitialSelectors()
        el.setProjectId(this.$route.params.id)

        if (this.value) {
            this.value.appendChildDeep(el)

        } else {
            this.tags.push(el)
            this.api.appendTagToProject(el)
        }

        this.$emit('createdTag', el)
    }



    createText()
    {
        let text = this.htmlFactory.createText();
        text.parent = this.value
        text.projectId = this.value.projectId
        text.setProjectId(this.$route.params.id)

        this.value.appendChildDeep(text)
    }

    showTextCssModal()
    {
        this.$textManageModal.show(this.value)
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
