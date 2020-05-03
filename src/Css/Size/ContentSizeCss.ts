import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default abstract class ContentSizeCss extends CssSimple implements CssPropertyLimitable
{

    public static INITIAL = 'initial'
    public static INHERIT = 'inherit'
    public static AUTO = 'auto'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(ContentSizeCss.INITIAL)
        props.push(ContentSizeCss.INHERIT)
        props.push(ContentSizeCss.AUTO)


        return props
    }
    getAccessableProperty(): any[] {
        return ContentSizeCss.getAccessableProperty()
    }
}