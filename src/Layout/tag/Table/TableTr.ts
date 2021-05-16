import { BoxSizing, Height, Width, BackgroundColor, MinHeight, MaxWidth, FlexGrow } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TableCell from './TableCell';
import Display from '../../../Css/Display/Display';
import TableContainer from './TableContainer';
import TableTag from './TableTag';
import TableTBody from './TableTBody';
import TableTFoot from './TableTFoot';
import TableTHead from './TableTHead';
import HtmlNode from "~/src/Layout/HtmlNode";
import HtmlTag from '../../HtmlTag';
import TableRowEl from './elements/TableRowEl';

export default class TableTr extends TableContainer {

    protected _innerText: string = `${this.uuid}  TableTr`
    protected _children: TableCell[] = []
    hiddenChildren: TableCell[] = []
    protected hasFlexGrow = true

    protected _rowElement: TableRowEl

    public static TAG_NAME = 'tr'

    protected _parent: TableContainer


    get rowElement(): TableRowEl {
        return this._rowElement
    }

    set rowElement(arg: TableRowEl) {
        var w = this.parent.cssAccessor.getProperty(Height.PROP_NAME)
        if (w) {
            arg.updateCssPropertyWithoutModel(w.getName(), w)

        }
        this._rowElement = arg
    }

    canAddThAsChild(): boolean {
        if (this.parent instanceof TableTHead) {
            return true
        }
        return false
    }

    get allChildren() {
        return this.children.concat(this.hiddenChildren)
    }

    public tryRemoveLastHiddenChild(child: TableCell)
    {
        if (this.hiddenChildren.length > 0) {
            this.hiddenChildren.splice(this.hiddenChildren.length - 1, 1)

        }
    }
    public appendHiddenChild(child: TableCell)
    {
        child.parent = this
        child.setApi(this.api)
        child.setProjectId(this.projectId)
        // child.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
        // child.injectInitialCssStyles()
        // child.injectInitialSelectors()

        this.notifyPositionalTag()
        this.hiddenChildren.push(child)

    }
    get parent(): TableContainer {
        return this._parent
    }

    set parent(arg: TableContainer) {
        this._parent = arg
    }

    public getTagName(): string {
        return 'div'
    }

    public isElementOfTable() {
        return true
    }

    public addChild(child: HtmlNode) {
        super.addChild(child)
        // console.log('add child')
        // console.log(child)
        this.getTable().updateTableStructure()

    }

    public updateStylesForHeight(child: TableCell) {
        if (this.parent instanceof TableTag) {
            this.getTable().updateHeightStylesRow(child.shortUUID)
        } else {
            if (this.parent instanceof TableTBody) {
                this.getTable().updateHeightStylesRowBody(child.shortUUID)
            } else if (this.parent instanceof TableTHead) {
                this.getTable().updateHeightStylesRowHead(child.shortUUID)

            } else if (this.parent instanceof TableTFoot) {
                this.getTable().updateHeightStylesRowFoot(child.shortUUID)

            }
        }
    }

    public setHeightRow(child: TableCell, h) {

        // this.updateStylesForHeight(child, h)
        this.getTable().setHeightSizeRow(child, h)
    }

    public getTable(): TableTag {
        if (this.parent instanceof TableTag) {
            return this.parent
        }

        return this.parent.getTable()
    }

    public getDomainTagName(): string {
        return TableTr.TAG_NAME
    }

    get children(): TableCell[] {
        return this._children
    }

    set children(arg: TableCell[]) {
        this._children = arg
    }


    public turnOnFlexGrow() {
        this.hasFlexGrow = true
    }

    public turnOffFlexGrow() {
        this.hasFlexGrow = false
    }

    public initHeight(h) {
        // this.toInitSizeUnits()
        // console.log(w);
        // console.log(h);

        this._height = h

        let height = new Height(this._height, this.heightUnitCurrent)
        this.updateCssPropertyWithoutModel(height.getName(), height)

        this.notifyPositionalTag()

    }


    public injectInitialCssStyles() {

        let width = new Width(100, new Percent())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({ r: 70, g: 70, b: 200 }, new RGB())
        let cssList = [width, boxSizing]

        this.addPropsToAccessor(cssList)
    }

    get cssList(): any {
        var css = super.cssList
        // var flex = new Display(Display.BLOCK, new Named())
        // css[flex.getName()] = flex.getValue()

        if (this.hasFlexGrow) {
            var flexGrow = new FlexGrow(1, new Named())
            css[flexGrow.getName()] = flexGrow.getValue()

        }

        return css

    }

    get cssListOverride(): any {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var css = activeSelector.cssList
            //
            var flex = new Display(Display.FLEX, new Named())
            css[flex.getName()] = flex.getValue()

            if (this.hasFlexGrow) {
                var flexGrow = new FlexGrow(1, new Named())
                css[flexGrow.getName()] = flexGrow.getValue()

            }

            return css
        }

        return {}

    }

    get cssBoxList(): any {
        var css = super.cssBoxList
        var flex = new Display(Display.BLOCK, new Named())
        css[flex.getName()] = flex.getValue()

        if (this.hasFlexGrow) {
            var flexGrow = new FlexGrow(1, new Named())
            css[flexGrow.getName()] = flexGrow.getValue()

        }

        return css

        // return css
    }

    get cssBoxListOverride(): any {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var css = activeSelector.cssBoxList

            var flex = new Display(Display.FLEX, new Named())
            css[flex.getName()] = flex.getValue()

            if (this.hasFlexGrow) {
                var flexGrow = new FlexGrow(1, new Named())
                css[flexGrow.getName()] = flexGrow.getValue()

            }

            return css
        }

        return {}
    }


}
