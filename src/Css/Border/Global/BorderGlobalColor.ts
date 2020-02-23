import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderGlobalColor extends CssSimple 
{
    public static PROP_NAME = 'border-color'
    public getName(): string {
        return BorderGlobalColor.PROP_NAME
    }
}