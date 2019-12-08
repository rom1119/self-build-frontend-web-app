import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderLeftWidth extends CssSimple 
{
    public static PROP_NAME = 'border-left-width'
    public getName(): string {
        return BorderLeftWidth.PROP_NAME
    }
}