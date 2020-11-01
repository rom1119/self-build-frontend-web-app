import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BorderCollapse extends CssSimple implements CssPropertyLimitable
{
    public injectable = false


    public static PROP_NAME = 'border-collapse'
    public getName(): string {
        return BorderCollapse.PROP_NAME
    }

    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static SEPARATE = 'separate'
    public static COLLAPSE = 'collapse'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(BorderCollapse.INITIAL)
        props.push(BorderCollapse.INHERIT)
        props.push(BorderCollapse.SEPARATE)
        props.push(BorderCollapse.COLLAPSE)


        return props
    }
    getAccessableProperty(): any[] {
        return BorderCollapse.getAccessableProperty()
    }
}