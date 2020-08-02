import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import Named from '../../Unit/Named';

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

    public static NEW_CONTENT_BOX()
    {
        return new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
    }
    
    public static NEW_PADDING_BOX()
    {
        return new BoxSizing(BoxSizing.PADDING_BOX, new Named())
    }
    
    public static NEW_BORDER_BOX()
    {
        return new BoxSizing(BoxSizing.BORDER_BOX, new Named())
    }


}