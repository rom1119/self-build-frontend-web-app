import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssWithTwoValues from '~/src/Css/MultiValuesCss/CssWithTwoValues';
import CssTwoProperty from '../../CssTwoProperty';

export default class BorderRadiusBottomRight extends CssTwoProperty implements CssWithTwoValues, BaseBorderRadiusCss {
    public static PROP_NAME = 'border-bottom-right-radius'
    public getName(): string {
        return BorderRadiusBottomRight.PROP_NAME
    }


}