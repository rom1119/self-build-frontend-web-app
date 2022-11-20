import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoProperty from '../CssTwoProperty';

export default class AlignSelf extends CssTwoProperty implements CssPropertyLimitable
{
    public static PROP_NAME = 'align-self'
    public getName(): string {
        return AlignSelf.PROP_NAME
    }
    public static AUTO = 'auto'
    public static FLEX_START = 'flex-start'
    public static FLEX_END = 'flex-end'

    public static SELF_START = 'self-start'
    public static SELF_END = 'self-end'
    public static CENTER = 'center'
    public static BASELINE = 'baseline'
    public static STRETCH = 'stretch'
    public static START = 'start'
    public static END = 'end'
    public static SAFE = 'safe'
    public static UNSAFE = 'unsafe'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(AlignSelf.AUTO)
        props.push(AlignSelf.FLEX_START)
        props.push(AlignSelf.FLEX_END)
        props.push(AlignSelf.SELF_START)
        props.push(AlignSelf.SELF_END)
        props.push(AlignSelf.CENTER)
        props.push(AlignSelf.BASELINE)
        props.push(AlignSelf.STRETCH)
        props.push(AlignSelf.START)
        props.push(AlignSelf.END)
        props.push(AlignSelf.SAFE)
        props.push(AlignSelf.UNSAFE)




        return props
    }
    getAccessableProperty(): any[] {
        return AlignSelf.getAccessableProperty()
    }


}