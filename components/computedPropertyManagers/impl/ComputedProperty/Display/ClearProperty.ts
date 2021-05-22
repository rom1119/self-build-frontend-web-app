import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, JustifyContent, Float } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import Clear from '../../../../../src/Css/Display/Clear';

export default class ClearProperty extends BaseComputedPropertyManager<Clear> {

    protected value: HtmlTag
    DEFAULT_VAL = Clear.BOTH
    DEFAULT_UNIT = new Named()
    property: Clear = new Clear(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new Clear(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}