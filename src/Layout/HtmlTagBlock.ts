import LayoutEl from "../LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';
import HtmlTag from '~/src/Layout/HtmlTag';
import UnitColor from '../Unit/UnitColor';
import Named from "../Unit/Color/Named";

export default abstract class HtmlTagBlock extends HtmlTag
{
    protected _tag = 'h1'
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected _width = 150
    protected _height = 150
        
    constructor() {
        super()
        
    }
    
    get innerText() : string
    {
        return this._innerText
    }
    
    set innerText(text: string)
    {
        this._innerText = text
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