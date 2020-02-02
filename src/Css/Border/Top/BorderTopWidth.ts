import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderTopWidth extends CssSimple 
{
    public static PROP_NAME = 'border-top-width'
    public getName(): string {
        return BorderTopWidth.PROP_NAME
    }
}