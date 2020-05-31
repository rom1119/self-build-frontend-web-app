import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Float extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'float'
    public getName(): string {
        return Float.PROP_NAME
    }
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static NONE = 'none'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Float.LEFT)
        props.push(Float.RIGHT)
        props.push(Float.NONE)

        return props
    }
    getAccessableProperty(): any[] {
        return Float.getAccessableProperty()
    }


}