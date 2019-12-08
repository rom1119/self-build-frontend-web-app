import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import BorderRightWidth from "~/src/Css/Border/BorderRightWidth";
import Height from "~/src/Css/Size/Height";


export default class BorderRight extends BorderModel {
    protected _name: string = 'border-right'
    protected _height: number = 100
    // protected _float: string = 'left';
    protected _initialColor: string = 'blue'

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
        let borderWidth = new BorderRightWidth(this.width, this.widthUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    get heightUnit(): UnitSize {
        return new Percent()
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

    get left(): string 
    {
        return 'none'
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('none', new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderRightWidth(this.width, this.widthUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderRightWidth.PROP_NAME, borderWidth)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
}
