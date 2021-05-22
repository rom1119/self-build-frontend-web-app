import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import TransformStyle from '../../../../../src/Css/ThreeDimensional/TransformStyle';
import Perspective from '../../../../../src/Css/ThreeDimensional/Perspective';
import Pixel from '../../../../../src/Unit/Size/Pixel';
import PerspectiveOrigin from '../../../../../src/Css/ThreeDimensional/PerspectiveOrigin';

export default class PerspectiveOriginProperty extends BaseComputedPropertyManager<PerspectiveOrigin> {

    protected value: HtmlTag = null
    DEFAULT_VAL = PerspectiveOrigin.CENTER
    DEFAULT_UNIT = new Named()
    property: PerspectiveOrigin = new PerspectiveOrigin(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new PerspectiveOrigin(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}