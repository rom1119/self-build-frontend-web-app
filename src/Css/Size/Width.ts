import CssSimple from "../CssSimple";
import ContentSizeCss from "./ContentSizeCss";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssAuto from "../CssAuto";

export default class Width extends ContentSizeCss implements CssPropertyLimitable, CssAuto
{
    
    public static PROP_NAME = 'width'
    public getName(): string {
        return Width.PROP_NAME
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