import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, JustifyContent, Float, FlexDirection, FlexWrap, FlexOrder, FlexGrow, FlexBasis, FlexShrink } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';

export default class FlexShrinkProperty extends BaseComputedPropertyManager<FlexShrink> {

    protected value: HtmlTag
    DEFAULT_VAL = 1
    DEFAULT_UNIT = new Named()
    property: FlexShrink = new FlexShrink(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new FlexShrink(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}