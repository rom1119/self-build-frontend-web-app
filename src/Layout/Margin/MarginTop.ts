import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import Percent from '../../Unit/Size/Percent';
import Top from '../../Site/Top';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import HtmlTag from "../HtmlTag";
import MarginModel from "./MarginModel";
import MarginTopCss from "~/src/Css/BoxModel/Margin/MarginTopCss";
import TopCss from "~/src/Css/Position/Direction/TopCss";
import Named from "~/src/Unit/Color/Named";
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";

export default class MarginTop extends MarginModel
{
    protected _name: string = 'margin-top'

    // protected _initialColor: string = 'aqua'

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
        let width = new Width(this.length, new Pixel())
        let height = new Height(this.width, this.widthUnit)
        let left = new LeftCss(this.lengthOffset, new Pixel())
        let top = new TopCss(this.offset, new Pixel())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(top)
    }

    get width(): number {
        return this._width
    }

    set width(newVal: number) {
        this._width = newVal
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BaseMarginCss>this.htmlTag.tmpCssAccessor.getProperty(MarginTopCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
            prop.notAuto()

        } else {
            prop = new MarginTopCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(MarginTopCss.PROP_NAME, prop)
    }

    public updateOpposedProperty()
    {
        this.htmlTag.marginBottom.updatePixelPropertyForTag()
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.length, new Pixel())
        let height = new Height(this.width, this.widthUnit)
        let left = new LeftCss(this.lengthOffset, new Pixel())
        let top = new TopCss(this.offset, new Pixel())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
    

}