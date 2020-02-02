import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderGlobalStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-style'
    public getName(): string {
        return BorderGlobalStyle.PROP_NAME
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
        props.push(BorderGlobalStyle.NONE)
        props.push(BorderGlobalStyle.DASHED)
        props.push(BorderGlobalStyle.DOTTED)
        props.push(BorderGlobalStyle.SOLID)
        props.push(BorderGlobalStyle.DOUBLE)
        props.push(BorderGlobalStyle.HIDDEN)
        props.push(BorderGlobalStyle.GROOVE)
        props.push(BorderGlobalStyle.RIDGE)
        props.push(BorderGlobalStyle.INSET)
        props.push(BorderGlobalStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderGlobalStyle.getAccessableProperty()
    }


}