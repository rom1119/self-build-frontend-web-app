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
import BorderCollapse from '../../../Css/Table/BorderCollapse';
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import FlexShrink from "~/src/Css/Display/FlexShrink";
import FlexBasis from "~/src/Css/Display/FlexBasis";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import ColspanAttr from '../../../Attribute/html/ColspanAttr';
import RowspanAttr from '../../../Attribute/html/RowspanAttr';
export default abstract class TableCell extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  TableTd`
    protected hasFlexGrow = true
    hasSetMinMaxGridColumn = false
    hasMiddleTag: boolean = true
    isTableCellTag: boolean = true
    colIndex = null
    rowIndex = null
    containColumns: TableColumnEl[] = []

    protected _parent: TableTr
    protected _columnElement: TableColumnEl = null
    protected _rowElement: TableRowEl = null
    protected _colspanAttr: ColspanAttr = null
    protected _rowspanAttr: RowspanAttr = null

    protected _widthBoxCalc: string = ''
    protected _isOverflowContent: boolean = false


    constructor(textArg?) {
        super()
        if (textArg) {
            var text = new TextNode()
            text.text = textArg

            this.appendChild(text)

        }

    }

    get widthBoxCalc(): string {
        if (!this.columnElement) {
            return ''
        }
        // console.log('get widthBoxCalc');
        // console.log('this.containColumns', this.containColumns.length);
        
        // var columns = []
        // columns.push(this.columnElement)
        var calcStr = this.columnElement.getWidthValue()
        var res = 'calc(' + calcStr
        for (const containColumn of this.containColumns) {
            var w = containColumn.width
            // console.log('containColumn.getWidthValue()', containColumn.getWidthValue());
            res += ' + ' + containColumn.getWidthValue()
            console.log(res);
            
        }

        res += ')'

        return res
    }

    get colspanAttrVal(): number {
        if (!this.colspanAttr) {
            return 0
        }

        return Number(this.colspanAttr.value)
    }
    get isOverflowContent() {
        return this._isOverflowContent
    }
    
    set isOverflowContent(arg) {
        this._isOverflowContent = arg
    }

    public checkIsOverflow() {
        var el = this._htmlEl
        var curOverf = el.style.overflow;
          
        if ( !curOverf || curOverf === "visible" )
            el.style.overflow = "hidden";
          
        var isOverflowing = el.offsetWidth - 5 < el.scrollWidth 
            // || el.clientHeight < el.scrollHeight;
          
        el.style.overflow = curOverf;
        // console.log('checkIsOverflow');
        // console.log('el.offsetWidth', el.offsetWidth);
        // console.log('el.clientWidth', el.clientWidth);
        // console.log('el.scrollWidth', el.scrollWidth);
        // console.log(el.offsetWidth - 5 < el.scrollWidth );
        // console.log(isOverflowing);
        // console.log(this._htmlEl);
        
        this.isOverflowContent = isOverflowing
          
        return isOverflowing;
    }



    get colspanAttr() {
        
        // console.log('get colspanAttr');
        return this._colspanAttr
    }
    
    set colspanAttr(arg) {
        this._colspanAttr = arg
    }
    
    get rowspanAttr() {
        return this._rowspanAttr
    }
    
    set rowspanAttr(arg) {
        this._rowspanAttr = arg
    }

    get columnElement(): TableColumnEl {
        return this._columnElement
    }

    set columnElement(arg: TableColumnEl) {
        var w = this.cssAccessor.getProperty(Width.PROP_NAME)
        if (w) {
            arg.updateCssPropertyWithoutModel(w.getName(), w)

        }
        this._columnElement = arg
    }

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

    public isElementOfTable() {
        return true
    }
    public getTextNode() {
        for (const child of this.children) {
            if (child instanceof TextNode) {
                return child
            }
        }

        return null
    }

    public deepCopy(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    public turnOnFlexGrow() {
        this.hasFlexGrow = true
    }

    public turnOffFlexGrow() {
        this.hasFlexGrow = false
    }

    public turnOnMinMaxGridColumn() {
        this.hasSetMinMaxGridColumn = true
    }

    public turnOffMinMaxGridColumn() {
        this.hasSetMinMaxGridColumn = false
    }

    get parent(): TableTr {
        return this._parent
    }

    set parent(arg: TableTr) {
        this._parent = arg
    }

    public initSize(w, h) {

        this.parent.setHeightRow(this, h)

        this.setWidthColumn(w)

    }

    public getTable(): TableTag {
        return this.parent.getTable()
    }

    public setWidthColumn(w) {
        this.getTable().setWidthColumn(this, w)

    }

    public setColumnCss(prop: BasePropertyCss) {
        this.getTable().setCssForColumnColumn(this, prop)

    }

    public initWidth(w) {
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
        var borderCollapse = new BorderCollapse(BorderCollapse.COLLAPSE, new Named())

        css[height.getName()] = height.getValue()
        css[width.getName()] = width.getValue()
        css[display.getName()] = display.getValue()
        css[borderCollapse.getName()] = borderCollapse.getValue()

        return css
    }

    get cssList(): any {
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
            // var flexGrow = new FlexGrow(1, new Named())
            // css[flexGrow.getName()] = flexGrow.getValue()

        }

        return css

    }



    get cssListOverride(): any {
        var activeSelector = this.selectedSelector

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
                // var flexGrow = new FlexGrow(1, new Named())
                // cssSelector[flexGrow.getName()] = flexGrow.getValue()
            }
            return cssSelector
        }

        return {}

    }

    get cssBoxList(): any {
        var css = super.cssBoxList

        var minHeight = new MinHeight(100, new Percent())
        css[minHeight.getName()] = minHeight.getValue()

        var maxHeight = new MaxHeight(100, new Percent())
        css[maxHeight.getName()] = maxHeight.getValue()

        var height = new Height(100, new Percent())
        css[height.getName()] = height.getValue()


        var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        css[borderBox.getName()] = borderBox.getValue()

        var display = new Display(Display.INLINE_BLOCK, new Named())
        css[display.getName()] = display.getValue()


        // var flexBasis = new FlexBasis(10, new Percent())
        // css[flexBasis.getName()] = flexBasis.getValue()
        // console.log('cssBoxList', this.hasFlexGrow);
        
        if (this.hasFlexGrow) {
            if (this.colspanAttrVal > 1) {
                
                var flexGrow = new FlexGrow(6, new Named())
                css[flexGrow.getName()] = flexGrow.getValue()

                var flexShring = new FlexShrink(1.8, new Named())
                css[flexShring.getName()] = flexShring.getValue()
            } else {
                var flexGrow = new FlexGrow(2, new Named())
                css[flexGrow.getName()] = flexGrow.getValue()

                var flexShring = new FlexShrink(2, new Named())
                css[flexShring.getName()] = flexShring.getValue()

            }


        } else if (this.rowElement.allChildren.length === 1) {
            var flexGrow = new FlexGrow(2, new Named())
            css[flexGrow.getName()] = flexGrow.getValue()
        }

        if (this.colspanAttr) {
            var replacedCss = {}

            // replacedCss['left'] = 'calc(' + this.realPositionCalculator.realLeftCalc + ')'
            // replacedCss['top'] = 'calc(' + this.realPositionCalculator.realTopCalc + ')'
            // replacedCss['right'] = 'calc(' + this.realPositionCalculator.realRightCalc + ')'
            // replacedCss['bottom'] = 'calc(' + this.realPositionCalculator.realBottomCalc + ')'

            // if (css[Width.PROP_NAME]) {

            // }

        }

        return css

        // return css
    }

    get cssBoxListOverride(): any {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var minHeight = new MinHeight(100, new Percent())
            cssSelector[minHeight.getName()] = minHeight.getValue()

            var maxHeight = new MaxHeight(100, new Percent())
            cssSelector[maxHeight.getName()] = maxHeight.getValue()

            var borderBox = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
            cssSelector[borderBox.getName()] = borderBox.getValue()

            var height = new Height(100, new Percent())
            cssSelector[height.getName()] = height.getValue()

            // var display = new Display(Display.INLINE_BLOCK, new Named())
            // cssSelector[display.getName()] = display.getValue()

            if (this.hasFlexGrow) {
                // var flexGrow = new FlexGrow(1, new Named())
                // cssSelector[flexGrow.getName()] = flexGrow.getValue()
                //
                // var flexShring = new FlexShrink(0, new Named())
                // cssSelector[flexShring.getName()] = flexShring.getValue()
                //
                // var flexBasis = new FlexBasis(20, new Percent())
                // cssSelector[flexBasis.getName()] = flexBasis.getValue()
            }
            return cssSelector
        }

        return {}
    }

    public injectInitialCssStyles() {
        let border = new BorderGlobalCss('5', new Pixel())
        border.setType('solid')
        border.setColor('green', new Named())

        let width = new Width(20, new Percent())
        let minHeight = new MinHeight(100, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({ r: 70, g: 200, b: 200 }, new RGB())
        let p = new PaddingCss(10, new Pixel())

        let cssList = [width, minHeight, boxSizing, backgroundColor, p, border]




        this.addPropsToAccessor(cssList)
    }


}
