import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import BorderColor from "~/src/Css/Border/BorderColor";
import BorderStyle from "~/src/Css/Border/BorderStyle";
import Height from "~/src/Css/Size/Height";
import BorderLeftWidth from "~/src/Css/Border/BorderLeftWidth";

export default class BorderLeft extends BorderModel
{
    protected _name: string = 'border-left'
    protected _height: number = 100
    protected _initialColor: string = 'gray'

    // protected _float: string = 'left';
    constructor()
    {
        super()
        this._color = this._initialColor
        this.initCssAccessor()
    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        let width = new Width('none', new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    
    get width(): number {
        return this._borderWidth
    }

    set width(newVal: number) {
        this._borderWidth = newVal
    }

    get height(): number {
        return this._height
    }
    get heightUnit(): UnitSize {
        return new Percent()
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('none', new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderLeftWidth.PROP_NAME, borderWidth)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}