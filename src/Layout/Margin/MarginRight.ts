import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import Height from '../../Css/Size/Height';
import HtmlTag from "../HtmlTag";
import MarginModel from "./MarginModel";
import MarginRightCss from "~/src/Css/BoxModel/Margin/MarginRightCss";


export default class MarginRight extends MarginModel {
    protected _name: string = 'margin-right'

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

    get left(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        var prop = this.htmlTag.tmpCssAccessor.getProperty(MarginRightCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
        } else {
            prop = new MarginRightCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(MarginRightCss.PROP_NAME, prop)
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
