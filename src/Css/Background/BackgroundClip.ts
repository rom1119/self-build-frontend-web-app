import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundClip extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-clip'
    public getName(): string {
        return BackgroundClip.PROP_NAME
    }
    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static UNSET = 'unset'
    public static BORDER_BOX = 'border-box'
    public static PADDING_BOX = 'padding-box'
    public static CONTENT_BOX = 'content-box'
    public static TEXT = 'text'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundClip.INITIAL)
        props.push(BackgroundClip.INHERIT)
        props.push(BackgroundClip.UNSET)
        props.push(BackgroundClip.BORDER_BOX)
        props.push(BackgroundClip.PADDING_BOX)
        props.push(BackgroundClip.CONTENT_BOX)
        props.push(BackgroundClip.TEXT)


        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundClip.getAccessableProperty()
    }


}