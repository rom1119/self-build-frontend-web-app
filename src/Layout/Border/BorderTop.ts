import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Top from '../../Site/Top';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import BorderBottomWidth from "~/src/Css/Border/BorderBottomWidth";
import BorderTopWidth from "~/src/Css/Border/BorderTopWidth";

export default class BorderTop extends BorderModel
{
    protected _name: string = 'border-top'
    protected _width: number = 100

    protected _initialColor: string = 'aqua'

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
        let width = new Width('100', new Percent())
        let height = new Height('none', new Named())
        let borderWidth = new BorderTopWidth(this.height, this.heightUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    get widthUnit(): UnitSize {
        return new Percent()
    }    
    get heightUnit(): UnitSize {
        return new Pixel()
    }
    get width(): number {
        return this._borderWidth
    }

    set width(newVal: number) {
        this._borderWidth = newVal
    }

    get height(): number {
        return this._borderWidth
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('100', new Percent())
        let height = new Height('none', new Named())
        let borderWidth = new BorderTopWidth(this.height, this.heightUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderTopWidth.PROP_NAME, borderWidth)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
    

}