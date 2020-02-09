import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import HtmlTag from "../HtmlTag";
import MarginModel from "./MarginModel";
import Height from "~/src/Css/Size/Height";
import MarginLeftCss from "~/src/Css/BoxModel/Margin/MarginLeftCss";
import Left from '~/src/Site/Left';
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import TopCss from '../../Css/Position/Direction/TopCss';
import Named from '../../Unit/Color/Named';
import BaseMarginCss from '../../Css/BoxModel/BaseMarginCss';
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";

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
        let height = new Height(this.length, new Pixel())
        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())

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
        this.sizeCalculator = new MarginSizeCalculator(this.htmlTag)
        this.offsetSizeCalculator = new MarginOffsetSizeCalculator(this.htmlTag)
        this.getHtmlTag().marginTop.length = this.sizeCalculator.calculateSize(this.getHtmlTag().marginTop)
        this.getHtmlTag().marginTop.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.getHtmlTag().marginTop)
        this.getHtmlTag().marginBottom.length = this.sizeCalculator.calculateSize(this.getHtmlTag().marginBottom)
        this.getHtmlTag().marginBottom.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.getHtmlTag().marginBottom)
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BaseMarginCss>this.htmlTag.tmpCssAccessor.getProperty(MarginLeftCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
            prop.notAuto()
        } else {
            prop = new MarginLeftCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(MarginLeftCss.PROP_NAME, prop)
    }

    public updateOpposedProperty()
    {
        this.htmlTag.marginRight.updatePixelPropertyForTag()
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(this.length, new Pixel())
        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
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