import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Position extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'position'
    public getName(): string {
        return Position.PROP_NAME
    }
    public static STATIC = 'static'
    public static ABSOLUTE = 'absolute'
    public static RELATIVE = 'relative'
    public static FIXED = 'fixed'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Position.STATIC)
        props.push(Position.ABSOLUTE)
        props.push(Position.RELATIVE)
        props.push(Position.FIXED)

        return props
    }
    getAccessableProperty(): any[] {
        return Position.getAccessableProperty()
    }


}