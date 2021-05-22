import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, JustifyContent } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';

export default class JustifyContentProperty extends BaseComputedPropertyManager<JustifyContent> {

    protected value: HtmlTag
    DEFAULT_VAL = JustifyContent.CENTER
    DEFAULT_UNIT = new Named()
    property: JustifyContent = new JustifyContent(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new JustifyContent(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}