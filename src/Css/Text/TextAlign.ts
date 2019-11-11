import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class TextAlign extends CssSimple implements CssPropertyLimitable
{
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static CENTER = 'center'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(TextAlign.LEFT)
        props.push(TextAlign.CENTER)
        props.push(TextAlign.RIGHT)
        return props
    }
    getAccessableProperty(): any[] {
        return TextAlign.getAccessableProperty()
    }
    protected name = 'text-align'


}