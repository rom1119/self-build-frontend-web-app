import Site from "~/src/Site/Site";
import UnitSize from "~/src/Unit/UnitSize";
import Named from '../../Unit/Color/Named';
import Pixel from '../../Unit/Size/Pixel';
import CssList from "../CssList";
import LayoutEl from "../../LayoutEl";
import Width from '../../Css/Size/Width';
import SizeActivable from "~/src/SizeActivable";
import BackgroundColor from '../../Css/Background/BackgroundColor';
import RGBA from '../../Unit/Color/RGBA';
import Height from "~/src/Css/Size/Height";

export default abstract class PaddingModel extends LayoutEl implements CssList, SizeActivable
{
    
    protected _name: string = 'border-base'
    protected _width: number = 55
    protected _color: string
    protected _initialColor: any = {
        r: 250,
        g: 250,
        b: 65,
        a: 0.60
    }
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()

    constructor()
    {
        super()
        this._color = this._initialColor
    }

    get width(): number
    {
        return this._width
    }
    set width(arg: number)
    {
        this._width = arg
    }

    abstract get widthUnit(): UnitSize
    abstract get heightUnit(): UnitSize

    abstract get height(): number

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

    public changeAsActiveSize() {
        this._color = 'blue'
    }
    
    public changeAsDeactiveSize() {
        this._color = this._initialColor
    }

    get cssList() : any
    {
        
        let width = new Width(this.width, this.widthUnit)
        let height = new Height(this.height, this.heightUnit)
        let background = new BackgroundColor(this._initialColor, new RGBA())

        return {
            width: width.getValue(),
            height: height.getValue(),
            backgroundColor: background.getValue(),

        }
    }
  
}