import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import Named from "~/src/Unit/Color/Named";
import BorderTopWidth from "~/src/Css/Border/BorderTopWidth";
import BorderBottomWidth from "~/src/Css/Border/BorderBottomWidth";

export default class BorderBottom extends BorderModel
{
    protected _name: string = 'border-bottom'
    protected _width: number = 100
    protected _initialColor: string = 'green'

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
        let borderWidth = new BorderBottomWidth(this.height, this.heightUnit)
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

    get top(): string 
    {
        return 'none'
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('100', new Percent())
        let height = new Height('none', new Named())
        let borderWidth = new BorderBottomWidth(this.height, this.heightUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderBottomWidth.PROP_NAME, borderWidth)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}