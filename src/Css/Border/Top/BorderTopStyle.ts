import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderTopStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-top-style'
    public getName(): string {
        return BorderTopStyle.PROP_NAME
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
        props.push(BorderTopStyle.NONE)
        props.push(BorderTopStyle.DASHED)
        props.push(BorderTopStyle.DOTTED)
        props.push(BorderTopStyle.SOLID)
        props.push(BorderTopStyle.DOUBLE)
        props.push(BorderTopStyle.HIDDEN)
        props.push(BorderTopStyle.GROOVE)
        props.push(BorderTopStyle.RIDGE)
        props.push(BorderTopStyle.INSET)
        props.push(BorderTopStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderTopStyle.getAccessableProperty()
    }


}