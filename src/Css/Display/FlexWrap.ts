import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexWrap extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'flex-wrap'
    public getName(): string {
        return FlexWrap.PROP_NAME
    }
    public static NO_WRAP = 'nowrap'
    public static WRAP = 'wrap'
    public static WRAP_REVERSE = 'wrap-reverse'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(FlexWrap.NO_WRAP)
        props.push(FlexWrap.WRAP)
        props.push(FlexWrap.WRAP_REVERSE)

        return props
    }
    getAccessableProperty(): any[] {
        return FlexWrap.getAccessableProperty()
    }


}