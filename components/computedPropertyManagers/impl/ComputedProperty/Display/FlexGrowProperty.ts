import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, JustifyContent, Float, FlexDirection, FlexWrap, FlexOrder, FlexGrow } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';

export default class FlexGrowProperty extends BaseComputedPropertyManager<FlexGrow> {

    protected value: HtmlTag
    DEFAULT_VAL = 1
    DEFAULT_UNIT = new Named()
    property: FlexGrow = new FlexGrow(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new FlexGrow(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}