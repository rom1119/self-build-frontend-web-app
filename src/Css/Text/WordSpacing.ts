import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssPropertyLimitableNotRequired from "../CssPropertyLimitableNotRequired";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";
import { EM, Pixel, REM } from '~/src/Unit';

export default class WordSpacing extends CssSimple implements CssPropertyLimitable, CssPropertyLimitableNotRequired
{
    public static PROP_NAME = 'word-spacing'
    public getName(): string {
        return WordSpacing.PROP_NAME
    }

    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static REVERT_LAYER = 'revert-layer'
    public static UNSET = 'unset'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(WordSpacing.INHERIT)
        props.push(WordSpacing.INITIAL)
        props.push(WordSpacing.REVERT)
        props.push(WordSpacing.UNSET)

        return props
    }
    getAccessableProperty(): any[] {
        return WordSpacing.getAccessableProperty()
    }

    getAvailableAnotherUnits(): string[] {
        return [
            Pixel.PROP_NAME,
            EM.PROP_NAME,
            REM.PROP_NAME,
        ]
    }

}