import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-style'
    public getName(): string {
        return BorderStyle.PROP_NAME
    }
    public static NONE = 'none'
    public static DASHED = 'dashed'
    public static DOTTED = 'dotted'
    public static SOLID = 'solid'
    public static DOUBLE = 'double'
    public static HIDDEN = 'hidden'
    public static GROOVE = 'groove'
    public static RIDGE = 'ridge'
    public static INSET = 'inset'
    public static OUTSET = 'outset'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(BorderStyle.NONE)
        props.push(BorderStyle.DASHED)
        props.push(BorderStyle.DOTTED)
        props.push(BorderStyle.SOLID)
        props.push(BorderStyle.DOUBLE)
        props.push(BorderStyle.HIDDEN)
        props.push(BorderStyle.GROOVE)
        props.push(BorderStyle.RIDGE)
        props.push(BorderStyle.INSET)
        props.push(BorderStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderStyle.getAccessableProperty()
    }


}