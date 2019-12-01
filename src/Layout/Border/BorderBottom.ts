import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";

export default class BorderBottom extends BorderModel
{
    protected _name: string = 'border-bottom'
    protected _width: number = 100
    protected _initialColor: string = 'green'

    constructor()
    {
        super()
        this._color = this._initialColor
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
        var baseStyles = super.cssList
        let height = new Width(this.height, this.heightUnit)
        baseStyles.borderTopWidth = height.getValue()
        baseStyles.height = `none`
        baseStyles.width = `100%`
        return baseStyles
    }

}