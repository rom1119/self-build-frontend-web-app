import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexGrow extends CssSimple 
{
    public static PROP_NAME = 'flex-grow'
    public getName(): string {
        return FlexGrow.PROP_NAME
    }
   

}