import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";

export default class PaddingLeft extends PaddingModel
{
    protected _name: string = 'border-left'
    protected _height: number = 100

    // protected _float: string = 'left';
    constructor()
    {
        super()
        this._color = this._initialColor
    }

    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    
    get width(): number {
        return this._width
    }

    set width(newVal: number) {
        this._width = newVal
    }

    get height(): number {
        return this._height
    }
    get heightUnit(): UnitSize {
        return new Percent()
    }

    get cssList() : any
    {
        var baseStyles = super.cssList
        let height = new Width(this.width, this.widthUnit)

        baseStyles.height = `none`
        baseStyles.width = `none`
        return baseStyles
    }

}