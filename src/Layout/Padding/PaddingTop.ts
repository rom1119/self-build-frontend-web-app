import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Top from '../../Site/Top';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import HtmlTag from "../HtmlTag";

export default class BorderTop extends PaddingModel
{
    protected _name: string = 'border-top'
    // protected _width: number = 100

    // protected _initialColor: string = 'aqua'

    // protected _float: string = 'left';
    constructor(tag: HtmlTag)
    {
        super(tag)
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

    get cssList() : any
    {
        var baseStyles = super.cssList
        let width = new Width(100, this.widthUnit)
        let height = new Height(this.height, this.heightUnit)
        baseStyles.height = height.getValue()
        baseStyles.width = width.getValue()

        return baseStyles
    }
    

}