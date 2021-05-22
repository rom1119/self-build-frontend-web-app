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
import AnimationCss, { AnimationCssStruct } from "~/src/Css/Animation/AnimationCss";


export default class AnimationProperty extends BaseComputedPropertyManager<AnimationCss> {

    protected value: HtmlTag
    DEFAULT_VAL = Display.BLOCK
    DEFAULT_UNIT = new Named()
    property: AnimationCss = new AnimationCss()

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

    createInitValue(): AnimationCssStruct
    {
        let el = new AnimationCssStruct()
        el.id = null
        el.delay = AnimationCss.DEFAULT_DELAY
        el.duration = AnimationCss.DEFAULT_DURATION
        el.direction = AnimationCss.DEFAULT_DIRECTION
        el.playState = AnimationCss.DEFAULT_PLAY_STATE
        el.iterationCount = AnimationCss.DEFAULT_ITERATION_COUNT
        el.fillMode = AnimationCss.DEFAULT_FILL_MODE
        el.timingFunction = AnimationCss.DEFAULT_TIMING_FUNCTION
    

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

    deactivePropCss(prop: AnimationCss) {
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