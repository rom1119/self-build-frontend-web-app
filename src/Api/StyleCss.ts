import HtmlTag from "../Layout/HtmlTag";

export default class StyleCss
{
    id
    private _key
    private _val
    private _unitName

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
    
    getUnitName(): string
    {
        return this._unitName

    }


}