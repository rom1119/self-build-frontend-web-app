import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import TransformStyle from '../../../../../src/Css/ThreeDimensional/TransformStyle';
import BackfaceVisibility from '../../../../../src/Css/ThreeDimensional/BackfaceVisibility';

export default class BackfaceVisibilityProperty extends BaseComputedPropertyManager<BackfaceVisibility> {

    protected value: HtmlTag = null
    DEFAULT_VAL = BackfaceVisibility.VISIBLE
    DEFAULT_UNIT = new Named()
    property: BackfaceVisibility = new BackfaceVisibility(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new BackfaceVisibility(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}