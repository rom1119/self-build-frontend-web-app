import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";

export default class BackgroundPositionProperty extends BaseComputedPropertyManager<BackgroundPosition> {

    protected value: HtmlTag
    DEFAULT_VAL = BackgroundPosition.CENTER
    DEFAULT_UNIT = new Named()
    property: BackgroundPosition = new BackgroundPosition(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new BackgroundPosition(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}