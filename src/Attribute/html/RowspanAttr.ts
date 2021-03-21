import HtmlAttr from "../HtmlAttr"

export default class RowspanAttr extends HtmlAttr
{
    public static NAME = 'rowspan'

    constructor(value)
    {
        super(RowspanAttr.NAME, value, null)
    }

}