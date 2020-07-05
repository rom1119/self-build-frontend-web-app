import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import LeftCss from '../../../../../src/Css/Display/Direction/LeftCss';
import Pixel from '../../../../../src/Unit/Size/Pixel';

export default class LeftProperty extends BaseComputedPropertyManager<LeftCss> {

    protected value: HtmlTag
    DEFAULT_VAL = 0
    DEFAULT_UNIT = new Pixel()
    property: LeftCss = new LeftCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    activePropCss(prop: LeftCss) {
        this.value.realPositionCalculator.leftUnit = prop.getUnit()
        this.value.realPositionCalculator.left = prop.getClearValue()
        super.activePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: LeftCss) {
        this.value.realPositionCalculator.leftUnit = prop.getUnit()
        this.value.realPositionCalculator.left = prop.getClearValue()
        super.deactivePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: LeftCss) {
        if (newProp.isActive()) {            
            this.value.realPositionCalculator.leftUnit = newProp.getUnit()
            this.value.realPositionCalculator.left = newProp.getClearValue()
        }
        var ret = super.updateCssProp(newProp)
        // this.value.updateHasPosition(newProp)

        return ret
    }
}