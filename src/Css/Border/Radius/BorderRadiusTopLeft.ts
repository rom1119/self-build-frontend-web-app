import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';

export default class BorderRadiusTopLeft extends BaseBorderRadiusCss 
{
    public static PROP_NAME = 'border-top-left-radius'
    public getName(): string {
        return BorderRadiusTopLeft.PROP_NAME
    }


}