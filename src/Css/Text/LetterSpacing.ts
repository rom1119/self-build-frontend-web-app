import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssPropertyLimitableNotRequired from "../CssPropertyLimitableNotRequired";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";
import { EM, Pixel, REM } from '~/src/Unit';

export default class LetterSpacing extends CssSimple implements CssPropertyLimitable, CssPropertyLimitableNotRequired
{
    public static PROP_NAME = 'letter-spacing'
    public getName(): string {
        return LetterSpacing.PROP_NAME
    }

    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static REVERT_LAYER = 'revert-layer'
    public static UNSET = 'unset'
    public static NORMAL = 'normal'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(LetterSpacing.INHERIT)
        props.push(LetterSpacing.INITIAL)
        props.push(LetterSpacing.REVERT)
        props.push(LetterSpacing.UNSET)
        props.push(LetterSpacing.NORMAL)

        return props
    }
    getAccessableProperty(): any[] {
        return LetterSpacing.getAccessableProperty()
    }

    getAvailableAnotherUnits(): string[] {
        return [
            Pixel.PROP_NAME,
            EM.PROP_NAME,
            REM.PROP_NAME,
        ]
    }

}