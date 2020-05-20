import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexBasis extends CssSimple 
{
    public static PROP_NAME = 'flex-basis'
    public getName(): string {
        return FlexBasis.PROP_NAME
    }
   

}