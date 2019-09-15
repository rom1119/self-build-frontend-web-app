import LayoutEl from "./LayoutEl";
import Unit from "./Unit";

export default abstract class HtmlTag extends LayoutEl
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
    protected _borderColor = this.initialBorderColor

    protected _styleList: any = {
        width: this._width,
        height: this._height,
    }

    protected sizeUnitCurrent = Unit.PERCENT
        
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


    get styleList() : any
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
    
    

    public onMouseMove(e) 
    {
        console.log(e.target)
    }

    public onDoubleClick(e) 
    {
        this._isEdited = true
    }

}