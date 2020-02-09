import HtmlTag from "../Layout/HtmlTag";

export default class StyleCss
{
    private _key
    private _val

    constructor(key: string, val: string)
    {
        this._key = key
        this._val = val
    }


    getKey(): string
    {
        return this._key
    }

    getValue(): string
    {
        return this._val

    }


}