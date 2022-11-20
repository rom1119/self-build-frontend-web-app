import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BreakInside extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'break-inside'
    public getName(): string {
        return BreakInside.PROP_NAME
    }
    public static AUTO = 'auto'
    public static AVOID = 'avoid'
    public static AVOID_PAGE = 'avoid-page'
    public static AVOID_COLUMN = 'avoid-column'
    public static AVOID_REGION = 'avoid-region'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BreakInside.AUTO)
        props.push(BreakInside.AVOID)
        props.push(BreakInside.AVOID_PAGE)
        props.push(BreakInside.AVOID_COLUMN)
        props.push(BreakInside.AVOID_REGION)
 




        return props
    }
    getAccessableProperty(): any[] {
        return BreakInside.getAccessableProperty()
    }


}