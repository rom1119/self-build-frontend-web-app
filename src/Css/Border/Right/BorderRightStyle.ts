import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderRightStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-right-style'
    public getName(): string {
        return BorderRightStyle.PROP_NAME
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
        props.push(BorderRightStyle.NONE)
        props.push(BorderRightStyle.DASHED)
        props.push(BorderRightStyle.DOTTED)
        props.push(BorderRightStyle.SOLID)
        props.push(BorderRightStyle.DOUBLE)
        props.push(BorderRightStyle.HIDDEN)
        props.push(BorderRightStyle.GROOVE)
        props.push(BorderRightStyle.RIDGE)
        props.push(BorderRightStyle.INSET)
        props.push(BorderRightStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderRightStyle.getAccessableProperty()
    }


}