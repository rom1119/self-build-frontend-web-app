import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexOrder extends CssSimple 
{
    public static PROP_NAME = 'order'
    public getName(): string {
        return FlexOrder.PROP_NAME
    }
   

}