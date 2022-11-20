import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';

export default class TransitionDelay extends BasePropertyCss
{
    public static PROP_NAME = 'transition-delay'
    public getName(): string {
        return TransitionDelay.PROP_NAME
    }

}