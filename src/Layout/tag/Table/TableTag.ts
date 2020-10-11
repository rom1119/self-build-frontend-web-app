import { BoxSizing, Height, Width, BackgroundColor, MinHeight, Display, FlexWrap, MaxWidth } from '~/src/Css';
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

    

    

    protected recursiveFindTableRowIndex(shortUUID): number {
        var ii = 0
        for (const child of this.children) {
            if (child instanceof TableTr) {
                for (var cell of child.children) {
                    if (cell.shortUUID === shortUUID) {
                        console.log('child.shortUUID11 === shortUUID', shortUUID);
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
                            console.log('child.shortUUID22 === shortUUID', shortUUID);
                            return i
                        }
                    }
        
                }

            }
            
        }
        

    }

    public setHeightColumn(shortUUID: string, height) {
        var index = this.recursiveFindTableRowIndex(shortUUID)
        console.log('setHeightColumn', index);
        this.setHeightForCol(this, index, height)
        
    }

    protected setHeightForCol(parent, index, height) {
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i]
            

            if (child instanceof TableTr) {
                if (i === parseInt(index)) {
                    child.initHeight(height)
                }
            } else if (child instanceof TableContainer ) {
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