import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundSize extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-size'
    public getName(): string {
        return BackgroundSize.PROP_NAME
    }
    public static UNSET = 'unset'
    public static COVER = 'cover'
    public static CONTAIN = 'contain'
    public static AUTO = 'auto'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundSize.UNSET)
        props.push(BackgroundSize.COVER)
        props.push(BackgroundSize.CONTAIN)
        props.push(BackgroundSize.AUTO)

   

        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundSize.getAccessableProperty()
    }


}