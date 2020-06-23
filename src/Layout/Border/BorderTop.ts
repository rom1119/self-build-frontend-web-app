import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Top from '../../Site/Top';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import BorderBottomWidth from "~/src/Css/Border/Bottom/BorderBottomWidth";
import BorderTopWidth from "~/src/Css/Border/Top/BorderTopWidth";
import HtmlTag from "../HtmlTag";
import BorderTopCss from "~/src/Css/Border/Top/BorderTopCss";
import BorderTopStyle from "~/src/Css/Border/Top/BorderTopStyle";
import BorderGlobalCss from "~/src/Css/Border/Global/BorderGlobalCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";
import { LeftCss, TopCss } from "~/src/Css";

export default class BorderTop extends BorderModel
{
    protected _name: string = 'border-top'
    protected _width: number = 100

    protected _initialColor: string = 'aqua'

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
        let width = new Width(this.lengthCalc, new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderTopWidth(this.width, this.widthUnit)
        let borderStyle = new BorderTopStyle(this.style, new Named())

        let left = new LeftCss(this.lengthOffsetCalc, new Named())
        let top = new TopCss(this.offsetCalc, new Named())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
        this._cssPropertyAccesor.addNewProperty(borderStyle)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(top)
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BorderTopCss>this.htmlTag.tmpCssAccessor.getProperty(BorderTopCss.PROP_NAME)
        var propGlobal = <BorderGlobalCss>this.htmlTag.tmpCssAccessor.getProperty(BorderGlobalCss.PROP_NAME)

        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else if (propGlobal) {
            prop = new BorderTopCss(this.width, new Pixel())
            propGlobal.setWidth(parseInt(propGlobal.getWidth()), propGlobal.getWidthUnit())
            prop.setColor(propGlobal.getColor(), propGlobal.getColorUnit())
            prop.setType(propGlobal.getType())
            propGlobal.setActive(true)
        } else {
            prop = new BorderTopCss(this.width, new Pixel())
            prop.addPropVal(this._initialType)
            prop.addPropVal(this._initialColorUnit.getValue(this._initialColor))
            prop.setType(this.style)

        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderTopCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.lengthCalc, new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderTopWidth(this.width, this.widthUnit)
        let borderStyle = new BorderTopStyle(this.style, new Named())

        let left = new LeftCss(this.lengthOffsetCalc, new Named())
        let top = new TopCss(this.offsetCalc, new Named())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderTopWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(BorderTopStyle.PROP_NAME, borderStyle)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
    

}