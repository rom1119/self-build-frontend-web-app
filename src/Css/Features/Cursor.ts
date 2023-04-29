import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";

export default class Cursor extends CssSimple implements CssPropertyLimitable {
    
    public static PROP_NAME = 'cursor'
    public getName(): string {
        return Cursor.PROP_NAME
    }
    public static POINTER = 'pointer'
    public static WAIT = 'wait'
    public static HELP = 'help'
    public static NOT_ALLOWED = 'not-allowed'
    public static ZOOM_IN = 'zoom-in'
    public static GRAB = 'grab'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(Cursor.POINTER)
        props.push(Cursor.WAIT)
        props.push(Cursor.HELP)
        props.push(Cursor.NOT_ALLOWED)
        props.push(Cursor.ZOOM_IN)
        props.push(Cursor.GRAB)


        return props
    }
    getAccessableProperty(): any[] {
        return Cursor.getAccessableProperty()
    }
}