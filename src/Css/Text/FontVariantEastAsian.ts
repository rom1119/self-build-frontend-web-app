import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssPropertyLimitableNotRequired from "../CssPropertyLimitableNotRequired";
import CssThreeAxis from '../CssThreeAxis';
import CssTwoAxis from '~/src/Css/CssTwoAxis';
import TextDecoration from "./TextDecoration";
import { EM, Pixel, REM } from '~/src/Unit';

export default class FontVariantEastAsian extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'font-variant-east-asian'
    public getName(): string {
        return FontVariantEastAsian.PROP_NAME
    }

    public static INHERIT = 'inherit'
    public static INITIAL = 'initial'
    public static REVERT = 'revert'
    public static REVERT_LAYER = 'revert-layer'
    public static UNSET = 'unset'
    public static NORMAL = 'normal'

    public static RUBY = 'ruby'
    public static SIMPLIFIED = 'simplified'
    public static TRADITIONAL = 'traditional'
    public static FULL_WIDTH = 'full-width'

    public static PROPORTIONAL_WIDTH = 'proportional-width'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontVariantEastAsian.INHERIT)
        props.push(FontVariantEastAsian.INITIAL)
        props.push(FontVariantEastAsian.REVERT)
        props.push(FontVariantEastAsian.UNSET)
        props.push(FontVariantEastAsian.NORMAL)
        props.push(FontVariantEastAsian.RUBY)
        props.push(FontVariantEastAsian.SIMPLIFIED)
        props.push(FontVariantEastAsian.TRADITIONAL)
        props.push(FontVariantEastAsian.FULL_WIDTH)
        props.push(FontVariantEastAsian.PROPORTIONAL_WIDTH)

        return props
    }
    getAccessableProperty(): any[] {
        return FontVariantEastAsian.getAccessableProperty()
    }


}