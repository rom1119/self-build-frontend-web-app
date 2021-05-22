import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import HtmlTagRecalculator from "~/src/Recalculator/HtmlTagRecalculator";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";
import _ from 'lodash'
import Vue from "vue";
import Percent from '../../../../../src/Unit/Size/Percent';
import TableCell from '../../../../../src/Layout/tag/Table/TableCell';

export default class WidthProperty extends BaseComputedPropertyManager<Width> {

    protected value: HtmlTag
    DEFAULT_VAL = 100
    DEFAULT_UNIT = new Percent()
    property: Width = new Width(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    protected borderRecalculator: HtmlTagRecalculator
    protected marginRecalculator: HtmlTagRecalculator


    constructor()
    {
        super()
        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()
    }
    createInitProperty() {
        return new Width(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    init()
    {
        super.init()
        // this.value.setWithUnit(this.getProperty().getUnit())
    }

    activePropCss(prop: Width) {
        super.activePropCss(prop)

        Vue.nextTick(() => {
            this.recalculate(this.value, prop)
        })
        return prop
    }

    deactivePropCss(prop: Width) {
        super.deactivePropCss(prop)

        Vue.nextTick(() => {
            this.recalculate(this.value, prop)
        })
        return prop
    }

    updateCssProp(prop: Width) {
        super.updateCssProp(prop)
        Vue.nextTick(() => {
            this.recalculate(this.value, prop)

        })

        return prop.getClearValue()
    }

    private recalculate(tag: HtmlTag, prop)
    {
        this.borderRecalculator.recalculate(tag)
        this.marginRecalculator.recalculate(tag)

        if (tag instanceof TableCell) {
            // var tableRealWidth =
            tag.setColumnCss(prop)
            // console.log('WIDTH-REAL', tableRealWidth);

            // tag.setWidthColumn(tableRealWidth)

        }
    }
}
