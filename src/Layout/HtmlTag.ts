import LayoutEl from "./LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';
import UnitColor from "../Unit/UnitColor";
import Named from "../Unit/Color/Named";

export default abstract class HtmlTag extends LayoutEl implements CssList
{
    protected _tag = 'h1'
    protected _htmlEl
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected isActive = false
    protected borderActive = false
    protected paddingActive = false
    protected marginActive = false
    protected contentActive = false
    protected sizeActive = false
    protected _isEdited = false
    protected _width = 100
    protected _height = 100
    protected initialBackgroundColor = 'transparent'
    private _backgroundColor = this.initialBackgroundColor;
    private _initialColorUnit: UnitColor = new Named;
    private _colorUnit: UnitColor = this._initialColorUnit
    protected sizeUnitCurrent: UnitSize = new Pixel()
    
    get width()
    {
        return this._width
    }

    // set width(value) {
    //     this._htmlEl = value;
    //  }

    get height()
    {
        return this._height
    }

    // set height(value) {
    //     this._height = value;
    //  }


    get htmlEl() {
        return this._htmlEl;
    }

    set htmlEl(value) {
       this._htmlEl = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
     set backgroundColor(value) {
        this._backgroundColor = value;
    }

        
    constructor() {
        super()
        
    }

    protected abstract getTag(): string

    public changeAsActiveSize()
    {
        this._backgroundColor = 'aqua'
    }
    
    public changeAsDeactiveSize()
    {
        this._backgroundColor = this.initialBackgroundColor
    }

    get tag(): string {
        return `<${this.getTag()} >${this.innerText}</${this.getTag()}>`

    }


    get cssList() : any
    {
        return {
            width: `${this._width}${this.sizeUnitCurrent.value}`,
            height: `${this._height}${this.sizeUnitCurrent.value}`,
            backgroundColor: `${this._backgroundColor}${this._colorUnit.value}`,
        }
    }
    
    get innerText() : string
    {
        return this._innerText
    }
    
    set innerText(text: string)
    {
        this._innerText = text
    }

    get isEdited() : boolean
    {
        return this._isEdited
    }

    public setNotEdited()
    {
        this._isEdited = false
    }

    public onMouseMove(w, h) 
    {
        this.sizeUnitCurrent = new Pixel()
        this._width = w
        this._height = h
    }

    public initSize(w, h) 
    {
        this.sizeUnitCurrent = new Pixel()
        this._width = w
        this._height = h
    }

    public onDoubleClick(e) 
    {
        this._isEdited = true
    }



}