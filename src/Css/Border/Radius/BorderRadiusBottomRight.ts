import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import CssTwoProperty from '../../CssTwoProperty';

export default class BorderRadiusBottomRight extends CssTwoProperty implements CssDoubleValue , BaseBorderRadiusCss
{
    public static PROP_NAME = 'border-bottom-right-radius'
    public getName(): string {
        return BorderRadiusBottomRight.PROP_NAME
    }


}