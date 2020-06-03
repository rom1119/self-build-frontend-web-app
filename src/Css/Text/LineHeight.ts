import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class LineHeight extends CssSimple
{
    public static PROP_NAME = 'line-height'
    public getName(): string {
        return LineHeight.PROP_NAME
    }
    
}