import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FlexDirection extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'flex-direction'
    public getName(): string {
        return FlexDirection.PROP_NAME
    }
    public static ROW = 'row'
    public static ROW_REVERSE = 'row-reverse'
    public static COLUMN = 'column'
    public static COLUMN_REVERSE = 'column-reverse'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(FlexDirection.ROW)
        props.push(FlexDirection.ROW_REVERSE)
        props.push(FlexDirection.COLUMN)
        props.push(FlexDirection.COLUMN_REVERSE)



        return props
    }
    getAccessableProperty(): any[] {
        return FlexDirection.getAccessableProperty()
    }


}