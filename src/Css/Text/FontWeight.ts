import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class FontWeight extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-weight'
    public getName(): string {
        return FontWeight.PROP_NAME
    }
    public static NORMAL = 'normal'
    public static BOLD = 'bold'
    public static _100 = '100'
    public static _200 = '200'
    public static _300 = '300'
    public static _400 = '400'
    public static _500 = '500'
    public static _600 = '600'
    public static _700 = '700'
    public static _800 = '800'
    public static _900 = '900'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontWeight.NORMAL)
        props.push(FontWeight.BOLD)
        props.push(FontWeight._100)
        props.push(FontWeight._200)
        props.push(FontWeight._300)
        props.push(FontWeight._400)
        props.push(FontWeight._500)
        props.push(FontWeight._600)
        props.push(FontWeight._700)
        props.push(FontWeight._800)
        props.push(FontWeight._900)
      

        return props
    }
    getAccessableProperty(): any[] {
        return FontWeight.getAccessableProperty()
    }


}