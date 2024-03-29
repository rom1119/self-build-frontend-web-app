import { BoxSizing, Height, Width, BackgroundColor, MinHeight, Display, FlexWrap, MaxWidth, MarginLeftCss, MarginRightCss, MarginTopCss, PaddingBottomCss, PaddingCss, PaddingLeftCss, PaddingRightCss, PaddingTopCss } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import TableTBody from './TableTBody';
import TableTHead from './TableTHead';
import TableTFoot from './TableTFoot';
import TableCell from './TableCell';
import FlexDirection from '../../../Css/Display/FlexDirection';
import TableContainer from './TableContainer';
import TableTr from './TableTr';
import TableTh from './TableTh';
import TableTd from './TableTd';
import { html } from 'js-beautify';
import HtmlTag from '../../HtmlTag';
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss';
import BaseMarginCss from '~/src/Css/BoxModel/BaseMarginCss';
import BasePaddingCss from '~/src/Css/BoxModel/BasePaddingCss';
import _ from 'lodash';
import BorderSpacing from '../../../Css/Table/BorderSpacing';
import UnitSize from '../../../Unit/UnitSize';
import MarginBottomCss from '../../../Css/BoxModel/Margin/MarginBottomCss';
import BorderCollapse from '../../../Css/Table/BorderCollapse';
import ColspanAttr from '../../../Attribute/html/ColspanAttr';
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import TableEditor from "~/src/Layout/tag/Table/editor/TableEditor";
import ColspanEditor from "~/src/Layout/tag/Table/editor/impl/ColspanEditor";
import HtmlNode from "~/src/Layout/HtmlNode";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableElement from "~/src/Layout/tag/Table/elements/TableElement";
import { Vue } from "~/node_modules/vue-property-decorator";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import NotFullRowEditor from './editor/impl/NotFullRowEditor';
import TabelColumnsCalculator from '../../../Calculator/table/calculator/TabelColumnsCalculator';
import TabelRowsCalculator from '../../../Calculator/table/calculator/TabelRowsCalculator';
import RowspanEditor from './editor/impl/RowspanEditor';
import BusyCellPlaceByRowspan from './editor/BusyCellPlaceByRowspan';
import TextNode from '../../TextNode';
export default class TableTag extends TableContainer {

    protected _innerText: string = `${this.uuid}  TableTag`
    public static TAG_NAME = 'table'

    // children: TableContainer[]
    protected _children: TableContainer[] = []

    isTableTag: boolean = true

    heightIsInjectable = true
    borderCollapseChanging = false
    borderCollapse = false

    protected _columns: TableColumnEl[]
    protected _rows: TableRowEl[]

    protected colspanTableEditor: TableEditor
    protected notFullRowTableEditor: TableEditor
    public tableColumnCalculator: TabelColumnsCalculator
    public tableRowCalculator: TabelRowsCalculator
    public busyCellsByRowspan: BusyCellPlaceByRowspan

    constructor() {
        super()
        this._columns = []
        this._rows = []
        this.busyCellsByRowspan = new BusyCellPlaceByRowspan(this)
        this.colspanTableEditor = new ColspanEditor(this, this.busyCellsByRowspan)
        this.notFullRowTableEditor = new NotFullRowEditor(this.busyCellsByRowspan)
        this._toManage = true
        
        this.tableColumnCalculator = new TabelColumnsCalculator(this)
        this.tableRowCalculator = new TabelRowsCalculator(this)
    }

    public borderCollapseChange() {
        this.borderCollapseChanging = !this.borderCollapseChanging
    }

    public hasTrChild() {
        return this.children[0] instanceof TableTr
    }

    get childrenCells(): TableCell[]
    {
        if (!this.hasTrChild()) {
            var res = []
            var childrenLen = this.children.length
            for (var s = 0; s < childrenLen; s++) {
                var cont = this.children[s]
                // console.log('cont', cont)
                var childrenChildLen = cont.children.length
                for (var m = 0; m < childrenChildLen; m++) {

                    var tr: TableTr = <TableTr>cont.children[m]
                    // console.log('tr', tr)
                    if (!tr.allChildren) {
                        continue;
                    }
                    for (var i = 0; i < tr.allChildren.length; i++) {
                        var td = tr.allChildren[i]
                        res.push(td)

                    }

                }
            }
            return res
        }
        

        return super.childrenCells
    }
    
