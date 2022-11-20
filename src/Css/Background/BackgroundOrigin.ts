import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundOrigin extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-origin'
    public getName(): string {
        return BackgroundOrigin.PROP_NAME
    }
    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static UNSET = 'unset'
    public static BORDER_BOX = 'border-box'
    public static PADDING_BOX = 'padding-box'
    public static CONTENT_BOX = 'content-box'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundOrigin.INITIAL)
        props.push(BackgroundOrigin.INHERIT)
        props.push(BackgroundOrigin.UNSET)
        props.push(BackgroundOrigin.BORDER_BOX)
        props.push(BackgroundOrigin.PADDING_BOX)
        props.push(BackgroundOrigin.CONTENT_BOX)


        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundOrigin.getAccessableProperty()
    }


}