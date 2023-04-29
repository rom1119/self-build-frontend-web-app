import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Widows extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'widows'
    public getName(): string {
        return Widows.PROP_NAME
    }
    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static UNSET = 'unset'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(Widows.INHERIT)
        props.push(Widows.INITIAL)
        props.push(Widows.REVERT)
        props.push(Widows.UNSET)

        return props
    }
    getAccessableProperty(): any[] {
        return Widows.getAccessableProperty()
    }


}