import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, BackgroundSize, BackgroundRepeat } from '~/src/Css';
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";

export default class BackgroundRepeatProperty extends BaseComputedPropertyManager<BackgroundRepeat> {

    protected value: HtmlTag
    DEFAULT_VAL = BackgroundRepeat.REPEAT
    DEFAULT_UNIT = new Named()
    property: BackgroundSize = new BackgroundRepeat(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}