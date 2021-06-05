import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class OpacityCss extends CssSimple 
{
    public static PROP_NAME = 'opacity'
    public getName(): string {
        return OpacityCss.PROP_NAME
    }
   

}