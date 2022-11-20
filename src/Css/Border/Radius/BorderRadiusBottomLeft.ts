import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import BaseBorderRadiusCss from '../BaseBorderRadiusCss';
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import Unit from '../../../Unit/Unit';
import UnitSize from "~/src/Unit/UnitSize";
import Pixel from '../../../Unit/Size/Pixel';
import CssWithoutValue from '../../../Errors/CssWithoutValue';
import CssTwoProperty from '../../CssTwoProperty';

export default class BorderRadiusBottomLeft extends CssTwoProperty implements CssDoubleValue, BaseBorderRadiusCss
{
    public static PROP_NAME = 'border-bottom-left-radius'

    public getName(): string {
        return BorderRadiusBottomLeft.PROP_NAME
    }


}