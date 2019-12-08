import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderBottomWidth extends CssSimple 
{
    public static PROP_NAME = 'border-bottom-width'
    public getName(): string {
        return BorderBottomWidth.PROP_NAME
    }
}