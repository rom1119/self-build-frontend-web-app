import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';

export default class BorderRadiusBottomRight extends BaseBorderRadiusCss 
{
    public static PROP_NAME = 'border-bottom-right-radius'
    public getName(): string {
        return BorderRadiusBottomRight.PROP_NAME
    }


}