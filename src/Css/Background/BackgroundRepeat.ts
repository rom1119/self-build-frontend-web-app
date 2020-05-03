import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundRepeat extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-repeat'
    public getName(): string {
        return BackgroundRepeat.PROP_NAME
    }
    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static NO_REPEAT = 'no-repeat'
    public static REPEAT = 'repeat'
    public static REPEAT_X = 'repeat-x'
    public static REPEAT_Y = 'repeat-y'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundRepeat.INITIAL)
        props.push(BackgroundRepeat.INHERIT)
        props.push(BackgroundRepeat.NO_REPEAT)
        props.push(BackgroundRepeat.REPEAT)
        props.push(BackgroundRepeat.REPEAT_X)
        props.push(BackgroundRepeat.REPEAT_Y)

        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundRepeat.getAccessableProperty()
    }


}