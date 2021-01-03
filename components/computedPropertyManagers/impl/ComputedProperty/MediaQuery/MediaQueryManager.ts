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
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import BaseMediaQueryCss, {MediaQueryStructVal} from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryFactory from "~/src/MediaQuery/MediaQueryFactory";


export default class MediaQueryManager  {

    DEFAULT_VAL = Display.BLOCK
    DEFAULT_UNIT = new Named()
    property: BaseMediaQueryCss = new MediaQueryCss()

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }


    constructor(arg: BaseMediaQueryCss) {
        this.property = arg
    }

    createInitValue(): MediaQueryStructVal
    {
        let el = new MediaQueryStructVal()
        el.id = null
        el.mediaFeature = MediaQueryStructVal.DEFAULT_MEDIA_FEATURE()
        el.mediaType = MediaQueryStructVal.DEFAULT_MEDIA_TYPE()
        el.mediaQueryOperator = MediaQueryStructVal.DEFAULT_MEDIA_QUERY_OPERATOR()

        var defaultmediasizeunit = MediaQueryStructVal.DEFAULT_MEDIA_SIZE_UNIT


        var val
        if (defaultmediasizeunit instanceof RGBA || defaultmediasizeunit instanceof RGB) {
            el.featureVal = JSON.parse(TextShadowCss.DEFAULT_COLOR)
        } else {
            el.featureVal = MediaQueryStructVal.DEFAULT_MEDIA_SIZE
        }

        el.featureValUnit = defaultmediasizeunit


        return el
    }

    init() {
        // var prop = this.getPropertyCssFromModel(this.getProperty().getName())
        // let clearval = this.getProperty().getClearValue()
        // let unit = this.getProperty().getUnit()
        //
        // if (prop) {
        //     this.setProperty(prop)
        //     this.getProperty().setActive(true)
        // } else {
        //
        //     this.getProperty().setActive(false)
        //     let copy = _.cloneDeep(this.getProperty())
        //
        //     let el = this.createInitValue()
        //     copy.clearValue()
        //
        //     copy.addValue(el)
        //
        //     this.setProperty(copy)
        //     this.setTmpPropertyToModel(copy)
        //     // if (clearval) {
        //     //     this.getProperty().setValue(clearval)
        //     // } else {
        //     //     this.getProperty().setValue(this.getDefaultVal())
        //     //     this.getProperty().setUnit(this.getDefaultUnit())
        //     // }
        // }

    }

    save(){
        this.property.synchronize()
    }

    update() {
        this.property.synchronize()

    }

    deactivePropCss(prop: TextShadowCss) {
        // this.value.cssAccessor.removePropWithName(prop.getName())
        prop.id = null
        prop.setActive(false)

        for (const val of prop.getValues()) {
            val.id = null
        }

        console.log('deactivePropCss color');

        this.property.synchronize()
        return null
    }
}
