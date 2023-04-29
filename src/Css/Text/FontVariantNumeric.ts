import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssPropertyLimitableNotRequired from "../CssPropertyLimitableNotRequired";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";
import { EM, Pixel, REM } from '~/src/Unit';

export default class FontVariantNumeric extends CssTwoAxis implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-variant-numeric'
    public getName(): string {
        return FontVariantNumeric.PROP_NAME
    }

    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static REVERT_LAYER = 'revert-layer'
    public static UNSET = 'unset'
    public static NORMAL = 'normal'

    public static ORDINAL = 'ordinal'
    public static SLASHED_ZERO = 'slashed-zero'
    public static LINING_NUMS = 'lining-nums'
    public static OLDSTYLE_NUMS = 'oldstyle-nums'
    public static PROPORTIONAL_NUMS = 'proportional-nums'
    public static TABULAR_NUMS = 'tabular-nums'
    public static DIAGONAL_FRACTIONS = 'diagonal-fractions'
    public static STACKED_FRACTIONS = 'stacked-fractions'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontVariantNumeric.INHERIT)
        props.push(FontVariantNumeric.INITIAL)
        props.push(FontVariantNumeric.REVERT)
        props.push(FontVariantNumeric.UNSET)
        props.push(FontVariantNumeric.NORMAL)
        props.push(FontVariantNumeric.ORDINAL)
        props.push(FontVariantNumeric.SLASHED_ZERO)
        props.push(FontVariantNumeric.LINING_NUMS)
        props.push(FontVariantNumeric.OLDSTYLE_NUMS)
        props.push(FontVariantNumeric.PROPORTIONAL_NUMS)
        props.push(FontVariantNumeric.TABULAR_NUMS)
        props.push(FontVariantNumeric.DIAGONAL_FRACTIONS)
        props.push(FontVariantNumeric.STACKED_FRACTIONS)

        return props
    }
    getAccessableProperty(): any[] {
        return FontVariantNumeric.getAccessableProperty()
    }


}