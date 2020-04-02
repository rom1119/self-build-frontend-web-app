import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderBottomColor extends CssSimple 
{
    public static PROP_NAME = 'border-bottom-color'
    public getName(): string {
        return BorderBottomColor.PROP_NAME
    }
}