import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";

export default abstract class Border<T extends Site> implements CssList
{
    protected _type: T
    protected _style: string = 'dashed'
    protected _borderWidth: number = 2
    protected _color: string = 'red'
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()

    
    abstract get widthUnit(): UnitSize
    abstract get heightUnit(): UnitSize

    abstract get width(): number
    abstract get height(): number

    get cssList() : any
    {
        return {
            width: `${this.width} ${this.widthUnit}`,
            height: `${this.height} ${this.heightUnit}`,
            borderStyle: `${this._style}`,
            borderWidth: `${this._borderWidth} px`,
            borderColor: `${this._color}`,
        }
    }
  

}