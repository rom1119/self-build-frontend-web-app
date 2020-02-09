import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import BorderColor from "~/src/Css/Border/Global/BorderGlobalColor";
import BorderStyle from "~/src/Css/Border/Global/BorderGlobalStyle";
import Height from "~/src/Css/Size/Height";
import BorderLeftWidth from "~/src/Css/Border/Left/BorderLeftWidth";
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import TopCss from "~/src/Css/Position/Direction/TopCss";
import BorderLeftCss from "~/src/Css/Border/Left/BorderLeftCss";
import HtmlTag from "../HtmlTag";
import BorderLeftStyle from "~/src/Css/Border/Left/BorderLeftStyle";
import BorderGlobalCss from "~/src/Css/Border/Global/BorderGlobalCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";

export default class BorderLeft extends BorderModel
{
    protected _name: string = 'border-left'
    protected _initialColor: string = 'gray'

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
        let width = new Width('none', new Named())
        let height = new Height(this.length, new Pixel())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)
        let borderStyle = new BorderLeftStyle(this.style, new Named())

        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(top)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BorderLeftCss>this.htmlTag.tmpCssAccessor.getProperty(BorderLeftCss.PROP_NAME)
        var propGlobal = <BorderGlobalCss>this.htmlTag.tmpCssAccessor.getProperty(BorderGlobalCss.PROP_NAME)

        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else if (propGlobal) {
            prop = new BorderLeftCss(this.width, new Pixel())
            propGlobal.setWidth(parseInt(propGlobal.getWidth()), propGlobal.getWidthUnit())
            prop.setColor(propGlobal.getColor(), propGlobal.getColorUnit())
            prop.setType(propGlobal.getType())
            propGlobal.setActive(true)
        } else {
            prop = new BorderLeftCss(this.width, new Pixel())
            prop.setWidth(this.width, new Pixel())
            prop.setColor(this.color, this._initialColorUnit)
            prop.setType(this.style)
        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderLeftCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('none', new Named())
        let height = new Height(this.length, new Pixel())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)
        let borderStyle = new BorderLeftStyle(this.style, new Named())

        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderLeftWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(BorderLeftStyle.PROP_NAME, borderStyle)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}