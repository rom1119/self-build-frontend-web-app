import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, Width, Height } from "~/src/Css";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named, RGBA } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";
import Display from '../../../../../src/Css/Display/Display';
import TextShadowCss, { TextShadowStruct } from '../../../../../src/Css/Shadow/TextShadowCss';
import RGB from "~/src/Unit/Color/RGB";
import _ from 'lodash'


export default class TextShadowProperty extends BaseComputedPropertyManager<TextShadowCss> {

    protected value: HtmlTag
    DEFAULT_VAL = Display.BLOCK
    DEFAULT_UNIT = new Named()
    property: TextShadowCss = new TextShadowCss(TextShadowCss.DEFAULT_OFFSET_X, TextShadowCss.DEFAULT_OFFSET_Y, TextShadowCss.DEFAULT_COLOR)

    createInitProperty() {
        return new TextShadowCss(TextShadowCss.DEFAULT_OFFSET_X, TextShadowCss.DEFAULT_OFFSET_Y, TextShadowCss.DEFAULT_COLOR)
    }
    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    createInitValue(): TextShadowStruct
    {
        let el = new TextShadowStruct()
        el.id = null
        el.offsetX = TextShadowCss.DEFAULT_OFFSET_X
        el.offsetY = TextShadowCss.DEFAULT_OFFSET_Y
        el.blur = TextShadowCss.DEFAULT_BLUR
        
        var unitOffX = TextShadowCss.DEFAULT_OFFSET_X_UNIT
        var unitOffY = TextShadowCss.DEFAULT_OFFSET_Y_UNIT
        var unitBlur = TextShadowCss.DEFAULT_BLUR_UNIT
        var unitColor = TextShadowCss.DEFAULT_COLOR_UNIT

        var val
        if (unitColor instanceof RGBA || unitColor instanceof RGB) {
            el.color = JSON.parse(TextShadowCss.DEFAULT_COLOR)
        } else {
            el.color = TextShadowCss.DEFAULT_COLOR
        }
        
        el.offsetXUnit = unitOffX
        el.offsetYUnit = unitOffY
        el.blurUnit = unitBlur
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
            copy.clearValue()

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

    deactivePropCss(prop: TextShadowCss) {
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