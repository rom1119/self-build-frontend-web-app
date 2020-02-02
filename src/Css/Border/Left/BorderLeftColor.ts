import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderLeftColor extends CssSimple 
{
    public static PROP_NAME = 'border-left-color'
    public getName(): string {
        return BorderLeftColor.PROP_NAME
    }
}