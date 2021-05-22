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
import TopCss from '../../../../../src/Css/Display/Direction/TopCss';

export default class TopProperty extends BaseComputedPropertyManager<TopCss> {

    protected value: HtmlTag
    DEFAULT_VAL = 0
    DEFAULT_UNIT = new Pixel()
    property: TopCss = new TopCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    createInitProperty() {
        return new TopCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    activePropCss(prop: TopCss) {
        this.value.realPositionCalculator.top = prop.getClearValue()
        super.activePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: TopCss) {
        this.value.realPositionCalculator.top = 0
        super.deactivePropCss(prop)


        // this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: TopCss) {
        if (newProp.isActive()) {            
            this.value.realPositionCalculator.top = newProp.getClearValue()
        }
        var ret = super.updateCssProp(newProp)
        // this.value.updateHasPosition(newProp)

        return ret
    }
}