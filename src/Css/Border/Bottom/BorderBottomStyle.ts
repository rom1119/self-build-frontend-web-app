import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderBottomStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-bottom-style'
    public getName(): string {
        return BorderBottomStyle.PROP_NAME
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
        props.push(BorderBottomStyle.NONE)
        props.push(BorderBottomStyle.DASHED)
        props.push(BorderBottomStyle.DOTTED)
        props.push(BorderBottomStyle.SOLID)
        props.push(BorderBottomStyle.DOUBLE)
        props.push(BorderBottomStyle.HIDDEN)
        props.push(BorderBottomStyle.GROOVE)
        props.push(BorderBottomStyle.RIDGE)
        props.push(BorderBottomStyle.INSET)
        props.push(BorderBottomStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderBottomStyle.getAccessableProperty()
    }


}