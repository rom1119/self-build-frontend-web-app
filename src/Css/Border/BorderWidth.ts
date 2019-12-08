import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderWidth extends CssSimple 
{
    public static PROP_NAME = 'border-width'
    public getName(): string {
        return BorderWidth.PROP_NAME
    }
}