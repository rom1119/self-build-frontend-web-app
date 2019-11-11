import Site from "~/src/Site/Site";
import UnitSize from "~/src/Unit/UnitSize";
import Named from '../../Unit/Color/Named';
import Pixel from '../../Unit/Size/Pixel';
import CssList from "../CssList";
import LayoutEl from "../../LayoutEl";
import BorderDashed from "./Style/BorderDashed";
import BorderStyle from "./Style/BorderStyle";
import BorderDotted from './Style/BorderDotted';
import BorderSolid from './Style/BorderSolid';
import BorderNone from './Style/BorderNone';

export default abstract class BorderModel extends LayoutEl implements CssList
{
    protected _name: string = 'border-base'
    protected _style: BorderStyle
    protected _borderWidth: number = 15
    protected _color: string
    protected _initialColor: string = 'red'
    protected _initialType: BorderStyle = new BorderDashed()
    protected _defaultSizeUnit = new Pixel()
    protected _defaultColorUnit = new Named()
    protected _float: string = 'left';

    constructor()
    {
        super()
        this._color = this._initialColor
        this._style = this._initialType
    }

    get borderWidth(): number
    {
        return this._borderWidth
    }

    
    abstract get widthUnit(): UnitSize
    abstract get heightUnit(): UnitSize

    abstract get width(): number
    abstract get height(): number

    onMouseOver(target: BorderModel) 
    {        
        // console.log(this._name)
        target._color = 'blue'
    }

    onMouseOut() 
    {
        this._color = this._initialColor
    }

    public setDotted()
    {
        this._style = new BorderDotted()
    }

    public setDashed()
    {
        this._style = new BorderDashed()
    }

    public setSolid()
    {
        // console.log(this);
        
        this._style = new BorderSolid()
    }

    
    public setNone()
    {
        this._style = new BorderNone()
    }


    onClick(target: BorderModel) 
    {
        target._borderWidth++
    }


    get cssList() : any
    {
        return {
            width: `${this.width}${this.widthUnit.value}`,
            height: `${this.height}${this.heightUnit.value}`,
            borderStyle: `${this._style.value}`,
            borderWidth: `0px`,
            borderColor: `${this._color}`
        }
    }
  

}