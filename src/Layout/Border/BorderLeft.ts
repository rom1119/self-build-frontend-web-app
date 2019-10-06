import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';

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
    }

    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    
    get width(): number {
        return this._borderWidth
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
        baseStyles.borderLeftWidth = `${this.width}${this.widthUnit.value}`
        baseStyles.height = `none`
        baseStyles.width = `none`
        return baseStyles
    }

}