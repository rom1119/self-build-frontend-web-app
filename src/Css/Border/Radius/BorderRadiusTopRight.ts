import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssTwoProperty from '../../CssTwoProperty';
import CssDoubleValue from '~/src/Css/CssDoubleValue';

export default class BorderRadiusTopRight extends CssTwoProperty implements CssDoubleValue , BaseBorderRadiusCss
{
    public static PROP_NAME = 'border-top-right-radius'
    public getName(): string {
        return BorderRadiusTopRight.PROP_NAME
    }


}