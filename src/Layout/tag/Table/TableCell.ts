import { BoxSizing, Height, Width, BackgroundColor, MinHeight, PaddingCss, FlexGrow, MaxHeight, BorderGlobalCss } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TextNode from '../../TextNode';
import Display from '../../../Css/Display/Display';
import VerticalAlign from '~/src/Css/Display/VerticalAlign';
import TableTag from './TableTag';
import TableTr from './TableTr';
import TableTHead from './TableTHead';
import TableTBody from './TableTBody';
import TableTFoot from './TableTFoot';
export default abstract class TableCell extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  TableTd`
    protected hasFlexGrow = true
    hasMiddleTag: boolean = true
    protected _parent: TableTr

    constructor(textArg?) {
        super()
        if (textArg) {
            var text = new TextNode()
            text.text = textArg
    
            this.appendChild(text)
            
        }

    }

    public turnOnFlexGrow() {
        this.hasFlexGrow = true
    }
    
    public turnOffFlexGrow() {
        this.hasFlexGrow = false
    }

    get parent(): TableTr
    {
        return this._parent
    }
    
    set parent(arg: TableTr)
    {
        this._parent = arg
    }

    public initSize(w, h) {
        
        this.parent.setHeightRow(this, h)
        
        this.getTable().setWidthColumn(this.shortUUID, w)
    }

    public getTable(): TableTag {
        return this.parent.getTable()
    }

    public initWidth(w)
    {
        this.toInitSizeUnits()  
        // console.log(w);
        // console.log(h);
        
        this._width = w

        let width = new Width(this._width, this.widthUnitCurrent)
        this.updateCssPropertyWithoutModel(width.getName(), width)

        this.notifyPositionalTag()

    }

    get middleTagCss() {
        var css = super.cssList
        var height = new Height(100, new Percent())
        var width = new Width(100, new Percent())
        var display = new Display(Display.TABLE, new Named())

        css[height.getName()] = height.getValue()
        css[width.getName()] = width.getValue()
        css[display.getName()] = display.getValue()

        return css
    }

    get cssList() : any
    {
        var css = super.cssList
        var minHeight = new MinHeight(100, new Percent())
        css[minHeight.getName()] = minHeight.getValue()
        
        var maxHeight = new MaxHeight(100, new Percent())
        css[maxHeight.getName()] = maxHeight.getValue()
        
        var display = new Display(Display.TABLE_CELL, new Named())
        css[display.getName()] = display.getValue()
        
        var vertical = new VerticalAlign(VerticalAlign.MIDDLE, new Named())
        css[vertical.getName()] = vertical.getValue()
        
        var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        css[borderBox.getName()] = borderBox.getValue()


        if (this.hasFlexGrow) {
            var flexGrow = new FlexGrow(1, new Named())
            css[flexGrow.getName()] = flexGrow.getValue()

        }

        return css

    }

    

    get cssListOverride() : any
    {
        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssList

            var minHeight = new MinHeight(100, new Percent())
            cssSelector[minHeight.getName()] = minHeight.getValue()
            
            var maxHeight = new MaxHeight(100, new Percent())
            cssSelector[maxHeight.getName()] = maxHeight.getValue()
            
            var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
            cssSelector[borderBox.getName()] = borderBox.getValue()

            var display = new Display(Display.TABLE_CELL, new Named())
            cssSelector[display.getName()] = display.getValue()

            var vertical = new VerticalAlign(VerticalAlign.MIDDLE, new Named())
            cssSelector[vertical.getName()] = vertical.getValue()
            
            if (this.hasFlexGrow) {
                var flexGrow = new FlexGrow(1, new Named())
                cssSelector[flexGrow.getName()] = flexGrow.getValue()
            }
            return cssSelector
        } 

        return {}

    }

    get cssBoxList() : any
    {
        var css = super.cssBoxList

        var minHeight = new MinHeight(100, new Percent())
        css[minHeight.getName()] = minHeight.getValue()
        
        var maxHeight = new MaxHeight(100, new Percent())
        css[maxHeight.getName()] = maxHeight.getValue()
        
        var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        css[borderBox.getName()] = borderBox.getValue()

        if (this.hasFlexGrow) {
            var flexGrow = new FlexGrow(1, new Named())
            css[flexGrow.getName()] = flexGrow.getValue()

        }

        return css
        
        // return css
    }

    get cssBoxListOverride() : any
    {

        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var minHeight = new MinHeight(100, new Percent())
            cssSelector[minHeight.getName()] = minHeight.getValue()
            
            var maxHeight = new MaxHeight(100, new Percent())
            cssSelector[maxHeight.getName()] = maxHeight.getValue()
            
            var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
            cssSelector[borderBox.getName()] = borderBox.getValue()

            if (this.hasFlexGrow) {
                var flexGrow = new FlexGrow(1, new Named())
                cssSelector[flexGrow.getName()] = flexGrow.getValue()
            }
            return cssSelector
        } 
        
        return {}
    }
    
    public injectInitialCssStyles()
    {
        let border = new BorderGlobalCss('5', new Pixel())
        border.setType('solid')
        border.setColor('green', new Named())
        
        let width = new Width(20, new Percent())
        let minHeight = new MinHeight(100, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 70, g:200, b: 200}, new RGB())
        let p = new PaddingCss(10, new Pixel())

        let cssList = [width, minHeight, boxSizing, backgroundColor, p, border]
        
        


        this.addPropsToAccessor(cssList)
    }
    

}