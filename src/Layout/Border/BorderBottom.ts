import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import Named from "~/src/Unit/Named";
import BorderTopWidth from "~/src/Css/Border/Top/BorderTopWidth";
import BorderBottomWidth from "~/src/Css/Border/Bottom/BorderBottomWidth";
import HtmlTag from "../HtmlTag";
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import BottomCss from "~/src/Css/Position/Direction/BottomCss";
import BorderBottomCss from "~/src/Css/Border/Bottom/BorderBottomCss";
import BorderBottomStyle from '../../Css/Border/Bottom/BorderBottomStyle';
import BorderGlobalCss from "~/src/Css/Border/Global/BorderGlobalCss";

export default class BorderBottom extends BorderModel
{
    protected _name: string = 'border-bottom'
    protected _initialColor: string = 'green'

    constructor(tag: HtmlTag)
    {
        super(tag)
        this._color = this._initialColor
        this.initCssAccessor()

    }
    
    protected initCssAccessor()
    {
        super.initCssAccessor()
        let width = new Width(this.lengthCalc, new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderBottomWidth(this.width, this.widthUnit)
        let borderStyle = new BorderBottomStyle(this.style, new Named())
        let left = new LeftCss(this.lengthOffset, new Pixel())
        let bottom = new BottomCss(this.offset, new Pixel())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(bottom)
    }  

    get top(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BorderBottomCss>this.htmlTag.tmpCssAccessor.getProperty(BorderBottomCss.PROP_NAME)
        var propGlobal = <BorderGlobalCss>this.htmlTag.tmpCssAccessor.getProperty(BorderGlobalCss.PROP_NAME)

        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else if (propGlobal) {
            prop = new BorderBottomCss(this.width, new Pixel())
            propGlobal.setWidth(parseInt(propGlobal.getWidth()), propGlobal.getWidthUnit())
            prop.setColor(propGlobal.getColor(), propGlobal.getColorUnit())
            prop.setType(propGlobal.getType())
            propGlobal.setActive(true)
        } else {
            prop = new BorderBottomCss(this.width, new Pixel())
            prop.setWidth(this.width, new Pixel())
            prop.setColor(this.color, this._initialColorUnit)
            prop.setType(this.style)
        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderBottomCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.lengthCalc, new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderBottomWidth(this.width, this.widthUnit)
        let borderStyle = new BorderBottomStyle(this.style, new Named())
        let left = new LeftCss(this.lengthOffset, new Pixel())
        let bottom = new BottomCss(this.offset, new Pixel())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderBottomWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(BorderBottomStyle.PROP_NAME, borderStyle)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(BottomCss.PROP_NAME, bottom)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}