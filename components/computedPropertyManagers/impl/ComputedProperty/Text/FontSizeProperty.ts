import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight, FontSize } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named, EM } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import Pixel from '../../../../../src/Unit/Size/Pixel';

export default class FontSizeProperty extends BaseComputedPropertyManager<FontSize> {

    protected value: HtmlTag
    DEFAULT_VAL = 1
    DEFAULT_UNIT = new Pixel()
    property: FontSize = new FontSize(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new FontSize(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}