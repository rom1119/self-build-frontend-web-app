import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight, FontSize } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import FontColor from "~/src/Css/Text/FontColor";
import FontFamily from "~/src/Css/Text/FontFamily";

export default class FontFamilyProperty extends BaseComputedPropertyManager<FontFamily> {

    protected value: HtmlTag
    DEFAULT_VAL = FontFamily.SERIF
    DEFAULT_UNIT = new Named()
    property: FontFamily = new FontFamily(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}