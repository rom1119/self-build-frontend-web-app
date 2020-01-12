import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import BaseBorderCss from "./BaseBorderCss";

export default class BorderRightCss extends BaseBorderCss
{
    public static PROP_NAME = 'border-right'
    public getName(): string {
        return BorderRightCss.PROP_NAME
    }

}