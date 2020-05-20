import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class JustifyContent extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'justify-content'
    public getName(): string {
        return JustifyContent.PROP_NAME
    }
    public static START = 'start'
    public static CENTER = 'center'
    public static SPACE_BETWEEN = 'space-between'
    public static SPACE_AROUND = 'space-around'
    public static SPACE_EVENLY = 'space-evenly'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(JustifyContent.START)
        props.push(JustifyContent.CENTER)
        props.push(JustifyContent.SPACE_BETWEEN)
        props.push(JustifyContent.SPACE_AROUND)
        props.push(JustifyContent.SPACE_EVENLY)



        return props
    }
    getAccessableProperty(): any[] {
        return JustifyContent.getAccessableProperty()
    }


}