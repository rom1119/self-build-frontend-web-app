import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";
import UnitSize from '../../../Unit/UnitSize';
import UnitColor from '../../../Unit/UnitColor';
import CssComposite from '../../CssComposite';
import BaseBorderCss from "../BaseBorderCss";

export default class BorderLeftCss extends BaseBorderCss
{
    public static PROP_NAME = 'border-left'
    public getName(): string {
        return BorderLeftCss.PROP_NAME
    }

}