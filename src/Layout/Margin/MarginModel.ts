import Site from "~/src/Site/Site";
import UnitSize from "~/src/Unit/UnitSize";
import Named from '../../Unit/Color/Named';
import Pixel from '../../Unit/Size/Pixel';
import CssList from "../CssList";
import LayoutEl from "../../LayoutEl";
import Width from '../../Css/Size/Width';
import SizeActivable from "~/src/SizeActivable";
import BackgroundColor from '../../Css/Background/BackgroundColor';
import RGBA from '../../Unit/Color/RGBA';
import Height from "~/src/Css/Size/Height";
import HtmlTag from "../HtmlTag";

export default abstract class MarginModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _width: number = 55
    protected _color: any
    protected _initialColor: any = {
        r: 255,
        g: 255,
        b: 255,
        a: 0
    }
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()
    protected htmlTag: HtmlTag

    constructor(tag: HtmlTag)
    {
        super()
        this._color = this._initialColor
        this.htmlTag = tag
        this.initCssAccessor()

    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
  
        let background = new BackgroundColor(this._color, new RGBA())
        this._cssPropertyAccesor.addNewProperty(background)
        // this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    public toString(): string
    {
        return `${this._name}, UUID=${this.uuid} `
    }

    get width(): number
    {
        return this._width
    }
    set width(arg: number)
    {
        this._width = arg
    }

    abstract get widthUnit(): UnitSize
    abstract get heightUnit(): UnitSize

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

    public initSize(w) 
    {
        this.width = w
    }

    public focusColor()
    {
        this._color =  {
            r: 26,
            g: 220,
            b: 250,
            a: 0.50
        }
    }
    
    public blurColor()
    {
        this._color = this._initialColor
    }

    public changeAsActiveSize() {
        this.htmlTag.focusMargins()
    }
    
    public changeAsDeactiveSize() {
        this.htmlTag.blurMargins()
    }

    get cssList() : any
    {
        
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        if (css[BackgroundColor.PROP_NAME]) {
            let borderColor = new BackgroundColor(this._color, new RGBA())
            this._cssPropertyAccesor.setNewPropertyValue(BackgroundColor.PROP_NAME, borderColor)
            css[BackgroundColor.PROP_NAME] = borderColor.getValue()
        }

        return css
    }
  
}