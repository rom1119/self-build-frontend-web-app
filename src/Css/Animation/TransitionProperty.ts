import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';

export default class TransitionProperty extends BasePropertyCss
{
    public static PROP_NAME = 'transition-property'
    public getName(): string {
        return TransitionProperty.PROP_NAME
    }

}