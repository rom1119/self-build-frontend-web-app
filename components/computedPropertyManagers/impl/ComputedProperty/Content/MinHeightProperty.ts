import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Height, MinHeight } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import HtmlTagRecalculator from "~/src/Recalculator/HtmlTagRecalculator";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";
import _ from 'lodash'
import Vue from "vue";
import Percent from '../../../../../src/Unit/Size/Percent';

export default class MinHeightProperty extends BaseComputedPropertyManager<MinHeight> {

    protected value: HtmlTag
    DEFAULT_VAL = 100
    DEFAULT_UNIT = new Percent()
    property: MinHeight = new MinHeight(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    protected borderRecalculator: HtmlTagRecalculator
    protected marginRecalculator: HtmlTagRecalculator


    constructor()
    {
        super()
        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()
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

    activePropCss(prop: BasePropertyCss) {
        super.activePropCss(prop)

        this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: BasePropertyCss) {
        super.deactivePropCss(prop)

        this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: BasePropertyCss) {
        if (!this.getProperty().isActive()) {
            return
        }
        
        let val = this.value.getComputedCssVal(newProp)
        let clonedCss = _.cloneDeep(newProp)
        clonedCss.setValue(parseInt(val))
        // clonedCss.setUnit(new Pixel())
    // console.log(newProp);
    // console.log(val);
    // console.log(clonedCss);
    // console.log('ALA MA');
        
    this.value.contentFilter.injectCssProperty(newProp)
        // this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

        // this.value.updateModelComponent()
        this.recalculate(this.value)

        return newProp.getClearValue()
    }

    private recalculate(tag: HtmlTag)
    {
        this.borderRecalculator.recalculate(tag)
        this.marginRecalculator.recalculate(tag)
    }
}