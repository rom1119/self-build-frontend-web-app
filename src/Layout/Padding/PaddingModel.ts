import Site from "~/src/Site/Site";
import UnitSize from "~/src/Unit/UnitSize";
import Named from '../../Unit/Named';
import Pixel from '../../Unit/Size/Pixel';
import CssList from "../CssList";
import LayoutEl from "../../LayoutEl";
import Width from '../../Css/Size/Width';
import SizeActivable from "~/src/SizeActivable";
import BackgroundColor from '../../Css/Background/BackgroundColor';
import RGBA from '../../Unit/Color/RGBA';
import Height from "~/src/Css/Size/Height";
import HtmlTag from "../HtmlTag";
import Display from '../../Css/Display/Display';
import { Vue } from 'vue-property-decorator';

export default abstract class PaddingModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _width: number = 0
    protected _offsetCalc: string = 'calc(0px)'
    protected _lengthCalc: string = 'calc(0px)'
    protected _lengthOffsetCalc: string = 'calc(0px)'
    protected _color: any
    protected _initialColor: any = {
        r: 250,
        g: 250,
        b: 65,
        a: 0
    }
    protected _active: boolean = false;

    protected _defaultSizeUnit: UnitSize = new Pixel()
    protected _defaultColorUnit = new Named()
    protected htmlTag: HtmlTag
    widthUnit: UnitSize

    constructor(tag: HtmlTag)
    {
        super()
        this._color = this._initialColor
        this.htmlTag = tag
        this.widthUnit = this._defaultSizeUnit
        this.initCssAccessor()

    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
  
        let background = new BackgroundColor(this._color, new RGBA())
        var active= this._active
        var display
        let css = {}
        if (active) {
            display = new Display(Display.BLOCK, new Named())
        } else {
            display = new Display(Display.NONE, new Named())
        }
        this._cssPropertyAccesor.addNewProperty(background)
        // this._cssPropertyAccesor.addNewProperty(display)
        // this._cssPropertyAccesor.addNewProperty(borderWidth)
    }

    public toString(): string
    {
        return `${this._name}, UUID=${this.uuid} `
    }

    public getHtmlTag(): HtmlTag
    {
        return this.htmlTag
    }

    get width(): number
    {
        return this._width
    }
    set width(arg: number)
    {
        this._width = arg
    }

    get offsetCalc(): string
    {
        return this._offsetCalc
    }
    set offsetCalc(arg: string)
    {
        this._offsetCalc = arg
    }

    get lengthOffsetCalc(): string
    {
        return this._lengthOffsetCalc
    }
    set lengthOffsetCalc(arg: string)
    {
        this._lengthOffsetCalc = arg
    }
    

    get lengthCalc(): string
    {
        return this._lengthCalc
    }
    set lengthCalc(arg: string)
    {
        this._lengthCalc = arg
    }

    // onMouseOver(target: BorderModel) 
    // {        
    //     // console.log(this._name)
    //     target._color = 'blue'
    // }

    // onMouseOut() 
    // {
    //     this._color = this._initialColor
    // }

    public initSize(w) 
    {
        this.width = w
    }

    public focusColor()
    {
        this._color =  {
            r: 250,
            g: 250,
            b: 65,
            a: 0.60
        }
    }
    
    public blurColor()
    {
        this._color = this._initialColor
    }

    public changeAsActiveSize() {
        // this.htmlTag.focusPaddings()
        this.focusColor()
    }
    
    public changeAsDeactiveSize() {
        // this.htmlTag.blurPaddings()
        this.blurColor()
    }

    abstract updatePixelPropertyForTag()
    

    get cssList() : any
    {
        let active = this._active
        var display
        let css = {}
        if (active) {
            display = new Display(Display.BLOCK, new Named())
        } else {
            display = new Display(Display.NONE, new Named())
        }

        // this.updateCssProperty(Display.PROP_NAME, display)

        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        } 
        
        if (css[BackgroundColor.PROP_NAME]) {
            let borderColor = new BackgroundColor(this._color, new RGBA())
            this._cssPropertyAccesor.setNewPropertyValue(BackgroundColor.PROP_NAME, borderColor)
            css[BackgroundColor.PROP_NAME] = borderColor.getValue()
        }

        

        return css
    }
  
}