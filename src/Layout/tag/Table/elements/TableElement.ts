import TableCell from '../TableCell';
import TableTr from '../TableTr';
import BasePropertyCss from '../../../../Css/BasePropertyCss';
import HtmlTagPropertyAccessor from "~/src/Css/PropertyAccessor/HtmlTagPropertyAccessor";
import {VueFixStyleListTransform} from "~/src/Vue/VueFixStyleListTransform";
import DefaultAttributesAccessor from "~/src/Attribute/impl/DefaultAttributesAccessor";
import RealPositionCalculator from "~/src/PositionCss/RealPositionCalculator";
import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import PaddingFilterCssInjector from "~/src/FilterCssInjector/PaddingFilterCssInjector";
import MarginFilterCssInjector from "~/src/FilterCssInjector/MarginFilterCssInjector";
import BorderFilterCssInjector from "~/src/FilterCssInjector/BorderFilterCssInjector";
import ContentFilterCssInjector from "~/src/FilterCssInjector/ContentFilterCssInjector";
import TableTag from "~/src/Layout/tag/Table/TableTag";
import LayoutEl from "~/src/LayoutEl";
import CssList from "~/src/Layout/CssList";
import SizeActivable from "~/src/SizeActivable";
import HtmlTag from "~/src/Layout/HtmlTag";
import ContentSizeCss from "~/src/Css/Size/ContentSizeCss";
import BaseBorderCss from "~/src/Css/Border/BaseBorderCss";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import BasePaddingCss from "~/src/Css/BoxModel/BasePaddingCss";
import HtmlNode from "~/src/Layout/HtmlNode";


export default abstract class TableElement extends HtmlTag implements CssList, SizeActivable{

    protected owner: TableTag
    protected ownerShortID: string = ''
    children: TableCell[]
    index

    hiddenChildren: TableCell[] = []

    constructor(owner: TableTag, index)
    {
        super()
        this.owner = owner
        this.index = index
        this.ownerShortID = owner.shortUUID

        // this.initCssAccessor()
    }

    addCellChild(cell: TableCell) {
        var k = this.findChildIndexByID(cell.uuid)
        
        if (k === -1) {
            this.children.push(cell)
            
        }
    }
    removeChildByRowIdx(rowIndex: any) {

        this.children.splice(rowIndex, 1)
    }
    
    removeChildById(id: string) {
        var k = this.findChildIndexByID(id)

        if (k > -1) {
            this.children.splice(k, 1)

        }
    }

    hasChildByColIndex(colIdx: number) {
        var k = -1
        for (let i = 0; i < this.children.length; i++) {
            const el = this.children[i];
            if (el.colIndex === colIdx) {
                k = i
            }
        }

        return k > -1
    }
    
    replaceChildInRow(cellToMove: TableCell) {
        var k = this.findChildIndexByRowIndex(cellToMove.rowIndex)

        if (k > -1) {
            this.children.splice(k, 1)
        }

        this.children.push(cellToMove)

    }
    getChildByIDAndRemove(id: string): TableCell {
        var k = this.findChildIndexByID(id)

        if (k > -1) {
            var el = this.children[k]
            this.children.splice(k, 1)
            
            
            return el
        }

        return null
    }
    protected findChildIndexByID(id: string) : number {
        var k = -1
        for (let i = 0; i < this.children.length; i++) {
            const el = this.children[i];
            if (el.uuid === id) {
                k = i
                break
            }
        }

        return k
    }

    getCellByRowIndex(index: number): TableCell {
        var k = this.findChildIndexByRowIndex(index)

        if (k > -1) {
            return this.children[k]
        }

        return null
    }
    
    protected findChildIndexByRowIndex(index: number): number {
        var k = -1
        for (let i = 0; i < this.children.length; i++) {
            const el = this.children[i];
            if (el.rowIndex === index) {
                k = i
                break
            }
        }

        return k
    }
    
    get allChildren() {
        return this.children.concat(this.hiddenChildren)
    }
    public getOwner() {
        return this.owner
    }

    public abstract  removeFromTable()

    protected initCssAccessor()
    {
        // super.initCssAccessor()
        // this._tmpCssPropertyAccesor = new TableRowPropertyAccessor(this)
        // this._cssPropertyAccesor = new TableRowPropertyAccessor(this)

        this.paddingFilter = new PaddingFilterCssInjector(this)
        this.marginFilter = new MarginFilterCssInjector(this)
        this.borderFilter = new BorderFilterCssInjector(this)
        this.contentFilter = new ContentFilterCssInjector(this)

    }

    public addChild(child: TableCell)
    {
        this.children.push(child)

    }

    get selectedSelector()
    {
        return this.owner.selectedSelector
    }

    public synchronize()
    {
        this.owner.synchronize()

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.synchronize()

        }

        return true
    }

    //
    // get cssList() : any
    // {
    //
    //     return {}
    // }


    changeAsActiveSize() {
    }

    changeAsDeactiveSize() {
    }

    public setHtmlEl(htmlEl)
    {
        this._htmlEl = htmlEl

        this.notifyPositionalTag()
        // this.recalculateRealComputedProperties()

    }

}
