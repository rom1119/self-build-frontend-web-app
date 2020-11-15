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
export default class TableTag extends TableContainer {
    
    protected _innerText: string = `${this.uuid}  TableTag`
    public static TAG_NAME = 'table'
    
    public getTagName(): string {
        return 'div'
    }
    public getTable(): TableTag {

        return this
    }
    public getDomainTagName(): string {
        return TableTag.TAG_NAME
    }

    public setWidthColumn(shortUUID: string, width) {

        var index = this.recursiveFindTableColumnIndex(shortUUID)
        
        super.setWidthColumn(index.toString(), width)
    }

    public getBodyTag() {
        for (const el of this.children) {
            if (el instanceof TableTBody) {
                return el
            }
        }

        return false
    }
    
    public hasTrChild() {
        for (const el of this.children) {
            if (el instanceof TableTr) {
                return true
            }
        }

        return false
    }

    async appendRowDeep(child: TableContainer)
    {
        var body = this.getBodyTag()
        if (body) {
            body.appendChildDeep(child)
            return
            // child.realPositionCalculator.updateNearPositionalTag()
        }
        child.parent = this
        child.projectId = this.projectId
        child.setApi(this.api)
        this.children.push(child)

        this.notifyPositionalTag()

        await this.api.appendChildDeep(child)
        this.synchronizer.synchronize()

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
                newCell = new TableTh()

            }
        } else {
            throw Error('Can not copy cell from ' + cell.getDomainTagName())
        }
        return newCell
    }
    
    async appendColumn(childNew: TableCell)
    {
        var body = this.getBodyTag()
        if (this.hasTrChild()) {
            for (const child of this.children) {
                var tr: TableTr = <TableTr>child

                var newCopy = this.copyCell(childNew, true)
                newCopy.parent = tr

                tr.appendChildDeep(newCopy)
            }
            return
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
    
                    tr.appendChildDeep(newCopy)
                }
            }
        }

    }

    

    protected recursiveFindTableRowIndex(shortUUID): number {
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

    public setHeightRowBody(shortUUID: string, height) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowBody', index);
        this.setHeightForColOnlyBody(this, index, height)
        
    }
    
    public setHeightRowHead(shortUUID: string, height) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowHead', index);
        this.setHeightForColOnlyHead(this, index, height)
        
    }
    public setHeightRowFoot(shortUUID: string, height) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRowFoot', index);
        this.setHeightForColOnlyFoot(this, index, height)
        
    }
    public setHeightRow(shortUUID: string, height) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        // console.log('setHeightRow', index);
        this.setHeightForCol(this, index, height)
        
    }

    protected setHeightForCol(parent, index, height) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    child.initHeight(height)
                    child.turnOffFlexGrow()
                } else {
                    child.turnOnFlexGrow()
                }
            } else if (child instanceof TableContainer ) {
                this.setHeightForColOnlyBody(child ,index, height)
            }

        }
    }
    
    protected setHeightForColOnlyBody(parent, index, height) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    child.initHeight(height)
                    child.turnOffFlexGrow()
                } else {
                    child.turnOnFlexGrow()
                }
            } else if (child instanceof TableTBody ) {
                this.setHeightForCol(child ,index, height)
            }

        }
    }
    
    protected setHeightForColOnlyHead(parent, index, height) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    child.initHeight(height)
                    // child.parent.initHeight(height)
                    child.turnOffFlexGrow()
                } else {
                    child.turnOnFlexGrow()
                }
            } else if (child instanceof TableTHead ) {
                this.setHeightForCol(child ,index, height)
            }

        }
    }
    
    protected setHeightForColOnlyFoot(parent, index, height) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    child.initHeight(height)
                    child.turnOffFlexGrow()
                } else {
                    child.turnOnFlexGrow()
                }
            } else if (child instanceof TableTFoot ) {
                this.setHeightForCol(child ,index, height)
            }

        }
    }
     
    public injectInitialCssStyles()
    {

        let width = new MaxWidth(500, new Pixel())
        let minHeight = new Height(300, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 100, g:100, b: 100

        }, new RGB())
        let cssList = [ width, minHeight, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }

    recalculateRealComputedProperties()
    {
        var cssAll = this.cssAccessor.all
        var borderSpacing
        var borderCollapse
        if (this.getCurrentCssAccessor()) {
            cssAll = this.getCurrentCssAccessor().all
        }
        for (const prop of cssAll) {
    
            if (prop instanceof Width || prop instanceof Height ) {

                this.contentFilter.injectCssProperty(prop)
                continue
            }
            
            if (prop instanceof BasePaddingCss) {

                let val = this.getComputedCssVal(prop)
                let clonedCss = _.cloneDeep(prop)
                clonedCss.setValue(parseInt(val).toString())
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
                let clonedCss = _.cloneDeep(prop)
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


    removePaddigsIfCollapse(prop: BorderCollapse) {
        if (this.isCollapsePropertyVal(prop)) {
            this.removeCssProperty(new PaddingCss(null, null))
            this.removeCssProperty(new PaddingLeftCss(null, null))
            this.removeCssProperty(new PaddingRightCss(null, null))
            this.removeCssProperty(new PaddingTopCss(null, null))
            this.removeCssProperty(new PaddingBottomCss(null, null))
        }
    }
    
    updateSeparate(prop?: BorderCollapse, spacing?: BorderSpacing) {
        
        if (this.isCollapsePropertyVal(prop)) {
            this.recalculateBorderSpacingX(new Pixel(), 0)
            this.recalculateBorderSpacingY(new Pixel(), 0)
        } else if (this.isSeparatePropertyVal(prop)) {
            if (spacing) {
                this.recalculateBorderSpacingX(spacing.xValUnit, spacing.xVal)
                this.recalculateBorderSpacingY(spacing.yValUnit, spacing.yVal)

            }
        }
    }

    protected setMarginAllRows( children , valUnit: UnitSize, val: number) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i]

            if (child instanceof TableTr) {
                var marginTop = new MarginTopCss(val, valUnit)
                marginTop.toSaveInApi = false
                child.updateCssPropertyWithoutModel(marginTop.getName(), marginTop)
                

            } else {
                this.setMarginAllRows(child.children, valUnit, val)
            }
        }
    }

    protected setMarginXAllCells(children, valUnit: UnitSize, val: number) {

        for (var i = 0; i < children.length; i++) {
            var child = children[i]

            if (child instanceof TableContainer) {
                this.setMarginXAllCells(child.children, valUnit, val)

            } else if (child instanceof TableCell) {
                var marginLeft = new MarginLeftCss(val, valUnit)
                marginLeft.toSaveInApi = false
                child.updateCssPropertyWithoutModel(marginLeft.getName(), marginLeft)

                var isLastColumn = i === children.length - 1
                if (isLastColumn) {
                    var marginRight = new MarginRightCss(val, valUnit)
                    marginRight.toSaveInApi = false
                    child.updateCssPropertyWithoutModel(marginRight.getName(), marginRight)
                }
            }
        }
    }

    recalculateBorderSpacingX(valUnit: UnitSize, val: number)
    {
        this.setMarginXAllCells(this.children, valUnit, val)
    }
    
    recalculateBorderSpacingY(valUnit: UnitSize, val: number)
    {
       
        this.setMarginAllRows(this.children, valUnit, val)
        var lastColumn = this.findLastRow()
        if (lastColumn) {
            var marginBottom = new MarginBottomCss(val, valUnit)
            marginBottom.toSaveInApi = false
            lastColumn.updateCssPropertyWithoutModel(marginBottom.getName(), marginBottom)
        }
    }
    
    get cssList() : any
    {
        var css = super.cssList

        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()
        
        var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        css[flexDirection.getName()] = flexDirection.getValue()
        
        var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
        css[flexWrap.getName()] = flexWrap.getValue()

        return css

    }

    get cssListOverride() : any
    {
        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssList
            
            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()

            var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            cssSelector[flexDirection.getName()] = flexDirection.getValue()
            
            var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
            cssSelector[flexWrap.getName()] = flexWrap.getValue()

            return cssSelector
        } 

        return {}

    }

    get cssBoxList() : any
    {
        var css = super.cssBoxList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()

        var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        css[flexDirection.getName()] = flexDirection.getValue()

        var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
        css[flexWrap.getName()] = flexWrap.getValue()
        return css
        
        // return css
    }

    get cssBoxListOverride() : any
    {

        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()

            var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            cssSelector[flexDirection.getName()] = flexDirection.getValue()

            var flexWrap = new FlexWrap(FlexWrap.WRAP, new Named())
            cssSelector[flexWrap.getName()] = flexWrap.getValue()

            return cssSelector
        } 
        
        return {}
    }

}