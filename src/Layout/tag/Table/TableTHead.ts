import { BoxSizing, Height, Width, BackgroundColor, MinHeight, Display, MaxWidth, BorderGlobalCss } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TableContainer from './TableContainer';
import TableTag from './TableTag';
export default class TableTHead extends TableContainer {

    protected _innerText: string = `${this.uuid}  TableTHead`
    public static TAG_NAME = 'thead'

    protected _parent: TableContainer
    get parent(): TableContainer
    {
        return this._parent
    }
    
    set parent(arg: TableContainer)
    {
        this._parent = arg
    }

    public getTable(): TableTag {
        if (this.parent instanceof TableTag) {
            return this.parent
        }

        return this.parent.getTable()
    }

    public getTagName(): string {
        return 'div'
    }

    public getDomainTagName(): string {
        return TableTHead.TAG_NAME
    }


    
    public injectInitialCssStyles()
    {
        let border = new BorderGlobalCss('5', new Pixel())
        border.setType('dotted')
        border.setColor('blue', new Named())

        let width = new Width(100, new Percent())
        // let height = new Height(50, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 200, g:70, b: 70}, new RGB())
        let cssList = [ width,  boxSizing, backgroundColor, border]

        this.addPropsToAccessor(cssList)
    }
    

    get cssList() : any
    {
        var css = super.cssList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()

        return css

    }

    get cssListOverride() : any
    {
        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssList
            
            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()
            return cssSelector
        } 

        return {}

    }


    get cssBoxList() : any
    {
        var css = super.cssBoxList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()

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
            return cssSelector
        } 
        
        return {}
    }

}