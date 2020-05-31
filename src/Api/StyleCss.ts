import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";

export default class StyleCss
{
    id
    private _key
    private _val
    private _unitName
    private _valueSecond
    private  _unitNameSecond
    private _valueThird
    private _unitNameThird
    private _resourcePath
    private _resourceUrl
    private _multipleValue = false
    private _values: StyleCssValue[]

    constructor(key: string, val: any, unitName: string)
    {
        this._key = key
        this._val = val
        this._unitName = unitName
    }

    getKey(): string
    {
        return this._key
    }

    getValue(): string
    {
        return this._val

    }

    isMultiple(): boolean{
        return this._multipleValue === true
    }
    
    setAsMultiple(){
        this._multipleValue = true
    }
    
    getValues(): StyleCssValue[]
    {
        return this._values

    }
    
    getUnitName(): string
    {
        return this._unitName

    }

    public setValue(val)
    {
        this._val = val
    }
    
    public setValues(val)
    {
        this._values = val
    }
    
    public setUnitName(val)
    {
        this._unitName = val
    }

    public setValueSecond(val)
    {
        this._valueSecond = val
    }
    
    public setUnitNameSecond(val)
    {
        this._unitNameSecond = val
    }

    public setValueThird(val)
    {
        this._valueThird = val
    }
    
    public setUnitNameThird(val)
    {
        this._unitNameThird = val
    }
    

    getValueSecond(): string
    {
        return this._valueSecond

    }
    
    getUnitNameSecond(): string
    {
        return this._unitNameSecond

    }

    getValueThird(): string
    {
        return this._valueThird
    }
    
    getUnitNameThird(): string
    {
        return this._unitNameThird
    }

    public setResourcePath(val)
    {
        this._resourcePath = val
    }
    

    public getResourcePath(): string
    {
        return this._resourcePath

    }
    
    public setResourceUrl(val)
    {
        this._resourceUrl = val
    }
    

    public getResourceUrl(): string
    {
        return this._resourceUrl

    }


}