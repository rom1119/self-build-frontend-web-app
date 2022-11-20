import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';

export default class TransitionDuration extends BasePropertyCss
{
    public static PROP_NAME = 'transition-duration'
    public getName(): string {
        return TransitionDuration.PROP_NAME
    }

}