import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import LeftCss from '../../../../../src/Css/Display/Direction/LeftCss';
import Pixel from '../../../../../src/Unit/Size/Pixel';
import RightCss from '../../../../../src/Css/Display/Direction/RightCss';

export default class RightProperty extends BaseComputedPropertyManager<RightCss> {

    protected value: HtmlTag
    DEFAULT_VAL = 0
    DEFAULT_UNIT = new Pixel()
    property: RightCss = new RightCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new RightCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    activePropCss(prop: RightCss) {
        this.value.realPositionCalculator.rightUnit = prop.getUnit()
        this.value.realPositionCalculator.right = prop.getClearValue()
        super.activePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: RightCss) {
        this.value.realPositionCalculator.rightUnit = prop.getUnit()
        this.value.realPositionCalculator.right = 0

        super.deactivePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: RightCss) {
        if (newProp.isActive()) {            
            this.value.realPositionCalculator.rightUnit = newProp.getUnit()
            this.value.realPositionCalculator.right = newProp.getClearValue()

        }
        var ret = super.updateCssProp(newProp)
        // this.value.updateHasPosition(newProp)

        return ret
    }
}