import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class ZIndex extends CssSimple 
{
    public static PROP_NAME = 'z-index'
    public getName(): string {
        return ZIndex.PROP_NAME
    }
   

}