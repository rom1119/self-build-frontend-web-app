import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";

export default class ListStylePosition extends CssSimple implements CssPropertyLimitable {
    
    public static PROP_NAME = 'list-style-position'
    public getName(): string {
        return ListStylePosition.PROP_NAME
    }
    public static UNSET = 'unset'
    public static INSIDE = 'inside'
    public static OUTSIDE = 'outside'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(ListStylePosition.UNSET)
        props.push(ListStylePosition.INSIDE)
        props.push(ListStylePosition.OUTSIDE)

        return props
    }
    getAccessableProperty(): any[] {
        return ListStylePosition.getAccessableProperty()
    }
}