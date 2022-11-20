import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";

export default class TextDecorationLine extends CssTwoAxis implements CssPropertyLimitable
{
    public static PROP_NAME = 'text-decoration-line'
    public getName(): string {
        return TextDecorationLine.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(TextDecoration.AUTO)
        props.push(TextDecoration.NONE)
        props.push(TextDecoration.LINE_THROUGHT)
        props.push(TextDecoration.UNDERLINE)
        props.push(TextDecoration.OVERLINE)

        return props
    }
    getAccessableProperty(): any[] {
        return TextDecorationLine.getAccessableProperty()
    }


}