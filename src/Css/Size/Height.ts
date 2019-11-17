import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Height extends CssSimple 
{
    public static PROP_NAME = 'height'
    public getName(): string {
        return Height.PROP_NAME
    }
}