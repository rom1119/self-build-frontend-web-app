
export default class HtmlAttr
{
    protected _key: string
    protected _value: string

    constructor(key, value)
    {
        this._key = key
        this._value = value
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
    
    public clearValue()
    {
        this._value = ''

    }
}