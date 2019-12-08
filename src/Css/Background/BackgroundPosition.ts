import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundPosition extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-position'
    public getName(): string {
        return BackgroundPosition.PROP_NAME
    }
    public static UNSET = 'unset'
    public static BOTTOM = 'bottom'
    public static CENTER = 'center'
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static TOP = 'top'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundPosition.UNSET)
        props.push(BackgroundPosition.BOTTOM)
        props.push(BackgroundPosition.CENTER)
        props.push(BackgroundPosition.LEFT)
        props.push(BackgroundPosition.RIGHT)
        props.push(BackgroundPosition.TOP)
   

        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundPosition.getAccessableProperty()
    }


}