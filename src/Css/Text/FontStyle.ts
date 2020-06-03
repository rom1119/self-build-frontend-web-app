import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FontStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-style'
    public getName(): string {
        return FontStyle.PROP_NAME
    }
    public static NORMAL = 'normal'
    public static ITALIC = 'italic'
    public static OBLIQUE = 'oblique'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontStyle.NORMAL)
        props.push(FontStyle.ITALIC)
        props.push(FontStyle.OBLIQUE)


      

        return props
    }
    getAccessableProperty(): any[] {
        return FontStyle.getAccessableProperty()
    }


}