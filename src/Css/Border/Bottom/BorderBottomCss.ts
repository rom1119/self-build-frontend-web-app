import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import UnitSize from '../../../Unit/UnitSize';
import UnitColor from '../../../Unit/UnitColor';
import CssComposite from '../../CssComposite';
import BaseBorderCss from "../BaseBorderCss";

export default class BorderBottomCss extends BaseBorderCss
{
    public static PROP_NAME = 'border-bottom'
    public getName(): string {
        return BorderBottomCss.PROP_NAME
    }

}