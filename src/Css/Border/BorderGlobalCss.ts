import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import BorderCompositeCss from "./BaseBorderCss";

export default class BorderGlobalCss extends BorderCompositeCss
{
    public static PROP_NAME = 'border'
    public getName(): string {
        return BorderGlobalCss.PROP_NAME
    }

}