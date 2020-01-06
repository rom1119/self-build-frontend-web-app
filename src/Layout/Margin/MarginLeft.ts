import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import HtmlTag from "../HtmlTag";
import MarginModel from "./MarginModel";
import Height from "~/src/Css/Size/Height";
import MarginLeftCss from "~/src/Css/BoxModel/Margin/MarginLeftCss";

export default class MarginLeft extends MarginModel
{
    protected _name: string = 'margin-left'

    // protected _float: string = 'left';
    constructor(tag: HtmlTag)
    {
        super(tag)
        this._color = this._initialColor
        this.initCssAccessor()

    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(100, new Percent())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
    } 
    
    get width(): number {
        return this._width
    }

    set width(newVal: number) {
        this._width = newVal
    }

    public updatePixelPropertyForTag()
    {
        var prop = this.htmlTag.tmpCssAccessor.getProperty(MarginLeftCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
        } else {
            prop = new MarginLeftCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(MarginLeftCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(100, new Percent())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}