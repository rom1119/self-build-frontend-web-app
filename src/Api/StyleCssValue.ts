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

    public setUnitNameFifth(val)
    {
        this._unitNameFifth= val
    }

    public setUnitNameSixth(val)
    {
        this._unitNameSixth= val
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

    getUnitNameFifth(): string
    {
        return this._unitNameFifth
    }

    getUnitNameSixth(): string
    {
        return this._unitNameSixth
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
