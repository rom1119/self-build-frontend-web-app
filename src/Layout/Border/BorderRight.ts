import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import BorderRightWidth from "~/src/Css/Border/Right/BorderRightWidth";
import Height from "~/src/Css/Size/Height";
import RightCss from "~/src/Css/Position/Direction/RightCss";
import TopCss from "~/src/Css/Position/Direction/TopCss";
import HtmlTag from "../HtmlTag";
import BorderRightCss from "~/src/Css/Border/Right/BorderRightCss";
import BorderGlobalStyle from "~/src/Css/Border/Global/BorderGlobalStyle";
import BorderRightStyle from "~/src/Css/Border/Right/BorderRightStyle";
import BorderGlobalCss from "~/src/Css/Border/Global/BorderGlobalCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";


export default class BorderRight extends BorderModel {
    protected _name: string = 'border-right'
    protected _height: number = 100
    // protected _float: string = 'left';
    protected _initialColor: string = 'blue'

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
        let borderWidth = new BorderRightWidth(this.width, this.widthUnit)
        let borderStyle = new BorderRightStyle(this.style, new Named())

        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
        this._cssPropertyAccesor.addNewProperty(right)
        this._cssPropertyAccesor.addNewProperty(top)
    }
    get left(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BorderRightCss>this.htmlTag.tmpCssAccessor.getProperty(BorderRightCss.PROP_NAME)
        var propGlobal = <BorderGlobalCss>this.htmlTag.tmpCssAccessor.getProperty(BorderGlobalCss.PROP_NAME)
        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else if (propGlobal) {
            prop = new BorderRightCss(this.width, new Pixel())
            propGlobal.setWidth(parseInt(propGlobal.getWidth()), propGlobal.getWidthUnit())
            prop.setColor(propGlobal.getColor(), propGlobal.getColorUnit())
            prop.setType(propGlobal.getType())
            propGlobal.setActive(true)
        } else {
            prop = new BorderRightCss(this.width, new Pixel())
            prop.setWidth(this.width, new Pixel())
            prop.setColor(this.color, this._initialColorUnit)
            prop.setType(this.style)
        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderRightCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('none', new Named())
        let height = new Height(this.length, new Pixel())
        let borderWidth = new BorderRightWidth(this.width, this.widthUnit)
        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
        let borderStyle = new BorderRightStyle(this.style, new Named())
        this._cssPropertyAccesor.setNewPropertyValue(BorderRightStyle.PROP_NAME, borderStyle)
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderRightWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(RightCss.PROP_NAME, right)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
}
