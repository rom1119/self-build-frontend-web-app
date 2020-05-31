import UnitSize from "~/src/Unit/UnitSize"
import Pixel from '../../Unit/Size/Pixel';
import PaddingModel from "./PaddingModel";
import Percent from '../../Unit/Size/Percent';
import Width from "~/src/Css/Size/Width";
import HtmlTag from "../HtmlTag";
import Height from "~/src/Css/Size/Height";
import PaddingLeftCss from '../../Css/BoxModel/Padding/PaddingLeftCss';
import Named from "~/src/Unit/Named";
import { LeftCss, TopCss } from "~/src/Css";

export default class PaddingLeft extends PaddingModel
{
    public getTagName(): string {
        throw new Error("Method not implemented.");
    }
    protected _name: string = 'padding-left'

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
        let height = new Height(100, new Percent())
        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())
        
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
    }

    public updatePixelPropertyForTag()
    {
        var prop = this.htmlTag.tmpCssAccessor.getProperty(PaddingLeftCss.PROP_NAME)
        if (prop) {
            prop.setValue(this.width.toString())
            prop.setUnit(new Pixel())
            prop.setActive(true)
        } else {
            prop = new PaddingLeftCss(this.width, new Pixel())
        }
        this.htmlTag.updateCssPropertyWithoutModel(PaddingLeftCss.PROP_NAME, prop)
    }

    get cssList() : any
    {
        let css = super.cssList
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(100, new Percent())
        let left = new LeftCss(this.offset, new Pixel())
        let top = new TopCss(0, new Named())

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