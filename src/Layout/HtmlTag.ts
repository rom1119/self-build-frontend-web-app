import LayoutEl from "./LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';

export default abstract class HtmlTag extends LayoutEl implements CssList
{
    protected _tag = 'h1'
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
    protected initialBorderColor = 'red'
    private _borderColor = this.initialBorderColor;
     get borderColor() {
        return this._borderColor;
    }
     set borderColor(value) {
        this._borderColor = value;
    }

    protected _styleList: any = {
        width: this._width,
        height: this._height,
    }

    protected sizeUnitCurrent: UnitSize = new Percent()
        
    constructor() {
        super()
        
    }

    protected abstract getTag(): string

    public changeAsActiveSize()
    {
        this._borderColor = 'blue'
    }
    
    public changeAsDeactiveSize()
    {
        this._borderColor = this.initialBorderColor
    }

    get tag(): string {
        return `<${this.getTag()}>${this.innerText}</${this.getTag()}>`

    }


    get cssList() : any
    {
        return {
            width: `${this._width}${this.sizeUnitCurrent}`,
            height: `${this._height}${this.sizeUnitCurrent}`,
            borderStyle: `dashed`,
            borderWidth: `2px`,
            borderColor: `${this._borderColor}`,
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

    public onDoubleClick(e) 
    {
        this._isEdited = true
    }



}