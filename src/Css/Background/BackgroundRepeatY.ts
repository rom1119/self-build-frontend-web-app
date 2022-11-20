import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import { BackgroundRepeat } from '~/src/Css';

export default class BackgroundRepeatY extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'background-repeat-y'
    public getName(): string {
        return BackgroundRepeatY.PROP_NAME
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
        return BackgroundRepeatY.getAccessableProperty()
    }


}