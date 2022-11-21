import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";

export default class ListStyleType extends CssSimple implements CssPropertyLimitable, CssPropertyLimitableNotRequired {
    
    public static PROP_NAME = 'list-style-type'
    public getName(): string {
        return ListStyleType.PROP_NAME
    }
    public static NONE = 'none'
    public static DISC = 'disc'
    public static CIRCLE = 'circle'
    public static SQUARE = 'square'
    public static DECIMAL = 'decimal'
    public static GEORGIAN = 'georgian'
    public static TRAD_CHINESE_INFORMAL = 'trad-chinese-informal'
    public static KANNADA = 'kannada'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(ListStyleType.NONE)
        props.push(ListStyleType.DISC)
        props.push(ListStyleType.CIRCLE)
        props.push(ListStyleType.SQUARE)
        props.push(ListStyleType.DECIMAL)
        props.push(ListStyleType.GEORGIAN)
        props.push(ListStyleType.TRAD_CHINESE_INFORMAL)
        props.push(ListStyleType.KANNADA)


        return props
    }
    getAccessableProperty(): any[] {
        return ListStyleType.getAccessableProperty()
    }

    getAvailableAnotherUnits(): string[] {
        return [
            Named.PROP_NAME
        ]
    }
}