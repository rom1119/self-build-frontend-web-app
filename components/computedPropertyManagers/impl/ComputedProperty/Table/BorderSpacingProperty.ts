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
import BorderSpacing from "~/src/Css/Table/BorderSpacing";
import TableCell from '../../../../../src/Layout/tag/Table/TableCell';
import UnitSize from '../../../../../src/Unit/UnitSize';
import Pixel from '../../../../../src/Unit/Size/Pixel';
import { relativeTimeThreshold } from "moment";
import TableTag from '../../../../../src/Layout/tag/Table/TableTag';

export default class BorderSpacingProperty extends BaseComputedPropertyManager<BorderSpacing> {

    protected value: TableTag
    DEFAULT_VAL = 5
    DEFAULT_UNIT = new Pixel()
    property: BorderSpacing = new BorderSpacing(this.DEFAULT_VAL, this.DEFAULT_UNIT)

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


    activePropCss(prop: BorderSpacing) {
        super.activePropCss(prop)
        this.value.recalculateRealComputedProperties()
        return prop
    }
    
    deactivePropCss(prop: BorderSpacing) {
        super.deactivePropCss(prop)
        this.value.recalculateRealComputedProperties()

        return prop
    }

    updateCssProp(newProp: BorderSpacing) {
        console.log('updateCssProp', newProp.xVal);
        this.value.cssAccessor.setNewPropertyValue(newProp.getName(), newProp)
        
        this.value.recalculateRealComputedProperties()
        super.updateCssProp(newProp)

        return newProp.getClearValue()
    }
 
}