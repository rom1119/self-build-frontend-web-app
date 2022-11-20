import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import CssTwoProperty from '../../CssTwoProperty';

export default class BorderRadiusTopLeft extends CssTwoProperty implements CssDoubleValue , BaseBorderRadiusCss
{
    public static PROP_NAME = 'border-top-left-radius'
    public getName(): string {
        return BorderRadiusTopLeft.PROP_NAME
    }


}