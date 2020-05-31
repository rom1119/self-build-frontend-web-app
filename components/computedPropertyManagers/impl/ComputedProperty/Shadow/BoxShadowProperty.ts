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


export default class BoxShadowProperty extends BaseComputedPropertyManager<BoxShadowCss> {

    protected value: HtmlTag
    DEFAULT_VAL = Display.BLOCK
    DEFAULT_UNIT = new Named()
    property: BoxShadowCss = new BoxShadowCss(BoxShadowCss.DEFAULT_OFFSET_X, BoxShadowCss.DEFAULT_OFFSET_Y, BoxShadowCss.DEFAULT_COLOR)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    createInitValue(): BoxShadowStruct
    {
        let el = new BoxShadowStruct()
        el.id = null
        el.offsetX = BoxShadowCss.DEFAULT_OFFSET_X
        el.offsetY = BoxShadowCss.DEFAULT_OFFSET_Y
        el.blur = BoxShadowCss.DEFAULT_BLUR
        el.spread = BoxShadowCss.DEFAULT_SPREAD
        
        var unitOffX = BoxShadowCss.DEFAULT_OFFSET_X_UNIT
        var unitOffY = BoxShadowCss.DEFAULT_OFFSET_Y_UNIT
        var unitBlur = BoxShadowCss.DEFAULT_BLUR_UNIT
        var unitSpread = BoxShadowCss.DEFAULT_SPREAD_UNIT
        var unitColor = BoxShadowCss.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(BoxShadowCss.DEFAULT_COLOR)
        } else {
            el.color = BoxShadowCss.DEFAULT_COLOR
        }
        
        el.offsetXUnit = unitOffX
        el.offsetYUnit = unitOffY
        el.blurUnit = unitBlur
        el.spreadUnit = unitSpread
        el.colorUnit = unitColor

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
            let copy = _.cloneDeep(this.getProperty())

            let el = this.createInitValue()
            
            copy.addValue(el)
            
            this.setProperty(copy)
            this.setTmpPropertyToModel(copy)
            // if (clearval) {
            //     this.getProperty().setValue(clearval)
            // } else {
            //     this.getProperty().setValue(this.getDefaultVal())
            //     this.getProperty().setUnit(this.getDefaultUnit())   
            // }
        }

        
    }

    deactivePropCss(prop: BoxShadowCss) {
        this.value.cssAccessor.removePropWithName(prop.getName())
        prop.id = null
        prop.setActive(false)

        for (const val of prop.getValues()) {
            val.id = null
        }

        console.log('deactivePropCss color');

        this.value.synchronize()
        return null
    }
}