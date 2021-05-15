import HtmlAttr from "../HtmlAttr"

export default class ColspanAttr extends HtmlAttr
{
    public static NAME = 'colspan'

    constructor(value)
    {
        super(ColspanAttr.NAME, value, null)
    }

}