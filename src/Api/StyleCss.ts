import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";

export default class StyleCss
{
    id
    mediaQueryId
    private _key
    private _val
    private _unitName
    private _valueSecond
    private  _unitNameSecond
    private _valueThird
    private _unitNameThird
    
    private _valueFourth
    private _unitNameFourth
    
    private _valueFifth
    private _unitNameFifth
    private _resourcePath
    private _resourceUrl
    private _multipleValue = false
    private _values: StyleCssValue[] = []
    private _children: StyleCss[] = []

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
    
    public setValueFourth(val)
    {
        this._valueFourth = val
    }

    public setUnitNameFourth(val)
    {
        this._unitNameFourth = val
    }
    
    public setValueFifth(val)
    {
        this._valueFifth = val
    }

    public setUnitNameFifth(val)
    {
        this._unitNameFifth = val
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

    getValueFourth(): string
    {
        return this._valueFourth
    }

    getUnitNameFourth(): string
    {
        return this._unitNameFourth
    }
    
    getValueFifth(): string
    {
        return this._valueFifth
    }

    getUnitNameFifth(): string
    {
        return this._unitNameFifth
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

    public getChildren(): StyleCss[]
    {
        return this._children
    }


}
