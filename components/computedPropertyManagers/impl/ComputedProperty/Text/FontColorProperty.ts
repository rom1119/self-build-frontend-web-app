import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight, FontSize } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import FontColor from "~/src/Css/Text/FontColor";

export default class FontColorProperty extends BaseComputedPropertyManager<FontColor> {

    protected value: HtmlTag
    DEFAULT_VAL = 'black'
    DEFAULT_UNIT = new Named()
    property: FontSize = new FontColor(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new FontColor(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}