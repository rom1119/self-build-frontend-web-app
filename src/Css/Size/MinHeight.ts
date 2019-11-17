import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class MinHeight extends CssSimple 
{
    public static PROP_NAME = 'min-height'
    public getName(): string {
        return MinHeight.PROP_NAME
    }
}