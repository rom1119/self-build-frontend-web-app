import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";

export default class Resize extends CssSimple implements CssPropertyLimitable {
    
    public static PROP_NAME = 'resize'
    public getName(): string {
        return Resize.PROP_NAME
    }
    public static BOTH = 'both'
    public static HORIZONTAL = 'horizontal'
    public static VERTICAL = 'vertical'
    public static BLOCK = 'block'
    public static INLINE = 'inline'
    public static NONE = 'none'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Resize.BOTH)
        props.push(Resize.HORIZONTAL)
        props.push(Resize.BLOCK)
        props.push(Resize.INLINE)
        props.push(Resize.NONE)


        return props
    }
    getAccessableProperty(): any[] {
        return Resize.getAccessableProperty()
    }
}