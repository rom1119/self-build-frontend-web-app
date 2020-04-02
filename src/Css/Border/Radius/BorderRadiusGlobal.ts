import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';

export default class BorderRadiusGlobal extends BaseBorderRadiusCss 
{
    public static PROP_NAME = 'border-radius'
    public getName(): string {
        return BorderRadiusGlobal.PROP_NAME
    }


}