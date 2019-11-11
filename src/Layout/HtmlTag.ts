import LayoutEl from "../LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';
import UnitColor from "../Unit/UnitColor";
import Named from "../Unit/Color/Named";
import SizeActivable from "../SizeActivable";
import BorderModel from "./Border/BorderModel";

export default abstract class HtmlTag extends LayoutEl implements CssList, SizeActivable
{
    
    protected _tag = 'h1'
    protected _htmlEl
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected isActive = false
    protected borderActive = false
    protected paddingActive = false
    protected marginActive = false
    protected contentActive = false
    protected _borders: BorderModel[] = []
    protected _borderBottom: BorderModel
    protected _borderTop: BorderModel
    protected _borderLeft: BorderModel
    protected _borderRight: BorderModel
    protected sizeActive = false
    protected _isEdited = false
    protected _width = 100
    protected _height = 100
    protected initialBackgroundColor = 'red'
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

    protected abstract getTagName(): string

    public changeAsActiveSize()
    {
        this._backgroundColor = 'aqua'
    }
    
    public changeAsDeactiveSize()
    {
        this._backgroundColor = this.initialBackgroundColor
    }

    get cssList() : any
    {
        return {
            width: `${this._width}${this.sizeUnitCurrent.value}`,
            height: `${this._height}${this.sizeUnitCurrent.value}`,
            backgroundColor: `${this._backgroundColor}${this._colorUnit.value}`,
        }
    }

    // get cssContentSizeList() : any
    // {
    //     return {
    //         width: `${this._width}${this.sizeUnitCurrent.value}`,
    //         height: `${this._height}${this.sizeUnitCurrent.value}`,
    //     }
    // }

    get cssBoxList() : any
    {
        if (this.sizeUnitCurrent instanceof Percent) {
            return {
                width: `${this._width}${this.sizeUnitCurrent.value}`,
                height: `${this._height}${this.sizeUnitCurrent.value}`,
            }
        }

        let borderLeftWidth = this._borderLeft.borderWidth
        let borderRightWidth = this._borderRight.borderWidth
        let borderTopWidth = this._borderTop.borderWidth
        let borderBottomWidth = this._borderBottom.borderWidth
        let boxWidth = borderLeftWidth + borderRightWidth + this._width
        let boxHeight = borderTopWidth + borderBottomWidth + this._height

        return {
            width: `${boxWidth}${this.sizeUnitCurrent.value}`,
            height: `${boxHeight}${this.sizeUnitCurrent.value}`,
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

    get borders() : BorderModel[]
    {
        return this._borders
    }
    
    set borders(arg: BorderModel[])
    {
        this._borders = arg
    }

    get borderLeft() : BorderModel
    {
        return this._borderLeft
    }
    
    set borderLeft(arg: BorderModel)
    {
        this._borderLeft = arg
    }

    get borderRight() : BorderModel
    {
        return this._borderRight
    }
    
    set borderRight(arg: BorderModel)
    {
        this._borderRight = arg
    }

    get borderBottom() : BorderModel
    {
        return this._borderBottom
    }
    
    set borderBottom(arg: BorderModel)
    {
        this._borderBottom = arg
    }

    get borderTop() : BorderModel
    {
        return this._borderTop
    }
    
    set borderTop(arg: BorderModel)
    {
        this._borderTop = arg
    }



}