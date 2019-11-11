import BasePropertyCss from "./BasePropertyCss";

export default abstract class CssSimple extends BasePropertyCss
{

    constructor(val)
    {
        super()
        this.values.push(val)
    }
}