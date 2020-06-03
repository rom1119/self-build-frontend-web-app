import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, TextAlign, FontWeight, FontSize } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import FontColor from "~/src/Css/Text/FontColor";
import LineHeight from "~/src/Css/Text/LineHeight";
import Pixel from '../../../../../src/Unit/Size/Pixel';

export default class LineHeightProperty extends BaseComputedPropertyManager<LineHeight> {

    protected value: HtmlTag
    DEFAULT_VAL = 10
    DEFAULT_UNIT = new Pixel()
    property: LineHeight = new LineHeight(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}