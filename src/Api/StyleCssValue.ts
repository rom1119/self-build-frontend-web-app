import HtmlTag from "../Layout/HtmlTag";

export default class StyleCssValue
{
    id
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
    private _inset

    constructor(val: any, unitName: string)
    {
        this._val = val
        this._unitName = unitName
    }



    getValue(): string
    {
        return this._val

    }
    
    getUnitName(): string
    {
        return this._unitName

    }

    public setValue(val)
    {
        this._val = val
    }
    
    public setInset(val)
    {
        this._inset = val
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
        this._unitNameFifth= val
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
    
    public getInset(): string
    {
        return this._inset

    }


}