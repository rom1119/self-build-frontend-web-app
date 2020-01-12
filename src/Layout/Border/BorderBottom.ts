import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import BorderModel from "./BorderModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import Named from "~/src/Unit/Color/Named";
import BorderTopWidth from "~/src/Css/Border/BorderTopWidth";
import BorderBottomWidth from "~/src/Css/Border/BorderBottomWidth";
import HtmlTag from "../HtmlTag";
import LeftCss from "~/src/Css/Position/Direction/LeftCss";
import BottomCss from "~/src/Css/Position/Direction/BottomCss";
import BorderBottomCss from "~/src/Css/Border/BorderBottomCss";

export default class BorderBottom extends BorderModel
{
    protected _name: string = 'border-bottom'
    protected _width: number = 100
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
        let width = new Width('100', new Percent())
        let height = new Height('none', new Named())
        let borderWidth = new BorderBottomWidth(this.width, this.widthUnit)
        let left = new LeftCss(0, new Named())
        let bottom = new BottomCss(this.offset, new Pixel())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(borderWidth)
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
        if (prop) {
            prop.setWidth(this.width, new Pixel())
            prop.setActive(true)
        } else {
            prop = new BorderBottomCss(this.width, new Pixel())
            prop.addPropVal(this._initialType)
            prop.addPropVal(this._initialColorUnit.getValue(this._initialColor))
        }
        this.htmlTag.updateCssPropertyWithoutModel(BorderBottomCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width('100', new Percent())
        let height = new Height('none', new Named())
        let borderWidth = new BorderBottomWidth(this.width, this.widthUnit)
        let left = new LeftCss(0, new Named())
        let bottom = new BottomCss(this.offset, new Pixel())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(BorderBottomWidth.PROP_NAME, borderWidth)
        this._cssPropertyAccesor.setNewPropertyValue(LeftCss.PROP_NAME, left)
        this._cssPropertyAccesor.setNewPropertyValue(BottomCss.PROP_NAME, bottom)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }

}