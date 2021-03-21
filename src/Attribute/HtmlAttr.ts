import HtmlAttrOwner from "../HtmlAttrOwner"

export default class HtmlAttr
{
    protected _key: string
    protected _value: string

    active = false
    protected _owner: HtmlAttrOwner

    constructor(key, value, owner)
    {
        this._key = key
        this._value = value
        this._owner = owner
    }

    get key(): string
    {
        return this._key
    }
    
    set value(arg: string)
    {
        this._value = arg
    }
    
    get value(): string
    {
        return this._value
    }
    
    public setValue(arg)
    {
        this._value = arg

    }
    
    public setOwner(arg)
    {
        this._owner = arg

    }
    
    public clearValue()
    {
        this._value = ''

    }
}