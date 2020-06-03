import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FontStretch extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-stretch'
    public getName(): string {
        return FontStretch.PROP_NAME
    }
    public static NORMAL = 'normal'
    public static WIDER = 'wider'
    public static NARROWED = 'narrower'
    public static CONDENSED = 'condensed'
    public static SEMI_CONDENSED = 'semi-condensed'
    public static EXTRA_CONDENSED = 'extra-condensed'
    public static ULTRA_CONDENSED = 'ultra-condensed'
    public static EXPANDED = 'expanded'
    public static SEMI_EXPANDED = 'semi-expanded'
    public static EXTRA_EXPANDED = 'extra-expanded'
    public static ULTRA_EXPANDED = 'ultra-expanded'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontStretch.NORMAL)
        props.push(FontStretch.WIDER)
        props.push(FontStretch.NARROWED)
        props.push(FontStretch.CONDENSED)
        props.push(FontStretch.SEMI_CONDENSED)
        props.push(FontStretch.EXTRA_CONDENSED)
        props.push(FontStretch.ULTRA_CONDENSED)


        return props
    }
    getAccessableProperty(): any[] {
        return FontStretch.getAccessableProperty()
    }


}