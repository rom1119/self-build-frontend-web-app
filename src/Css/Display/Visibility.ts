import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Visibility extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'visibility'

    public static VISIBLE = 'visible'
    public static HIDDEN = 'hidden'
    public static COLLAPSE = 'collapse'

    public getName(): string {
        return Visibility.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Visibility.VISIBLE)
        props.push(Visibility.HIDDEN)
        props.push(Visibility.COLLAPSE)
        return props
    }

    getAccessableProperty(): any[] {
        return Visibility.getAccessableProperty()
    }
  


}