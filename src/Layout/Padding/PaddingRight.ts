import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import Left from '~/src/Site/Left';
import PaddingModel from "./PaddingModel";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import Height from '../../Css/Size/Height';
import HtmlTag from "../HtmlTag";


export default class PaddingRight extends PaddingModel {
    protected _name: string = 'padding-right'
    protected _height: number = 100
    // protected _float: string = 'left';

    constructor(tag: HtmlTag)
    {
        super(tag)
        this._color = this._initialColor
    }
    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    get heightUnit(): UnitSize {
        return new Percent()
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

    get left(): string 
    {
        return 'none'
    }

    get cssList() : any
    {
        var baseStyles = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(this.height, this.heightUnit)
        baseStyles.height = '100%'
        baseStyles.width = width.getValue()

        return baseStyles
    }
}
