import HtmlAttr from "../HtmlAttr"

export default class CustomAttr extends HtmlAttr
{
    public static NAME = 'custom-html-attr'
    public static DEFAULT_ATTR = 'class'

    constructor(key, value)
    {
        super(key, value)
    }

    setKey(arg: string)
    {
        this._key = arg
    }
}