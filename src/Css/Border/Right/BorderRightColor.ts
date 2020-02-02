import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderRightColor extends CssSimple 
{
    public static PROP_NAME = 'border-right-color'
    public getName(): string {
        return BorderRightColor.PROP_NAME
    }
}