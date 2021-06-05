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
import HtmlTag from "~/src/Layout/HtmlTag";
import CssList from "~/src/Layout/CssList";
import RowspanItem from "~/src/Layout/tag/Table/RowspanItem";
import OpacityCss from '../../../Css/Display/OpacityCss';
import RGBA from '../../../Unit/Color/RGBA';

export default class RowspanContainer extends TableContainer implements CssList {

    protected _innerText: string = `${this.uuid}  RowspanContainer`
    protected _children: RowspanItem[] = []

    public static TAG_NAME = 'rowspan-container'

    protected _parent: TableContainer
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
        // this.getTable().updateTableStructure()

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
        return 'table-tr-container'
    }

    get children(): RowspanItem[] {
        return this._children
    }

    set children(arg: RowspanItem[]) {
        this._children = arg
    }


    public initHeight(h) {
        // this.toInitSizeUnits()
        // console.log(w);
        // console.log(h);

        this._height = h

        let height = new Height(this._height, this.heightUnitCurrent)
        // this.updateCssPropertyWithoutModel(height.getName(), height)

        this.notifyPositionalTag()

    }


    get cssList(): any {
        var css = super.cssList

        var width = new Width(100, new Percent())
        css[width.getName()] = width.getValue()
        
        var opacity = new BackgroundColor({r: 0,g: 0,b: 0,a: 0}, new RGBA())
        css[opacity.getName()] = opacity.getValue()
        // var flex = new Display(Display.BLOCK, new Named())
        // css[flex.getName()] = flex.getValue()

        // if (this.hasFlexGrow) {
        //     var flexGrow = new FlexGrow(1, new Named())
        //     css[flexGrow.getName()] = flexGrow.getValue()

        // }

        return css

    }

   


}
