import Site from "~/src/Site/Site";
import UnitSize from "~/src/Unit/UnitSize";
import Named from '../../Unit/Color/Named';
import Pixel from '../../Unit/Size/Pixel';
import CssList from "../CssList";
import LayoutEl from "../../LayoutEl";
import Width from '../../Css/Size/Width';
import SizeActivable from "~/src/SizeActivable";
import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import BorderElPropertyAccessor from "~/src/Css/PropertyAccessor/BorderElCssPropertyAccessor";
import Height from "~/src/Css/Size/Height";
import BackgroundColor from "~/src/Css/Background/BackgroundColor";
import UnitColor from "~/src/Unit/UnitColor";
import BorderGlobalStyle from '../../Css/Border/Global/BorderGlobalStyle';
import BorderWidth from '../../Css/Border/Global/BorderGlobalWidth';
import Display from "~/src/Css/Display/Display";
import HtmlTag from "../HtmlTag";
import BorderGlobalColor from "~/src/Css/Border/Global/BorderGlobalColor";
import MarginOffsetCalculator from "~/src/Calculator/Offset/MarginOffsetCalculator";
import PaddingOffsetCalculator from "~/src/Calculator/Offset/PaddingOffsetCalculator";

export default abstract class BorderModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _style: string
    protected _offset: number = -15
    protected _length: number = 0
    protected _lengthOffset: number = 0
    protected _color: string
    protected _colorUnit: UnitColor
    protected _initialColor: string = 'red'
    protected _initialType: string = BorderGlobalStyle.DASHED
    protected _initialColorUnit: UnitColor = new Named()
    protected _initialStyleUnit: UnitColor = new Named()
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()
    protected _width: number = 15
    protected htmlTag: HtmlTag
    widthUnit: UnitSize
    protected _active: boolean = false;


    protected _cssPropertyAccesor: CssPropertyAccessor

    constructor(tag: HtmlTag)
    {
        super()
        this.htmlTag = tag
        this._color = this._initialColor
        this._colorUnit = this._initialColorUnit
        this._style = this._initialType
        this.widthUnit = this._defaultSizeUnit
    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        // let width = new Width(this.width, this.widthUnit)
        // let height = new Height(this.height, this.heightUnit)
        let borderColor = new BorderGlobalColor(this._color, this._initialColorUnit)
        // let borderWidth = new BorderWidth(this._color, this._initialColorUnit)
        let borderStyle = new BorderGlobalStyle(this._style, this._initialStyleUnit)

        var active= this._active
        var display
        let css = {}
        if (active) {
            display = new Display(Display.BLOCK, new Named())
        } else {
            display = new Display(Display.NONE, new Named())
        }
        // this._cssPropertyAccesor.addNewProperty(width)
        // this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderColor)
        // this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
        // this._cssPropertyAccesor.addNewProperty(display)
    }

    get offset(): number
    {
        return this._offset
    }
    set offset(arg: number)
    {
        this._offset = arg
        let marginCal = new MarginOffsetCalculator(this.getHtmlTag())
        this.getHtmlTag().marginRight.offset = marginCal.calculateOffset(this.getHtmlTag().marginRight)
        this.getHtmlTag().marginBottom.offset = marginCal.calculateOffset(this.getHtmlTag().marginBottom)
        this.getHtmlTag().marginTop.offset = marginCal.calculateOffset(this.getHtmlTag().marginTop)
        this.getHtmlTag().marginLeft.offset = marginCal.calculateOffset(this.getHtmlTag().marginLeft)
        
    }

    get lengthOffset(): number
    {
        return this._lengthOffset
    }
    set lengthOffset(arg: number)
    {
        this._lengthOffset = arg
    }
    
    get length(): number
    {
        return this._length
    }
    set length(arg: number)
    {
        this._length = arg
    }
    
    get width(): number
    {
        return this._width
    }
    set width(arg: number)
    {
        this._width = arg
        // let paddingCal = new PaddingOffsetCalculator(this.getHtmlTag())
        // this.getHtmlTag().paddingRight.offset = paddingCal.calculateOffset(this.getHtmlTag().paddingRight)
        // this.getHtmlTag().paddingBottom.offset = paddingCal.calculateOffset(this.getHtmlTag().paddingBottom)
        // this.getHtmlTag().paddingTop.offset = paddingCal.calculateOffset(this.getHtmlTag().paddingTop)
        // this.getHtmlTag().paddingLeft.offset = paddingCal.calculateOffset(this.getHtmlTag().paddingLeft)
        this.getHtmlTag().updateAllModelsComponents()
    }
    
    get color(): string
    {
        return this._color
    }
    set color(arg: string)
    {
        this._color = arg
    }
    
    get style(): string
    {
        return this._style
    }
    set style(arg: string)
    {
        this._style = arg
    }

    public getHtmlTag(): HtmlTag
    {
        return this.htmlTag
    }
    
    public toString(): string
    {
        return `${this._name}, UUID=${this.uuid} `
    }

    // onMouseOver(target: BorderModel) 
    // {        
    //     // console.log(this._name)
    //     target._color = 'blue'
    // }

    // onMouseOut() 
    // {
    //     this._color = this._initialColor
    // }


    onClick(target: BorderModel) 
    {
        target._width++
    }

    public initSize(w) 
    {
        this.width = w
    }

    public changeAsActiveSize() {
        // this._color = 'pink'
    }
    
    public changeAsDeactiveSize() {
        // this._color = this._initialColor
    }
    
    abstract updatePixelPropertyForTag()


    get cssList() : any
    {
        let active = this._active
        var display
        if (active) {
            display = new Display(Display.BLOCK, new Named())
        } else {
            display = new Display(Display.NONE, new Named())
        }
        let css = {}
        
        // css[BorderGlobalColor.PROP_NAME] = borderStyle.getValue()

        
        // if (css[BorderGlobalColor.PROP_NAME]) {
        let borderColor = new BorderGlobalColor(this._color, this._colorUnit)
        this._cssPropertyAccesor.setNewPropertyValue(BorderGlobalColor.PROP_NAME, borderColor)
            // css[BorderGlobalColor.PROP_NAME] = borderColor.getValue()
            // }
        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 

        return css
    }
  

}