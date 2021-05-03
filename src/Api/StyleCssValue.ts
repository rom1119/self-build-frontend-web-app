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
    private _valueSixth
    private _unitNameSixth

    private _valueSeventh
    private _unitNameSeventh

    private _valueEighth
    private _unitNameEighth
    
    private _valueNinth
    private _unitNameNinth
    private _resourcePath
    private _inset
    private _specialValGradient

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

    public setSpecialValGradient(val)
    {
        this._specialValGradient = val
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

    public setValueSixth(val)
    {
        this._valueSixth = val
    }
    
    public setValueSeventh(val)
    {
        this._valueSeventh = val
    }
    
    public setValueEighth(val)
    {
        this._valueEighth = val
    }
        public setValueNinth(val)
    {
        this._valueNinth = val
    }

    public setUnitNameFifth(val)
    {
        this._unitNameFifth= val
    }

    public setUnitNameSixth(val)
    {
        this._unitNameSixth= val
    }
    
    public setUnitNameSeventh(val)
    {
        this._unitNameSeventh= val
    }
    
    public setUnitNameEighth(val)
    {
        this._unitNameEighth= val
    }
    
    public setUnitNameNinth(val)
    {
        this._unitNameNinth= val
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

    getValueSixth(): string
    {
        return this._valueSixth
    }
    
    getValueSeventh(): string
    {
        return this._valueSeventh
    }
    
    getValueEighth(): string
    {
        return this._valueEighth
    }

    getValueNinth(): string
    {
        return this._valueNinth
    }

    getUnitNameFifth(): string
    {
        return this._unitNameFifth
    }

    getUnitNameSixth(): string
    {
        return this._unitNameSixth
    }
    
    getUnitNameSeventh(): string
    {
        return this._unitNameSeventh
    }
    
    getUnitNameEighth(): string
    {
        return this._unitNameEighth
    }
    
    getUnitNameNinth(): string
    {
        return this._unitNameNinth
    }

    public setResourcePath(val)
    {
        this._resourcePath = val
    }


    public getResourcePath(): string
    {
        return this._resourcePath

    }

    public getInset(): boolean
    {
        return this._inset
    }

    public getSpecialValGradient(): boolean
    {
        return this._specialValGradient

    }




}
