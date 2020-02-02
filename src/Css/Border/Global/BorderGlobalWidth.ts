import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderGlobalWidth extends CssSimple 
{
    public static PROP_NAME = 'border-width'
    public getName(): string {
        return BorderGlobalWidth.PROP_NAME
    }
}