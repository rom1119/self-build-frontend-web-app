import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class AlignItems extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'align-items'
    public getName(): string {
        return AlignItems.PROP_NAME
    }
    public static AUTO = 'auto'
    public static FLEX_START = 'flex-start'
    public static FLEX_END = 'flex-end'
    public static CENTER = 'center'
    public static BASELINE = 'baseline'
    public static STRETCH = 'stretch'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(AlignItems.AUTO)
        props.push(AlignItems.FLEX_START)
        props.push(AlignItems.FLEX_END)
        props.push(AlignItems.CENTER)
        props.push(AlignItems.BASELINE)
        props.push(AlignItems.STRETCH)



        return props
    }
    getAccessableProperty(): any[] {
        return AlignItems.getAccessableProperty()
    }


}