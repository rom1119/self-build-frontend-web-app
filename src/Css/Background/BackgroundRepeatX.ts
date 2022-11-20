import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import { BackgroundRepeat } from '~/src/Css';

export default class BackgroundRepeatX extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-repeat-x'
    public getName(): string {
        return BackgroundRepeatX.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(BackgroundRepeat.INITIAL)
        props.push(BackgroundRepeat.INHERIT)
        props.push(BackgroundRepeat.NO_REPEAT)
        props.push(BackgroundRepeat.REPEAT)

        return props
    }
    getAccessableProperty(): any[] {
        return BackgroundRepeatX.getAccessableProperty()
    }


}