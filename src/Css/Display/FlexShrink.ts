import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexShrink extends CssSimple 
{
    public static PROP_NAME = 'flex-shrink'
    public getName(): string {
        return FlexShrink.PROP_NAME
    }
   

}