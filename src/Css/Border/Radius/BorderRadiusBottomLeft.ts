import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';

export default class BorderRadiusBottomLeft extends BaseBorderRadiusCss 
{
    public static PROP_NAME = 'border-bottom-left-radius'
    public getName(): string {
        return BorderRadiusBottomLeft.PROP_NAME
    }


}