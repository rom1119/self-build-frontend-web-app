import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';

export default class BackgroundPositionY extends BasePropertyCss
{
    public static PROP_NAME = 'background-position-y'
    public getName(): string {
        return BackgroundPositionY.PROP_NAME
    }

}