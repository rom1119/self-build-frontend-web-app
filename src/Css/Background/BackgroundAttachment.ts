import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundAttachment extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-attachment'
    public getName(): string {
        return BackgroundAttachment.PROP_NAME
    }
    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static LOCAL = 'local'
    public static FIXED = 'fixed'
    public static SCROLL = 'scroll'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundAttachment.INITIAL)
        props.push(BackgroundAttachment.INHERIT)
        props.push(BackgroundAttachment.LOCAL)
        props.push(BackgroundAttachment.FIXED)
        props.push(BackgroundAttachment.SCROLL)
   
        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundAttachment.getAccessableProperty()
    }


}