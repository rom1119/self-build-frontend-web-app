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
    get height(): number {
        return this._borderWidth
    }

    get cssList() : any
    {
        var baseStyles = super.cssList
        baseStyles.borderTopWidth = `${this.height}${this.heightUnit.value}`
        baseStyles.height = `none`
        return baseStyles
    }
    

}