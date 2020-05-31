import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Percent from "~/src/Unit/Size/Percent";
import Width from "~/src/Css/Size/Width";
import Height from '../../Css/Size/Height';
import HtmlTag from "../HtmlTag";
import MarginModel from "./MarginModel";
import MarginRightCss from "~/src/Css/BoxModel/Margin/MarginRightCss";
import Named from "~/src/Unit/Named";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";
import { RightCss, TopCss } from "~/src/Css";


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
        let height = new Height(this.lengthCalc, new Named())
        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
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
        this.sizeCalculator = new MarginSizeCalculator(this.htmlTag)
        this.offsetSizeCalculator = new MarginOffsetSizeCalculator(this.htmlTag)
        this.getHtmlTag().marginTop.lengthCalc = this.sizeCalculator.build(this.getHtmlTag().marginTop)
        this.getHtmlTag().marginTop.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.getHtmlTag().marginTop)
        this.getHtmlTag().marginBottom.lengthCalc = this.sizeCalculator.build(this.getHtmlTag().marginBottom)
        this.getHtmlTag().marginBottom.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.getHtmlTag().marginBottom)
    }

    get left(): string 
    {
        return 'none'
    }

    public updatePixelPropertyForTag()
    {
        var prop = <BaseMarginCss>this.htmlTag.tmpCssAccessor.getProperty(MarginRightCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
            prop.notAuto()
            
        } else {
            prop = new MarginRightCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(MarginRightCss.PROP_NAME, prop)
    }

    public updateOpposedProperty()
    {
        this.htmlTag.marginLeft.updatePixelPropertyForTag()
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(this.lengthCalc, new Named())
        let right = new RightCss(this.offset, new Pixel())
        let top = new TopCss(this.lengthOffset, new Pixel())
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
