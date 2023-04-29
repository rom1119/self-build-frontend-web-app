import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';

export default class TextIndent extends CssThreeAxis
{
    public static PROP_NAME = 'text-indent'
    public getName(): string {
        return TextIndent.PROP_NAME
    }

}