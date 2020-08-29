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
import RadialGradientCss, { RadialGradientStructVal } from '../../../../../src/Css/Gradient/impl/RadialGradientCss';
import { RadialGradientDirection } from '../../../../../src/Css/Gradient/impl/RadialGradientCss';
import BaseGradientPropertyManager from "./BaseGradientPropertyManager";
import RadialGradientProperty from "./RadialGradientProperty";
import RepeatingRadialGradientCss, { RepeatingRadialGradientStructVal, RepeatingRadialGradientDirection } from "~/src/Css/Gradient/impl/RepeatingRadialGradientCss";


export default class RepeatingRadialGradientProperty  extends RadialGradientProperty {

    protected value: HtmlTag
    DEFAULT_VAL = null
    DEFAULT_UNIT = null
    property: RepeatingRadialGradientCss = new RepeatingRadialGradientCss()

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    createInitValue(): RepeatingRadialGradientStructVal
    {
        let el = new RepeatingRadialGradientStructVal()
        el.id = null

        el.color = RadialGradientStructVal.DEFAULT_COLOR
        el.size = RadialGradientStructVal.DEFAULT_SIZE

        var unitSize = RadialGradientStructVal.DEFAULT_SIZE_UNIT
        var unitColor = RadialGradientStructVal.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(RadialGradientStructVal.DEFAULT_COLOR)
        } else {
            el.color = RadialGradientStructVal.DEFAULT_COLOR
        }
        
        el.colorUnit = unitColor
        el.sizeUnit = unitSize
        

        return el
    }
    
    createInitValueNext(): RepeatingRadialGradientStructVal
    {
        let el = new RepeatingRadialGradientStructVal()
        el.id = null

        el.color = 'red'
        el.size = 100

        var unitSize = RadialGradientStructVal.DEFAULT_SIZE_UNIT
        var unitColor = RadialGradientStructVal.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(RadialGradientStructVal.DEFAULT_COLOR)
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
            let copy: RepeatingRadialGradientCss = _.cloneDeep(this.getProperty())

            let el = this.createInitValue()
            let elTwo = this.createInitValueNext()

            copy.clearValue()
            copy.addValue(el)
            copy.addValue(elTwo)

            var direction = <RepeatingRadialGradientDirection>copy.direction
            
            direction.shape = RadialGradientDirection.DEFAULT_SHAPE
            direction.size = RadialGradientDirection.DEFAULT_SIZE
            direction.xPos = RadialGradientDirection.DEFAULT_XPOS
            direction.yPos = RadialGradientDirection.DEFAULT_YPOS
            direction.xPosUnit = RadialGradientDirection.DEFAULT_XPOS_UNIT
            direction.yPosUnit = RadialGradientDirection.DEFAULT_YPOS_UNIT
            this.setProperty(copy)
            this.setTmpPropertyToModel(copy)
        
        }

        
    }

}