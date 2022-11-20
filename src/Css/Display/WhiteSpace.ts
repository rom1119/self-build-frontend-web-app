import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class WhiteSpace extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'white-space'
    public getName(): string {
        return WhiteSpace.PROP_NAME
    }
    public static NORMAL = 'normal'
    public static NOWRAP = 'nowrap'
    public static PRE = 'pre'
    public static PRE_WRAP = 'pre-wrap'
    public static PRE_LINE = 'pre-line'
    public static BREAK_SPACES = 'break-spaces'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(WhiteSpace.NORMAL)
        props.push(WhiteSpace.NOWRAP)
        props.push(WhiteSpace.PRE)
        props.push(WhiteSpace.PRE_WRAP)
        props.push(WhiteSpace.PRE_LINE)
        props.push(WhiteSpace.BREAK_SPACES)

        return props
    }
    getAccessableProperty(): any[] {
        return WhiteSpace.getAccessableProperty()
    }


}