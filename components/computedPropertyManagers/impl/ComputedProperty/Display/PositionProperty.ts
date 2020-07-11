import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, RightCss, BottomCss, TopCss } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import PositionCss from '../../../../../src/Css/Display/PositionCss';
import Left from '../../../../../src/Site/Left';
import LeftCss from '../../../../../src/Css/Display/Direction/LeftCss';

export default class PositionProperty extends BaseComputedPropertyManager<PositionCss> {

    protected value: HtmlTag
    DEFAULT_VAL = PositionCss.STATIC
    DEFAULT_UNIT = new Named()
    property: PositionCss = new PositionCss(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    activePropCss(prop: PositionCss) {
        super.activePropCss(prop)

        this.value.updateHasPosition(prop)

        // this.recalculate(this.value)
        return prop
    }
    
    deactivePropCss(prop: PositionCss) {
        super.deactivePropCss(prop)

        this.value.updateHasPosition(prop)

        this.removeDirectionsCss()

        // this.recalculate(this.value)
        return prop
    }

    updateCssProp(newProp: PositionCss) {
        var ret = super.updateCssProp(newProp)
        
        if (newProp.getClearValue() === PositionCss.STATIC) {
            this.removeDirectionsCss()
        }
        this.value.updateHasPosition(newProp)

        return ret
    }

    protected removeDirectionsCss()
    {
        this.value.removeCssPropertyByName(LeftCss.PROP_NAME)
        this.value.removeCssPropertyByName(RightCss.PROP_NAME)
        this.value.removeCssPropertyByName(TopCss.PROP_NAME)
        this.value.removeCssPropertyByName(BottomCss.PROP_NAME)
    }


}