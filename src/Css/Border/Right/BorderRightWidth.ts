import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderRightWidth extends CssSimple 
{
    public static PROP_NAME = 'border-right-width'
    public getName(): string {
        return BorderRightWidth.PROP_NAME
    }
}