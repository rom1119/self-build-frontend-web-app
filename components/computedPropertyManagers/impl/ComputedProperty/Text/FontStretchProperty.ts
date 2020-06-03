import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import FontStyle from "~/src/Css/Text/FontStyle";
import FontStretch from "~/src/Css/Text/FontStretch";

export default class FontStretchProperty extends BaseComputedPropertyManager<FontStretch> {

    protected value: HtmlTag
    DEFAULT_VAL = FontStretch.NORMAL
    DEFAULT_UNIT = new Named()
    property: FontStretch = new FontStretch(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}