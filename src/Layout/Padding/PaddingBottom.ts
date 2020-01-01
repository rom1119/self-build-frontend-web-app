import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import HtmlTag from "../HtmlTag";
import Height from "~/src/Css/Size/Height";
import PaddingBottomCss from "~/src/Css/BoxModel/Padding/PaddingBottomCss";

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
        let height = new Height(this.width, this.widthUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
    }
    get width(): number {
        return this._width
    }

    set width(newVal: number) {
        this._width = newVal
    }

    get top(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        this.htmlTag.updateCssPropertyWithoutModel(PaddingBottomCss.PROP_NAME, new PaddingBottomCss(this.width, new Pixel()))

    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(100, new Percent())
        let height = new Height(this.width, this.widthUnit)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}