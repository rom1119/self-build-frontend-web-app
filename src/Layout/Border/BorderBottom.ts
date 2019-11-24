import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Bottom from "~/src/Site/Bottom";
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
        return this._width
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
        return baseStyles
    }

}