import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, BoxSizing } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Pixel from '../../../../../src/Unit/Size/Pixel';
import Vue from "vue";

export default class BoxSizingProperty extends BaseComputedPropertyManager<BoxSizing> {

    protected value: HtmlTag
    DEFAULT_VAL = 'border-box'
    DEFAULT_UNIT = new Named()
    property: BoxSizing = BoxSizing.NEW_CONTENT_BOX()

    createInitProperty() {
        return BoxSizing.NEW_CONTENT_BOX()
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    updateCssProp(prop: BoxSizing) {
        super.updateCssProp(prop)
        Vue.nextTick(() => {
        this.value.lastSetWidthPx = this.value.getComputedClientWidth()
        this.value.lastSetWidthContentPx = this.value.getComputedOffsetWidthContentEl()

        this.value.lastSetHeightPx = this.value.getComputedHeight()
        this.value.lastSetHeightContentPx = this.value.getComputedOffsetHeightContentEl()
        })

        return prop.getClearValue()
    }


}