import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';

export default class TextDecoration extends CssThreeAxis implements CssPropertyLimitable
{
    public static PROP_NAME = 'text-decoration'
    public getName(): string {
        return TextDecoration.PROP_NAME
    }
    public static AUTO = 'auto'
    public static NONE = 'none'
    public static DASHED = 'dashed'
    public static DOUBLE = 'double'
    public static DOTTED = 'dotted'
    public static BLINK = 'blink'
    public static SOLID = 'solid'
    public static WAVY = 'wavy'
    public static LINE_THROUGHT = 'line-through'
    public static UNDERLINE = 'underline'
    public static OVERLINE = 'overline'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(TextDecoration.AUTO)
        props.push(TextDecoration.NONE)
        props.push(TextDecoration.DASHED)
        props.push(TextDecoration.DOUBLE)
        props.push(TextDecoration.DOTTED)
        props.push(TextDecoration.BLINK)
        props.push(TextDecoration.SOLID)
        props.push(TextDecoration.WAVY)
        props.push(TextDecoration.LINE_THROUGHT)
        props.push(TextDecoration.UNDERLINE)
        props.push(TextDecoration.OVERLINE)

        return props
    }
    getAccessableProperty(): any[] {
        return TextDecoration.getAccessableProperty()
    }


}