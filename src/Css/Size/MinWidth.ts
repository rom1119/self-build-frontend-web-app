import CssSimple from "../CssSimple";
import ContentSizeCss from "./ContentSizeCss";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssAuto from "../CssAuto";

export default class MinWidth extends ContentSizeCss implements CssAuto
{
    public static PROP_NAME = 'min-width'
    public getName(): string {
        return MinWidth.PROP_NAME
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