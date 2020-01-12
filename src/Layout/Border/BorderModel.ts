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
import BorderStyle from '../../Css/Border/BorderStyle';
import BorderColor from "~/src/Css/Border/BorderColor";
import BorderWidth from '../../Css/Border/BorderWidth';
import Display from "~/src/Css/Display/Display";
import HtmlTag from "../HtmlTag";

export default abstract class BorderModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _style: string
    protected _borderWidth: number = 15
    protected _offset: number = -15
    protected _color: string
    protected _colorUnit: UnitColor
    protected _initialColor: string = 'red'
    protected _initialType: string = BorderStyle.DASHED
    protected _initialColorUnit: UnitColor = new Named()
    protected _initialStyleUnit: UnitColor = new Named()
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()
    protected _width: number = 15
    protected htmlTag: HtmlTag
    widthUnit: UnitSize


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
        let borderColor = new BorderColor(this._color, this._initialColorUnit)
        // let borderWidth = new BorderWidth(this._color, this._initialColorUnit)
        let borderStyle = new BorderStyle(this._style, this._initialStyleUnit)

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
        this._cssPropertyAccesor.addNewProperty(display)
    }

    get borderWidth(): number
    {
        return this._borderWidth
    }
    set borderWidth(arg: number)
    {
        this._borderWidth = arg
    }

    get offset(): number
    {
        return this._offset
    }
    set offset(arg: number)
    {
        this._offset = arg
    }

    get width(): number
    {
        return this._width
    }
    set width(arg: number)
    {
        this._width = arg
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
        target._borderWidth++
    }

    public initSize(w) 
    {
        this.width = w
    }

    public changeAsActiveSize() {
        this._color = 'pink'
    }
    
    public changeAsDeactiveSize() {
        this._color = this._initialColor
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
        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        if (css[BorderColor.PROP_NAME]) {
            let borderColor = new BorderColor(this._color, this._colorUnit)
            this._cssPropertyAccesor.setNewPropertyValue(BorderColor.PROP_NAME, borderColor)

            css[BorderColor.PROP_NAME] = borderColor.getValue()
        }

        return css
    }
  

}