import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import ContentSizeCss from "./ContentSizeCss";
import CssAuto from "../CssAuto";

export default class MinHeight extends ContentSizeCss implements CssAuto
{
    public static PROP_NAME = 'min-height'
    public getName(): string {
        return MinHeight.PROP_NAME
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