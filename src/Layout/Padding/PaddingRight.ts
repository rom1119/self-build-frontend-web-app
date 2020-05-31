import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Named';
import Left from '~/src/Site/Left';
import PaddingModel from "./PaddingModel";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import Height from '../../Css/Size/Height';
import HtmlTag from "../HtmlTag";
import PaddingRightCss from "~/src/Css/BoxModel/Padding/PaddingRightCss";
import { RightCss, TopCss } from "~/src/Css";


export default class PaddingRight extends PaddingModel {
    protected _name: string = 'padding-right'

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
        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(right)
        this._cssPropertyAccesor.addNewProperty(top)
    }
    
    get width(): number {
        return this._width
    }
    
    set width(newVal: number) {
        this._width = newVal
    }

    get left(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        var prop = this.htmlTag.tmpCssAccessor.getProperty(PaddingRightCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
        } else {
            prop = new PaddingRightCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(PaddingRightCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(100, new Percent())
        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())
        this._cssPropertyAccesor.setNewPropertyValue(Width.PROP_NAME, width)
        this._cssPropertyAccesor.setNewPropertyValue(Height.PROP_NAME, height)
        this._cssPropertyAccesor.setNewPropertyValue(RightCss.PROP_NAME, right)
        this._cssPropertyAccesor.setNewPropertyValue(TopCss.PROP_NAME, top)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        return css
    }
}