    get gridTemplateColumns()
    {
        // if (!this.hasTrChild()) {
        //     return null
        // }
        

        return super.gridTemplateColumns
    }
    
    get gridTemplateRows()
    {
        // if (!this.hasTrChild()) {
        //     return null
        // }
        

        return super.gridTemplateRows
    }

    get children(): TableContainer[]
    {
        return this._children
    }

    set children(arg: TableContainer[])
    {
        this._children = arg
    }

    get rows() {
        return this._rows
    }


    get columns() {
        return this._columns
    }

    set columns(arg) {
        this._columns = arg
    }

    public getTagName(): string {
        return 'div'
    }
    public getTable(): TableTag {

        return this
    }
    public getDomainTagName(): string {
        return TableTag.TAG_NAME
    }
    

    public calcContentHeight() {
        var height = 0
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.updateBoundingTop()
            child.updateBoundingBottom()
            var h = child.boundingClientRectBottomPixel - child.boundingClientRectTopPixel
            height += h
            // console.log('child height', h)
        }

        return height
    }

    public addCell(cell: TableCell, tr: TableTr) {
        var col = this.columns[tr.children.length]
        var width = col.width
        var widthUnit = col.getWithUnit()
        var row = tr.rowElement

        cell.rowElement = tr.rowElement
        cell.columnElement = col
        var height = row.height
        var heightUnit = row.getHeightUnit()

        var widthCss = new Width(width, widthUnit)
        var heightCss = new Height(height, heightUnit)

        // for (const css of row.children) {
            
        // }

        tr.appendChildDeep(cell)

        cell.updateCssPropertyWithoutModel(widthCss.getName(), widthCss)
        cell.updateCssPropertyWithoutModel(heightCss.getName(), heightCss)

        this.updateTableStructure()
        this.updateRealView()

    }
    public addChild(child: HtmlNode) {
        super.addChild(child)
        // console.log('add child')
        // console.log(child)
        // this.updateTableStructure()

    }

    public updateTableStructure() {

        // THIS IS PROCCESS , ORDER RUN IS IMPORTANT
        this.updateColumns()
        this.updateRows()
        this.busyCellsByRowspan.buildBusyMap()
        // console.log('updateTableStructure');
        // console.log('MAP', this.busyCellsByRowspan.map);
        this.notFullRowTableEditor.editTable(this)
        this.colspanTableEditor.editTable(this)
        this.notFullRowTableEditor.editTable(this)
        this.busyCellsByRowspan.moveCellsWhereRowspanPlace()
        // this.rowspanTableEditor.editTable(this)
        // this.tableColumnCalculator.calculate()
    }

    public updateRows() {

        // console.log('updateRows')
        var newRows = []
        if (this.hasTrChild()) {
            // console.log('hasTrChild')

            
            var childrenLen = this.children.length
            for (var m = 0; m < childrenLen; m++) {
                var tr: TableTr = <TableTr>this.children[m]

                var row = new TableRowEl(this, m)
                row.tr = tr
                tr.rowElement = row
                var globalColIndex = 0

                for (var i = 0; i < tr.children.length; i++) {
                    var td = tr.children[i]
                    td.colIndex = globalColIndex
                    td.rowElement = row
                    row.addChild(td)
                    globalColIndex++
                }

                newRows.push(row)
            }
        } else {
            // console.log('NO hasTrChild')

            var childrenLen = this.children.length
            for (var s = 0; s < childrenLen; s++) {
                var cont = this.children[s]
                // console.log('cont', cont)

                var childrenChildLen = cont.children.length
                for (var m = 0; m < childrenChildLen; m++) {

                    var tr: TableTr = <TableTr>cont.children[m]
                    // console.log('tr', tr)
                    var row = new TableRowEl(this, m)
                    row.tr = tr
                    tr.rowElement = row
                    var globalColIndex = 0

                    for (var i = 0; i < tr.children.length; i++) {
                        var td = tr.children[i]
                        td.colIndex = globalColIndex
                        td.rowElement = row
                        row.addChild(td)
                        globalColIndex++
                    }

                    newRows.push(row)
                }
            }
        }

        this._rows = []
        this._rows = newRows

    }

    public updateColumns() {
        // console.trace('updateColumns')
        var globalRowIndex = 0

        var newCols = []
        if (this.hasTrChild()) {
            var childrenLen = this.children.length
            for (var s = 0; s < childrenLen; s++) {
                var tr: TableTr = <TableTr>this.children[s]

                for (var i = 0; i < tr.children.length; i++) {
                    var td = tr.children[i]
                    var col: TableColumnEl
                    if (!newCols[i]) {
                        col = new TableColumnEl(this, i)
                        newCols.push(col)
                    } else {
                        col = newCols[i]
                    }
                    td.columnElement = col
                    td.rowIndex = globalRowIndex
                    col.addChild(td)

                }
                globalRowIndex++

            }
        } else {

            var childrenLen = this.children.length
            for (var s = 0; s < childrenLen; s++) {
                var cont = this.children[s]

                var childrenChildLen = cont.children.length
                for (var m = 0; m < childrenChildLen; m++) {

                    var tr: TableTr = <TableTr>cont.children[m]
                    for (var i = 0; i < tr.children.length; i++) {

                        var tda: TableCell = <TableCell>tr.children[i]
                        var cola: TableColumnEl
                        if (!newCols[i]) {
                            cola = new TableColumnEl(this, i)
                            newCols.push(cola)
                        } else {
                            cola = newCols[i]
                        }
                        tda.columnElement = cola
                        tda.rowIndex = globalRowIndex
                        cola.addChild(tda)

                    }
                    globalRowIndex++
                }
            }
        }

        // this._columns = []
        // this._columns = newCols
        Vue.set(this, 'columns', newCols)


        Vue.nextTick(() => {
            for (var el of this.columns) {
                // el.updateModelComponent()
                // el.recalculateRealComputedProperties()
            }
        })

    }

    public updateRealView() {
        for (const col of this.columns) {
            this.updateWidthStylesForColumn(col, col.width)

        }
    }



    public getComputedVal(propName: string) {
        if (!this.getHtmlEl()) {
            // console.log('EL NOT')
            return 0
        }

        var a = window.getComputedStyle(this.getHtmlEl())
        var val = a.getPropertyValue(propName)
        // console.log('EL aaaa', this.getHtmlEl())
        // console.log('EL a', a)
        // console.log('EL val', val)
        // console.log('EL val', parseInt(val))
        if (val) {
            return parseInt(val)
        }

        return 0
    }

    public changeAsActiveToManage() {
        // this.updateModelComponent()
        this._toManage = true

        for (var el of this.rows) {
            el.updateModelComponent()
        }
        for (var col of this.columns) {
            col.updateModelComponent()
        }
    }

    public setHeightSizeRow(child: TableCell, h) {

        // var index = this.recursiveFindTableRowIndexGlobal(child.shortUUID)

        this.rows[child.rowIndex].setHeightRow(h)
    }

    public setWidthColumn(child: TableCell, width: Width) {

        // var index = this.recursiveFindTableColumnIndex(shortUUID)

        // console.log(this._columns[index])
        child.columnElement.setWidthColumn(width)
    }

    public setCssForColumnColumn(child: TableCell, prop: BasePropertyCss) {

        // var index = this.recursiveFindTableColumnIndex(shortUUID)

        // super.setWidthColumn(index.toString(), width)
        // console.log(this._columns[index])
        this.columns[child.colIndex].updateCssPropertyWithoutModel(prop.getName(), prop)
    }

    public getBodyTag() {
        for (const el of this.children) {
            if (el instanceof TableTBody) {
                return el
            }
        }

        return false
    }

    

    async appendRowDeep(child: TableTr, td: TableCell) {
        var body = this.getBodyTag()
        try {
            if (body) {
                await body.appendChildDeep(child)
                // child.realPositionCalculator.updateNearPositionalTag()
            } else {
                await this.appendChildDeep(child)
            }
    
            var columnLength = this.columns.length
            for (var i = 0; i < columnLength; i++) {
    
                var newCopy = this.copyCell(td, true)
                newCopy.parent = child
                await child.appendChildDeep(newCopy)
            }

        } catch (e) {

        }

        this.updateTableStructure()
        this.updateRealView()

    }



    protected copyCell(cell: TableCell, td): TableCell {
        var newCell: TableCell
        if (!td) {
            var textNode = cell.getTextNode()
            if (textNode) {
                newCell = new TableTh(textNode.text)
            } else {
                newCell = new TableTh()

            }
        } else if (td) {
            var textNode = cell.getTextNode()
            if (textNode) {
                newCell = new TableTd(textNode.text)
            } else {
                newCell = new TableTd()

            }
        } else {
            throw Error('Can not copy cell from ' + cell.getDomainTagName())
        }
        return newCell
    }

    async appendColumn(childNew: TableCell) {
        var body = this.getBodyTag()
        if (this.hasTrChild()) {
            for (const child of this.children) {
                var tr: TableTr = <TableTr>child

                var newCopy = this.copyCell(childNew, true)
                newCopy.parent = tr
                await tr.appendChildDeep(newCopy)
            }
            // child.realPositionCalculator.updateNearPositionalTag()
        } else {

            for (const cont of this.children) {

                for (const child of cont.children) {
                    var tr: TableTr = <TableTr>child
                    var newCopy: TableCell
                    if (cont instanceof TableTHead) {
                        newCopy = this.copyCell(childNew, false)

                    } else {
                        newCopy = this.copyCell(childNew, true)
                    }
                    newCopy.parent = tr

                    await tr.appendChildDeep(newCopy)
                }
            }
        }

        this.updateTableStructure()
        this.updateRealView()
    }

    public recursiveFindTableRowIndex(shortUUID): number {
        var ii = 0
        for (const child of this.children) {
            if (child instanceof TableTr) {
                for (var cell of child.children) {
                    if (cell.shortUUID === shortUUID) {
                        // console.log('child.shortUUID11 === shortUUID', shortUUID);
                        return ii
                    }
                }
                ii++
            } else if (child instanceof TableTBody || child instanceof TableTHead || child instanceof TableTFoot) {
                for (var i = 0; i < child.children.length; i++) {
                    var tr = child.children[i]
                    var res
                    for (var celll of tr.children) {
                        if (celll.shortUUID === shortUUID) {
                            // console.log('child.shortUUID22 === shortUUID', shortUUID);
                            return i
                        }
                    }
                }
            }
        }
    }

    public recursiveFindTableRowIndexGlobal(shortUUID): number {
        var ii = 0
        for (const child of this.children) {
            if (child instanceof TableTr) {
                for (var cell of child.children) {
                    if (cell.shortUUID === shortUUID) {
                        // console.log('child.shortUUID11 === shortUUID', shortUUID);
                        return ii
                    }
                }
                ii++
            } else if (child instanceof TableTBody || child instanceof TableTHead || child instanceof TableTFoot) {
                for (var i = 0; i < child.children.length; i++) {
                    var tr = child.children[i]
                    var res
                    for (var celll of tr.children) {
                        if (celll.shortUUID === shortUUID) {
                            // console.log('child.shortUUID22 === shortUUID', shortUUID);
                            return ii
                        }
                    }
                    ii++
                }
            }
        }
    }

    protected findLastRow(): TableTr {
        var ii = 0
        var lastTr = null
        for (const child of this.children) {
            if (child instanceof TableTr) {
                return <TableTr>this.children[this.children.length - 1]

            } else if (child instanceof TableTBody || child instanceof TableTHead || child instanceof TableTFoot) {
                for (var i = 0; i < child.children.length; i++) {
                    var tr = child.children[i]

                }
                lastTr = <TableTr>child.children[child.children.length - 1]

            }

        }

        return lastTr

    }



    public updateHeightStylesRowBody(shortUUID: string) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowBody', index);
        var tableRealHeight = this.getComputedVal(Height.PROP_NAME)
        var tableRealWidth = this.getComputedVal(Width.PROP_NAME)
        // console.log(tableRealHeight);
        // console.log(tableRealWidth);

        this.updateHeightStylesForRowOnlyBody(this, index)

    }

    public updateHeightStylesRowHead(shortUUID: string) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowHead', index);
        this.updateHeightStylesForRowOnlyHead(this, index)

    }
    public updateHeightStylesRowFoot(shortUUID: string) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowFoot', index);
        this.updateHeightStylesForRowOnlyFoot(this, index)

    }
    public updateHeightStylesRow(shortUUID: string) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRow', index);
        // this.updateHeightStylesForRow(this, index)

    }

    protected updateHeightStylesForRow(parent, index) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]

            if (child instanceof TableTr) {
                if (parent.children.length == 1) {
                    // child.turnOffFlexGrow()
                    // parent.turnOffFlexGrow()
                    break
                }
                if (i === parseInt(index)) {
                    // child.initHeight(height)
                    // console.error(child)
                    // console.error(i)
                    // throw new Error('aaaaaa')

                    // child.turnOffFlexGrow()
                } else {
                    // child.turnOnFlexGrow()
                    // parent.turnOnFlexGrow()
                }
            } else if (child instanceof TableContainer) {
                this.updateHeightStylesForRowOnlyBody(child, index)
            }

        }
    }

    protected updateHeightStylesForRowOnlyBody(parent, index) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (parent.children.length == 1) {
                    // throw new Error('aaaaaa')
                    // child.turnOffFlexGrow()
                    // parent.turnOffFlexGrow()
                    break
                }
                if (i === parseInt(index)) {
                    console.error(child)

                    // child.initHeight(height)
                    // child.turnOffFlexGrow()
                } else {
                    // child.turnOnFlexGrow()
                    // parent.turnOnFlexGrow()
                }
            } else if (child instanceof TableTBody) {
                this.updateHeightStylesForRow(child, index)
            }

        }
    }

    protected updateHeightStylesForRowOnlyHead(parent, index) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (parent.children.length == 1) {
                    // child.turnOnFlexGrow()
                    break
                }
                if (i === parseInt(index)) {
                    // child.initHeight(height)
                    // child.parent.initHeight(height)
                    // child.turnOffFlexGrow()
                } else {
                    // child.turnOnFlexGrow()
                }
            } else if (child instanceof TableTHead) {
                this.updateHeightStylesForRow(child, index)
            }

        }
    }

    protected updateHeightStylesForRowOnlyFoot(parent, index) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    // child.initHeight(height)
                    // child.turnOffFlexGrow()
                } else {
                    // child.turnOnFlexGrow()
                }
            } else if (child instanceof TableTFoot) {
                this.updateHeightStylesForRow(child, index)
            }

        }
    }

    public injectInitialCssStyles() {

        let width = new MaxWidth(500, new Pixel())
        let minHeight = new Height(300, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({
            r: 100, g: 100, b: 100

        }, new RGB())
        let cssList = [width, minHeight, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }

    // recalculateRealComputedHtmlAttrs() {
    //     var list = this.attributeAccessor.all

    //     for (const prop of list) {

    //         if (prop instanceof ColspanAttr) {

    //             this.colspanTableEditor.editTable(this)
    //             continue
    //         }
    //     }

    // }

    recalculateRealComputedProperties() {
        var cssAll = this.cssAccessor.all
        var borderSpacing
        var borderCollapse
        if (this.currentCssAccessor) {
            cssAll = this.currentCssAccessor.all
        }
        for (var i = 0; i < cssAll.length; i++) {
            var prop = cssAll[i]
            if (prop instanceof Width || prop instanceof Height) {
                let val = this.getComputedCssValFromHidden(prop)
                let clonedCss = prop.deepCopy(prop)
                clonedCss.setValue(parseInt(val).toString())
                clonedCss.setUnit(new Pixel())
                // console.log(val);

                this.contentFilter.injectCssProperty(clonedCss)
                continue
            }

            if (prop instanceof BasePaddingCss) {

                let val = this.getComputedCssVal(prop)
                let clonedCss = prop.deepCopy(prop)
                clonedCss.setValue(val.toString())
                clonedCss.setUnit(new Pixel())
                this.paddingFilter.injectCssProperty(clonedCss)
                continue
            }

            if (prop instanceof BaseMarginCss) {
                this.marginFilter.injectCssProperty(prop)
                continue
            }

            if (prop instanceof BaseBorderCss) {
                // return
                let val = this.getComputedCssVal(prop)
                let clonedCss = prop.deepCopy(prop)
                // clonedCss.setValue(parseInt(val).toString())
                // console.log(val);
                clonedCss.setWidth(parseInt(val).toString(), new Pixel())

                if (prop instanceof BaseBorderCss) {


                    if (prop.getColorUnit()) {
                        clonedCss.setUnit(new Pixel())
                        clonedCss.setWidth(parseInt(val).toString(), new Pixel())
                        clonedCss.setType(prop.getType())
                        clonedCss.setColor(prop.getColor(), prop.getColorUnit())

                    } else {
                        clonedCss.setWidth(parseInt(val).toString(), new Pixel())

                        clonedCss.setValue(val)
                    }
                } else {
                    clonedCss.setValue(val)
                }

                this.borderFilter.injectCssProperty(clonedCss)
                continue
            }

            if (prop instanceof BorderCollapse) {
                borderCollapse = prop
            }

            if (prop instanceof BorderSpacing) {

                borderSpacing = prop
            }

        }

        this.updateSeparate(borderCollapse, borderSpacing)
        this.updateTogglePaddingOnBorderCollapse(borderCollapse)
    }

    isCollapsePropertyVal(prop?: BorderCollapse): boolean {
        if (!prop) {
            return false
        }
        return prop.getClearValue() === BorderCollapse.COLLAPSE
    }

    isSeparatePropertyVal(prop?: BorderCollapse): boolean {
        if (!prop) {
            return true
        }
        return [BorderCollapse.SEPARATE, BorderCollapse.INITIAL].includes(prop.getValue())
    }

    setAsInjectableCss(name: string, injectable: boolean) {
        var prop = this.cssAccessor.getProperty(name)
        if (prop) {
            prop.injectable = injectable
        }
    }
    updateTogglePaddingOnBorderCollapse(prop: BorderCollapse) {
        
        if (this.isCollapsePropertyVal(prop)) {
            this.setAsInjectableCss(PaddingCss.PROP_NAME, false)
            this.setAsInjectableCss(PaddingLeftCss.PROP_NAME, false)
            this.setAsInjectableCss(PaddingRightCss.PROP_NAME, false)
            this.setAsInjectableCss(PaddingTopCss.PROP_NAME, false)
            this.setAsInjectableCss(PaddingBottomCss.PROP_NAME, false) 
        } else {
            this.setAsInjectableCss(PaddingCss.PROP_NAME, true)
            this.setAsInjectableCss(PaddingLeftCss.PROP_NAME, true)
            this.setAsInjectableCss(PaddingRightCss.PROP_NAME, true)
            this.setAsInjectableCss(PaddingTopCss.PROP_NAME, true)
            this.setAsInjectableCss(PaddingBottomCss.PROP_NAME, true)
        }
    }

    updateSeparate(prop?: BorderCollapse, spacing?: BorderSpacing) {

        if (this.isCollapsePropertyVal(prop)) {
            this.borderCollapse = true
            
        } else {
            this.borderCollapse = false
        }
        if (this.isCollapsePropertyVal(prop) || !spacing) {            
            this.recalculateBorderSpacingX(null, false)
            this.recalculateBorderSpacingY(null, false)
        } else if (this.isSeparatePropertyVal(prop)) {
            if (spacing) {
                this.recalculateBorderSpacingX(spacing)
                this.recalculateBorderSpacingY(spacing)

            } else {
                this.recalculateBorderSpacingX(null, true)
                this.recalculateBorderSpacingY(null, true)
            }
        }
    }

    // protected setMarginAllRows(children, valUnit: UnitSize, val: number) {
    //     for (var i = 0; i < children.length; i++) {
    //         var child = children[i]

    //         if (child instanceof TableTr) {
    //             var marginTop = new MarginTopCss(val, valUnit)
    //             marginTop.toSaveInApi = false
    //             child.updateCssPropertyWithoutModel(marginTop.getName(), marginTop)


    //         } else {
    //             this.setMarginAllRows(child.children, valUnit, val)
    //         }
    //     }
    // }


    recalculateBorderSpacingX(spacing: BorderSpacing, isDefault?: boolean) {
        if (!this.hasTrChild()) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i]
                console.log('recalculateBorderSpacingX', child)
                if (child instanceof TextNode) {
                    continue
                }
                child.setBorderXSpacing(spacing, isDefault)
            }
            // return
        }

        this.setBorderXSpacing(spacing, isDefault)
    }

    recalculateBorderSpacingY(spacing: BorderSpacing, isDefault?: boolean) {
        if (!this.hasTrChild()) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i]
                if (child instanceof TextNode) {
                    continue
                }
                child.setBorderYSpacing(spacing, isDefault)
            }
            // return
        }

        this.setBorderYSpacing(spacing, isDefault)
        // this.setMarginAllRows(this.children, valUnit, val)
        // var lastColumn = this.findLastRow()
        // if (lastColumn) {
        //     var marginBottom = new MarginBottomCss(val, valUnit)
        //     marginBottom.toSaveInApi = false
        //     lastColumn.updateCssPropertyWithoutModel(marginBottom.getName(), marginBottom)
        // }
    }

    get cssList(): any {
        var css = super.cssList

        var display = new Display(Display.GRID, new Named())
        css[display.getName()] = display.getValue()
        // if (this.hasTrChild()) {

        // } else {

        //     var flex = new Display(Display.FLEX, new Named())
        //     css[flex.getName()] = flex.getValue()

        //     var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        //     css[flexDirection.getName()] = flexDirection.getValue()
        // }

        // var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
        // css[flexWrap.getName()] = flexWrap.getValue()

        return css

    }

    get cssListOverride(): any {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssList

            var display = new Display(Display.GRID, new Named())
            cssSelector[display.getName()] = display.getValue()
            // if (this.hasTrChild()) {

            // } else {

            //     var flex = new Display(Display.FLEX, new Named())
            //     cssSelector[flex.getName()] = flex.getValue()
    
            //     var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            //     cssSelector[flexDirection.getName()] = flexDirection.getValue()
            // }

            // var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
            // cssSelector[flexWrap.getName()] = flexWrap.getValue()

            return cssSelector
        }

        return {}

    }

    get cssBoxList(): any {
        var css = super.cssBoxList
        var flex = new Display(Display.INLINE_BLOCK, new Named())
        css[flex.getName()] = flex.getValue()

        // if (css[Height.PROP_NAME]) {
        //     css[MinHeight.PROP_NAME] = css[Height.PROP_NAME]
        // }

        if (!this.heightIsInjectable) {
            delete css[Height.PROP_NAME]
        }
        // var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        // css[flexDirection.getName()] = flexDirection.getValue()

        // var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
        // css[flexWrap.getName()] = flexWrap.getValue()
        return css

        // return css
    }

    get cssBoxListOverride(): any {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var flex = new Display(Display.INLINE_BLOCK, new Named())
            cssSelector[flex.getName()] = flex.getValue()

            if (!this.heightIsInjectable) {
                delete cssSelector[Height.PROP_NAME]
            }

            // var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            // cssSelector[flexDirection.getName()] = flexDirection.getValue()

            // var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
            // cssSelector[flexWrap.getName()] = flexWrap.getValue()

            return cssSelector
        }

        return {}
    }

}
