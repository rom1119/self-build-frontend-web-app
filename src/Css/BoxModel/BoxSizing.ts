import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BoxSizing extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'box-sizing'
    public getName(): string {
        return BoxSizing.PROP_NAME
    }
    public static CONTENT_BOX = 'content-box'
    public static PADDING_BOX = 'padding-box'
    public static BORDER_BOX = 'border-box'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(BoxSizing.CONTENT_BOX)
        props.push(BoxSizing.PADDING_BOX)
        props.push(BoxSizing.BORDER_BOX)
        return props
    }
    getAccessableProperty(): any[] {
        return BoxSizing.getAccessableProperty()
    }


}