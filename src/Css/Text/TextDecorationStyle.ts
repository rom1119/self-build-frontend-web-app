import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import TextDecoration from "./TextDecoration";

export default class TextDecorationStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'text-decoration-style'
    public getName(): string {
        return TextDecorationStyle.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(TextDecoration.AUTO)
        props.push(TextDecoration.NONE)
        props.push(TextDecoration.DASHED)
        props.push(TextDecoration.DOUBLE)
        props.push(TextDecoration.DOTTED)
        props.push(TextDecoration.SOLID)
        props.push(TextDecoration.WAVY)


        return props
    }
    getAccessableProperty(): any[] {
        return TextDecorationStyle.getAccessableProperty()
    }


}