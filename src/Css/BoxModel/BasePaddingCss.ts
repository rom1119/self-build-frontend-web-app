import CssDirectionComposite from "../CssDirectionComposite"
import CssAuto from "../CssAuto"


export default class BasePaddingCss extends CssDirectionComposite implements CssAuto
{
    protected _auto = false
    public static PROP_NAME = 'padding'
    public getName(): string {
        return BasePaddingCss.PROP_NAME
    }

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

}