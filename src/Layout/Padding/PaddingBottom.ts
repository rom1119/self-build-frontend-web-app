import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import HtmlTag from "../HtmlTag";
import Height from "~/src/Css/Size/Height";

export default class PaddingBottom extends PaddingModel
{
    protected _name: string = 'padding-bottom'
    // protected _width: number = 100

    constructor(tag: HtmlTag)
    {
        super(tag)
        this._color = this._initialColor
        this.initCssAccessor()

    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        let width = new Width(100, new Percent())
        let height = new Height(this.height, this.heightUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
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
        let css = super.cssList
        let width = new Width(100, new Percent())
        let height = new Height(this.height, this.heightUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}