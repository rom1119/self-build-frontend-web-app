import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";

export default class PaddingBottom extends PaddingModel
{
    protected _name: string = 'border-bottom'
    protected _width: number = 100

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
        return this._width
    }

    set width(newVal: number) {
        this._width = newVal
    }
    get height(): number {
        return this._width
    }

    get top(): string 
    {
        return 'none'
    }

    get cssList() : any
    {
        var baseStyles = super.cssList
        let height = new Width(this.height, this.heightUnit)
        baseStyles.height = height
        baseStyles.width = `100%`
        return baseStyles
    }

}