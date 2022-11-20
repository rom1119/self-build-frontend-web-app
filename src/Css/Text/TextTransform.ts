import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class TextTransform extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'text-transform'
    public getName(): string {
        return TextTransform.PROP_NAME
    }
    public static NONE = 'none'
    public static CAPITALIZE = 'capitalize'
    public static UPPERCASE = 'uppercase'
    public static LOWERCASE = 'lowercase'
    public static FULL_WIDTH = 'full-width'
    public static FULL_SIZE_KANA = 'full-size-kana'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(TextTransform.NONE)
        props.push(TextTransform.CAPITALIZE)
        props.push(TextTransform.UPPERCASE)
        props.push(TextTransform.LOWERCASE)
        props.push(TextTransform.FULL_WIDTH)
        props.push(TextTransform.FULL_SIZE_KANA)
        return props
    }
    getAccessableProperty(): any[] {
        return TextTransform.getAccessableProperty()
    }


}