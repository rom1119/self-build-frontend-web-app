import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import TransformStyle from '../../../../../src/Css/ThreeDimensional/TransformStyle';

export default class TransformStyleProperty extends BaseComputedPropertyManager<TransformStyle> {

    protected value: HtmlTag = null
    DEFAULT_VAL = TransformStyle.PRESERVE_3D
    DEFAULT_UNIT = new Named()
    property: TransformStyle = new TransformStyle(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}