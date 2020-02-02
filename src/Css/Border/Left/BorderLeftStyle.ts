import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderLeftStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-left-style'
    public getName(): string {
        return BorderLeftStyle.PROP_NAME
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
        props.push(BorderLeftStyle.NONE)
        props.push(BorderLeftStyle.DASHED)
        props.push(BorderLeftStyle.DOTTED)
        props.push(BorderLeftStyle.SOLID)
        props.push(BorderLeftStyle.DOUBLE)
        props.push(BorderLeftStyle.HIDDEN)
        props.push(BorderLeftStyle.GROOVE)
        props.push(BorderLeftStyle.RIDGE)
        props.push(BorderLeftStyle.INSET)
        props.push(BorderLeftStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderLeftStyle.getAccessableProperty()
    }


}