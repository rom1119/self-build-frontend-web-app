import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Pixel from '../../../../../src/Unit/Size/Pixel';
import TableCell from "~/src/Layout/tag/Table/TableCell";
import Vue from "vue";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";

export default class HeightProperty extends BaseComputedPropertyManager<Height> {

    protected value: HtmlTag
    DEFAULT_VAL = 100
    DEFAULT_UNIT = new Pixel()
    property: Height = new Height(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new Height(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    updateCssProp(prop: Height) {
            super.updateCssProp(prop)
        if (this.value instanceof TableRowEl) {
                this.value.setHeightRow(prop)
            // setTimeout(() => {
            //     // this.recalculate(this.value, prop)
            //
            //
            // }, 10)
        }

        return prop.getClearValue()
    }

    deactivePropCss(prop: Height) {
        super.deactivePropCss(prop)

        Vue.nextTick(() => {
            this.recalculate(this.value, prop)
        })
        this.value.clearHeight()
        return prop
    }

    activePropCss(prop: Height) {
        super.activePropCss(prop)

        Vue.nextTick(() => {
            this.recalculate(this.value, prop)
            this.value.recalculateRealComputedProperties()
        })
        return prop
    }

    private recalculate(tag: HtmlTag, prop)
    {
        // this.borderRecalculator.recalculate(tag)
        // this.marginRecalculator.recalculate(tag)


            // console.log('WIDTH-REAL', tableRealWidth);

            // tag.setWidthColumn(tableRealWidth)


    }
}
