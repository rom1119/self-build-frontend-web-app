import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class MaxHeight extends CssSimple 
{
    public static PROP_NAME = 'max-height'
    public getName(): string {
        return MaxHeight.PROP_NAME
    }
}