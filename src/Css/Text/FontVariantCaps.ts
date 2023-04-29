import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssPropertyLimitableNotRequired from "../CssPropertyLimitableNotRequired";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";
import { EM, Pixel, REM } from '~/src/Unit';

export default class FontVariantCaps extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-variant-caps'
    public getName(): string {
        return FontVariantCaps.PROP_NAME
    }

    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static REVERT_LAYER = 'revert-layer'
    public static UNSET = 'unset'
    public static NORMAL = 'normal'

    public static SMALL_CAPS = 'small-caps'
    public static ALL_SMALL_CAPS = 'all-small-caps'
    public static PETITE_CAPS = 'petite-caps'
    public static ALL_PETITE_CAPS = 'all-petite-caps'
    public static UNICASE = 'unicase'
    public static TITLING_CAPS = 'titling-cabs'



    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontVariantCaps.INHERIT)
        props.push(FontVariantCaps.INITIAL)
        props.push(FontVariantCaps.REVERT)
        props.push(FontVariantCaps.UNSET)
        props.push(FontVariantCaps.NORMAL)
        props.push(FontVariantCaps.SMALL_CAPS)
        props.push(FontVariantCaps.ALL_SMALL_CAPS)
        props.push(FontVariantCaps.PETITE_CAPS)
        props.push(FontVariantCaps.ALL_PETITE_CAPS)
        props.push(FontVariantCaps.UNICASE)
        props.push(FontVariantCaps.TITLING_CAPS)


        return props
    }
    getAccessableProperty(): any[] {
        return FontVariantCaps.getAccessableProperty()
    }


}