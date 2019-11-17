import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundColor extends CssSimple 
{
    public static PROP_NAME = 'background-color'
    public getName(): string {
        return BackgroundColor.PROP_NAME
    }
}