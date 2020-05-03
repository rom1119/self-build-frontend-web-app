import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import ContentSizeCss from "./ContentSizeCss";
import CssAuto from "../CssAuto";

export default class Height extends ContentSizeCss implements CssAuto
{
    public static PROP_NAME = 'height'
    public getName(): string {
        return Height.PROP_NAME
    }

    protected _auto = false

    isAuto(): boolean {
        return this._auto === true
    }
    notAuto() {
        this._auto = false
    }

    auto() 
    {
        this._auto = true
    }


    public getValue(): string
    {
        if (this.isAuto()) {
            return 'auto'
        }

        return super.getValue()
    }
}