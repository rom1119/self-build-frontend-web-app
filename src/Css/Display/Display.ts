import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Display extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'display'
    public getName(): string {
        return Display.PROP_NAME
    }
    public static NONE = 'none'
    public static BLOCK = 'block'
    public static INLINE_BLOCK = 'inline-block'
    public static FLEX = 'flex'
    public static INLINE_FLEX = 'inline-flex'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Display.NONE)
        props.push(Display.BLOCK)
        props.push(Display.INLINE_BLOCK)
        props.push(Display.FLEX)
        props.push(Display.INLINE_FLEX)


        return props
    }
    getAccessableProperty(): any[] {
        return Display.getAccessableProperty()
    }


}