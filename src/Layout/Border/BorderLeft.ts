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
import BorderColor from "~/src/Css/Border/BorderColor";
import BorderStyle from "~/src/Css/Border/BorderStyle";
import Height from "~/src/Css/Size/Height";
import BorderLeftWidth from "~/src/Css/Border/BorderLeftWidth";
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import TopCss from "~/src/Css/Position/Direction/TopCss";
import BorderLeftCss from "~/src/Css/Border/BorderLeftCss";
import HtmlTag from "../HtmlTag";

export default class BorderLeft extends BorderModel
{
    protected _name: string = 'border-left'
    protected _height: number = 100
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
        let height = new Height('none', new Named())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)

        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(top)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BorderLeftCss>this.htmlTag.tmpCssAccessor.getProperty(BorderLeftCss.PROP_NAME)
        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else {
            prop = new BorderLeftCss(this.width, new Pixel())
            prop.addPropVal(this._initialType)
            prop.addPropVal(this._initialColorUnit.getValue(this._initialColor))
        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderLeftCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('none', new Named())
        let height = new Height('none', new Named())
        let borderWidth = new BorderLeftWidth(this.width, this.widthUnit)
        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderLeftWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}