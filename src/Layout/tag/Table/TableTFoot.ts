import { BoxSizing, Height, Width, BackgroundColor, MinHeight, Display, FlexDirection, FlexGrow } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TableContainer from './TableContainer';
import TableTag from './TableTag';
export default class TableTFoot extends TableContainer {

    protected _innerText: string = `${this.uuid}  TableTFoot`
    public static TAG_NAME = 'tfoot'

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
        return TableTFoot.TAG_NAME
    }
    
    public injectInitialCssStyles()
    {

        let width = new Width(100, new Percent())
        let minHeight = new MinHeight(200, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 200, g:70, b: 70

        }, new RGB())
        let cssList = [ backgroundColor]

        this.addPropsToAccessor(cssList)
    }

    get cssList(): any {
        var css = super.cssList
        var width = new Width(100, new Percent())
        var flex = new Display(Display.FLEX, new Named())
        // var flexGrow = new FlexGrow(2, new Named())
        var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        css[flexDirection.getName()] = flexDirection.getValue()
        // css[flexGrow.getName()] = flexGrow.getValue()
        css[flex.getName()] = flex.getValue()
        css[width.getName()] = width.getValue()

        return css

    }

    get cssListOverride(): any {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssList

            var width = new Width(100, new Percent())
            var flex = new Display(Display.FLEX, new Named())
            // var flexGrow = new FlexGrow(2, new Named())
            var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            cssSelector[flexDirection.getName()] = flexDirection.getValue()
            // cssSelector[flexGrow.getName()] = flexGrow.getValue()
            cssSelector[flex.getName()] = flex.getValue()
            cssSelector[width.getName()] = width.getValue()
            return cssSelector
        }

        return {}

    }


    get cssBoxList(): any {
        var css = super.cssBoxList
        var width = new Width(100, new Percent())
        var flex = new Display(Display.FLEX, new Named())
        // var flexGrow = new FlexGrow(2, new Named())
        var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
        css[flexDirection.getName()] = flexDirection.getValue()
        // css[flexGrow.getName()] = flexGrow.getValue()
        css[flex.getName()] = flex.getValue()
        css[width.getName()] = width.getValue()

        return css

        // return css
    }

    get cssBoxListOverride(): any {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList
            var width = new Width(100, new Percent())
            var flex = new Display(Display.FLEX, new Named())
            // var flexGrow = new FlexGrow(2, new Named())
            var flexDirection = new FlexDirection(FlexDirection.COLUMN, new Named())
            cssSelector[flexDirection.getName()] = flexDirection.getValue()
            // cssSelector[flexGrow.getName()] = flexGrow.getValue()
            cssSelector[flex.getName()] = flex.getValue()
            cssSelector[width.getName()] = width.getValue()

            return cssSelector
        }

        return {}
    }
    

}