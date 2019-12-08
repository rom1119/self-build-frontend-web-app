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

export default abstract class BorderModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _style: string
    protected _borderWidth: number = 15
    protected _color: string
    protected _colorUnit: UnitColor
    protected _initialColor: string = 'red'
    protected _initialType: string = BorderStyle.DASHED
    protected _initialColorUnit: UnitColor = new Named()
    protected _initialStyleUnit: UnitColor = new Named()
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()
    protected _cssPropertyAccesor: CssPropertyAccessor


    constructor()
    {
        super()
        this._color = this._initialColor
        this._colorUnit = this._initialColorUnit
        this._style = this._initialType

    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        // let width = new Width(this.width, this.widthUnit)
        // let height = new Height(this.height, this.heightUnit)
        let borderColor = new BorderColor(this._color, this._initialColorUnit)
        // let borderWidth = new BorderWidth(this._color, this._initialColorUnit)
        let borderStyle = new BorderStyle(this._style, this._initialStyleUnit)
        // this._cssPropertyAccesor.addNewProperty(width)
        // this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderColor)
        // this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
    }

    get borderWidth(): number
    {
        return this._borderWidth
    }
    set borderWidth(arg: number)
    {
        this._borderWidth = arg
    }

    public toString(): string
    {
        return `${this._name}, UUID=${this.uuid} `
    }

    
    abstract get widthUnit(): UnitSize
    abstract get heightUnit(): UnitSize

    abstract get width(): number
    abstract set width(val: number)
    abstract get height(): number

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

    get cssList() : any
    {
        
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 

        if (css[Width.PROP_NAME]) {
            let width = new Width(this.width, this.widthUnit)
            css[Width.PROP_NAME] = width.getValue()
        }
        
        if (css[Height.PROP_NAME]) {
            let height = new Height(this.height, this.heightUnit)
            css[Height.PROP_NAME] = height.getValue()
        }
        
        if (css[BorderColor.PROP_NAME]) {
            let borderColor = new BorderColor(this._color, this._colorUnit)
            this._cssPropertyAccesor.setNewPropertyValue(BorderColor.PROP_NAME, borderColor)

            css[BorderColor.PROP_NAME] = borderColor.getValue()
        }

        return css
    }
  

}