import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import TextDecoration from "./TextDecoration";

export default class TextDecorationColor extends CssSimple
{
    public static PROP_NAME = 'text-decoration-color'
    public getName(): string {
        return TextDecorationColor.PROP_NAME
    }

}