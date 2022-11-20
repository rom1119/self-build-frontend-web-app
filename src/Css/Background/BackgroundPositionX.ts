import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';

export default class BackgroundPositionX extends BasePropertyCss
{
    public static PROP_NAME = 'background-position-x'
    public getName(): string {
        return BackgroundPositionX.PROP_NAME
    }

}