import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackfaceVisibility extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'backface-visibility'

    public static VISIBLE = 'visible'
    public static HIDDEN = 'hidden'

    public getName(): string {
        return BackfaceVisibility.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackfaceVisibility.VISIBLE)
        props.push(BackfaceVisibility.HIDDEN)
        return props
    }

    getAccessableProperty(): any[] {
        return BackfaceVisibility.getAccessableProperty()
    }
  


}