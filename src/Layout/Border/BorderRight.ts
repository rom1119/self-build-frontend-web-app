import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";


export default class BorderRight extends BorderModel {
    protected _name: string = 'border-right'
    protected _height: number = 100
    // protected _float: string = 'left';
    protected _initialColor: string = 'blue'

    constructor()
    {
        super()
        this._color = this._initialColor
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
    get height(): number {
        return this._height
    }

    get left(): string 
    {
        return 'none'
    }

    get cssList() : any
    {
        var baseStyles = super.cssList
        baseStyles.borderRightWidth = `${this.width}${this.widthUnit.value}`
        baseStyles.height = `none`
        baseStyles.width = `none`

        return baseStyles
    }
}
