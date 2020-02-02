import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderTopColor extends CssSimple 
{
    public static PROP_NAME = 'border-top-color'
    public getName(): string {
        return BorderTopColor.PROP_NAME
    }
}