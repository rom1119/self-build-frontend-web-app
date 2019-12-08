import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderColor extends CssSimple 
{
    public static PROP_NAME = 'border-color'
    public getName(): string {
        return BorderColor.PROP_NAME
    }
}