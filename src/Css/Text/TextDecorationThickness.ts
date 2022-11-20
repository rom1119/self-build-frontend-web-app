import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import TextDecoration from "./TextDecoration";

export default class TextDecorationThickness extends CssSimple
{
    public static PROP_NAME = 'text-decoration-thickness'
    public getName(): string {
        return TextDecorationThickness.PROP_NAME
    }

}