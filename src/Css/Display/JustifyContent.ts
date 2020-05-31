import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class JustifyContent extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'justify-content'
    public getName(): string {
        return JustifyContent.PROP_NAME
    }
    public static START = 'start'
    public static END = 'end'
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static CENTER = 'center'
    public static FLEX_START = 'flex-start'
    public static FLEX_END = 'flex-end'
    public static SPACE_BETWEEN = 'space-between'
    public static SPACE_AROUND = 'space-around'
    public static SPACE_EVENLY = 'space-evenly'
    public static STRETCH = 'stretch'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(JustifyContent.START)
        props.push(JustifyContent.END)
        props.push(JustifyContent.CENTER)
        props.push(JustifyContent.SPACE_BETWEEN)
        props.push(JustifyContent.SPACE_AROUND)
        props.push(JustifyContent.SPACE_EVENLY)
        props.push(JustifyContent.LEFT)
        props.push(JustifyContent.RIGHT)
        props.push(JustifyContent.STRETCH)
        props.push(JustifyContent.FLEX_START)
        props.push(JustifyContent.FLEX_END)



        return props
    }
    getAccessableProperty(): any[] {
        return JustifyContent.getAccessableProperty()
    }


}