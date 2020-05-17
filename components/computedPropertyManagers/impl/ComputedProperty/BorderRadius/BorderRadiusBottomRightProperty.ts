import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, BorderRadiusBottomRight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Pixel from '../../../../../src/Unit/Size/Pixel';

export default class BorderRadiusBottomRightProperty extends BaseComputedPropertyManager<BorderRadiusBottomRight> {

    protected value: HtmlTag
    DEFAULT_VAL = 10
    DEFAULT_UNIT = new Pixel()
    property: BorderRadiusBottomRight = new BorderRadiusBottomRight(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}