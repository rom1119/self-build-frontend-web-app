import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, BottomCss } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import LeftCss from '../../../../../src/Css/Display/Direction/LeftCss';
import Pixel from '../../../../../src/Unit/Size/Pixel';
import RightCss from '../../../../../src/Css/Display/Direction/RightCss';
import TopCss from '../../../../../src/Css/Display/Direction/TopCss';

export default class BottomProperty extends BaseComputedPropertyManager<BottomCss> {

    protected value: HtmlTag
    DEFAULT_VAL = 0
    DEFAULT_UNIT = new Pixel()
    property: BottomCss = new BottomCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new BottomCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    activePropCss(prop: BottomCss) {
        this.value.realPositionCalculator.bottomUnit = prop.getUnit()
        this.value.realPositionCalculator.bottom = prop.getClearValue()
        super.activePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: BottomCss) {
        this.value.realPositionCalculator.bottomUnit = prop.getUnit()
        this.value.realPositionCalculator.bottom = 0

        super.deactivePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: BottomCss) {
        if (newProp.isActive()) {            
            this.value.realPositionCalculator.bottomUnit = newProp.getUnit()
            this.value.realPositionCalculator.bottom = newProp.getClearValue()

        }
        var ret = super.updateCssProp(newProp)
        // this.value.updateHasPosition(newProp)

        return ret
    }
}