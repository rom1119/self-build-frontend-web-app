import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height, BoxShadowCss } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named, RGBA } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import TextShadowCss, { TextShadowStruct } from '../../../../../src/Css/Shadow/TextShadowCss';
import RGB from "~/src/Unit/Color/RGB";
import _ from 'lodash'
import { BoxShadowStruct } from "~/src/Css/Shadow/BoxShadowCss";
import LinearGradientCss, { LinearGradientStructVal, LinearGradientDirection } from '../../../../../src/Css/Gradient/impl/LinearGradientCss';
import BaseGradientPropertyManager from "./BaseGradientPropertyManager";


export default class LinearGradientProperty extends BaseGradientPropertyManager<LinearGradientCss> {

    protected value: HtmlTag
    DEFAULT_VAL = null
    DEFAULT_UNIT = null
    property: LinearGradientCss = new LinearGradientCss()

    createInitProperty() {
        return new LinearGradientCss()
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    createInitValue(): LinearGradientStructVal
    {
        let el = new LinearGradientStructVal()
        el.id = null

        el.color = LinearGradientStructVal.DEFAULT_COLOR
        el.size = LinearGradientStructVal.DEFAULT_SIZE

        var unitSize = LinearGradientStructVal.DEFAULT_SIZE_UNIT
        var unitColor = LinearGradientStructVal.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(LinearGradientStructVal.DEFAULT_COLOR)
        } else {
            el.color = LinearGradientStructVal.DEFAULT_COLOR
        }
        
        el.colorUnit = unitColor
        el.sizeUnit = unitSize
        

        return el
    }

    createInitValueNext(): LinearGradientStructVal
    {
        let el = new LinearGradientStructVal()
        el.id = null

        el.color = 'red'
        el.size = 100

        var unitSize = LinearGradientStructVal.DEFAULT_SIZE_UNIT
        var unitColor = LinearGradientStructVal.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(LinearGradientStructVal.DEFAULT_COLOR)
        } else {
            el.color = 'red'
        }
        
        el.colorUnit = unitColor
        el.sizeUnit = unitSize
        

        return el
    }

    init() {
        var prop = this.getPropertyCssFromModel(this.getProperty().getName())
        let clearval = this.getProperty().getClearValue()
        let unit = this.getProperty().getUnit()
        
        if (prop) {
            this.setProperty(prop)
            this.getProperty().setActive(true)
        } else {

            this.getProperty().setActive(false)
            let copy = this.getProperty().deepCopyThis()

            let el = this.createInitValue()
            let elTwo = this.createInitValueNext()
            copy.clearValue()
            copy.addValue(el)
            copy.addValue(elTwo)

            var direction = <LinearGradientDirection>copy.direction

            direction.direction = LinearGradientDirection.DEFAULT_DIRECTION
            direction.directionUnit = LinearGradientDirection.DEFAULT_DIRECTION_UNIT
            
            this.setProperty(copy)
            this.setTmpPropertyToModel(copy)
        }

        
    }

    
}