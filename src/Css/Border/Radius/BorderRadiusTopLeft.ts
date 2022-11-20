import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssWithTwoValues from '~/src/Css/MultiValuesCss/CssWithTwoValues';
import CssTwoProperty from '../../CssTwoProperty';

export default class BorderRadiusTopLeft extends CssTwoProperty implements CssWithTwoValues, BaseBorderRadiusCss {
    public static PROP_NAME = 'border-top-left-radius'
    public getName(): string {
        return BorderRadiusTopLeft.PROP_NAME
    }


}