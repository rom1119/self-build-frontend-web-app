import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import HtmlTag from '~/src/Layout/HtmlTag';
import UnitColor from '../Unit/UnitColor';
import Named from "../Unit/Named";

export default abstract class HtmlTagBlock extends HtmlTag
{
    protected _tag = 'h1'
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected _width = 150
    protected _height = 150
        
    constructor() {
        super()
        
    }
    

    public onMouseMove(w, h) 
    {
        this.widthUnitCurrent = new Pixel()
        this._width = w
        this._height = h
    }


}


  
             