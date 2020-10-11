import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class VerticalAlign extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'vertical-align'
    public getName(): string {
        return VerticalAlign.PROP_NAME
    }
    public static BASELINE = 'baseline'
    public static SUB = 'sub'
    public static SUPER = 'super'
    public static TEXT_TOP = 'text-top'
    public static TEXT_BOTTOM = 'text-bottom'
    public static MIDDLE = 'middle'
    public static TOP = 'top'
    public static BOTTOM = 'bottom'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(VerticalAlign.BASELINE)
        props.push(VerticalAlign.SUB)
        props.push(VerticalAlign.SUPER)
        props.push(VerticalAlign.TEXT_TOP)
        props.push(VerticalAlign.TEXT_BOTTOM)
        props.push(VerticalAlign.MIDDLE)
        props.push(VerticalAlign.TOP)
        props.push(VerticalAlign.BOTTOM)


        return props
    }
    getAccessableProperty(): any[] {
        return VerticalAlign.getAccessableProperty()
    }


}