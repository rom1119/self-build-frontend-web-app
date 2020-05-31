import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Clear extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'clear'
    public getName(): string {
        return Clear.PROP_NAME
    }
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static BOTH = 'both'
    public static NONE = 'none'
    public static INHERIT = 'inherit'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Clear.LEFT)
        props.push(Clear.RIGHT)
        props.push(Clear.BOTH)
        props.push(Clear.NONE)
        props.push(Clear.INHERIT)

        return props
    }
    getAccessableProperty(): any[] {
        return Clear.getAccessableProperty()
    }


}