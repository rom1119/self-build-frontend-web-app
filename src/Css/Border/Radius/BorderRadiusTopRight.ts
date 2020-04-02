import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';

export default class BorderRadiusTopRight extends BaseBorderRadiusCss 
{
    public static PROP_NAME = 'border-top-right-radius'
    public getName(): string {
        return BorderRadiusTopRight.PROP_NAME
    }


}