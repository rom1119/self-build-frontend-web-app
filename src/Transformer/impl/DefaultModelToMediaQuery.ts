import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import ModelToDomain from '../ModelToDomain';
import HtmlTagFactoryFromName from '~/src/Layout/HtmlTagFactoryFromName';
import ModelToCss from '../ModelToCss';
import BasePropertyCss from '../../Css/BasePropertyCss';
import StyleCss from '~/src/Api/StyleCss';
import CssPropertyFactoryFromName from '~/src/Factory/CssPropertyFactoryFromName';
import UnitCssPropertyFactoryFromName from '~/src/Factory/UnitCssPropertyFactoryFromName';
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import CssTripleValue from '~/src/Css/CssTripleValue';
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss';
import RGBA from '../../Unit/Color/RGBA';
import CssResource from '~/src/Css/CssResource';
import TextShadowCss, { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import CssMultipleValue from '~/src/Css/CssMultipleValue';
import RGB from '~/src/Unit/Color/RGB';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import StyleCssModel from '~/types/StyleCssModel';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
import TimingFunctionFactoryFromName from '~/src/Factory/TimingFunctionFactoryFromName';
import { BackgroundImage } from '~/src/Css';
import BaseGradientCss from '../../Css/Gradient/BaseGradientCss';
import { RadialGradientStructVal, RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import { LinearGradientStructVal, LinearGradientDirection } from '~/src/Css/Gradient/impl/LinearGradientCss';
import LinearGradientCss from '../../Css/Gradient/impl/LinearGradientCss';
import StyleCssValue from '~/src/Api/StyleCssValue';
import RadialGradientCss from '../../Css/Gradient/impl/RadialGradientCss';
import MediaQuery from '../../Api/MediaQuery';
import MediaQueryCss from '../../MediaQuery/MediaQueryCss';
import MediaQueryOperator from '../../MediaQuery/MediaQueryOperator';
import MediaFeature from '../../MediaQuery/MediaFeature';
import MediaType from '../../MediaQuery/MediaType';
import MediaOrientation from '~/src/MediaQuery/MediaOrientation';
import ModelToMediaQuery from '../ModelToMediaQuery';
import MediaQueryFactory from "~/src/MediaQuery/MediaQueryFactory";
import {MediaQueryStructVal} from "~/src/MediaQuery/BaseMediaQueryCss";
export default class DefaultModelToMediaQuery implements ModelToMediaQuery
{

    private cssFactoryFromName: CssPropertyFactoryFromName
    private unitCssFactoryFromName: UnitCssPropertyFactoryFromName
    private timingFunctionFactoryFromName: TimingFunctionFactoryFromName
    private mediaQueryFactory: MediaQueryFactory
    // private styleTransformer: ModelToCss

    constructor(mediaQueryFactory: MediaQueryFactory)
    {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        this.unitCssFactoryFromName = new UnitCssPropertyFactoryFromName()
        this.timingFunctionFactoryFromName = new TimingFunctionFactoryFromName()
        this.mediaQueryFactory = mediaQueryFactory
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }

    transform(model: MediaQuery): MediaQueryCss {
        var domain = this.mediaQueryFactory.create()
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // console.log(domain);

        // var val
        // if (unit instanceof RGBA) {
        //     val = JSON.parse(model.getValue())
        // } else {
        //     val = model.getValue()
        // }
        // domain.setValue(val)
        // domain.setUnit(unit)
        domain.id = model.id
        domain.projectId = model.projectId
        domain.name = model.name
        domain.version = model.version
        domain.values = []

        if (model.colorUnitName) {
            var unitColor = this.unitCssFactoryFromName.create(model.colorUnitName)

            var val
            if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                val = JSON.parse(model.color)
            } else {
                val = model.color
            }

            domain.color = val

            domain.colorUnit = unitColor

        }

        for (const valCss of model.values) {
            // valCss
        let el = new MediaQueryStructVal()
            el.id = valCss.id
            el.mediaQueryOperator = new MediaQueryOperator(valCss.getValue())
            el.mediaType = new MediaType(valCss.getValueSecond())
            if (valCss.getValueThird()) {
                el.mediaFeature = new MediaFeature(valCss.getValueThird())
                el.featureVal = Number(valCss.getValueFourth())

            }
            if (valCss.getValueFifth()) {
                el.orientation = new MediaOrientation(valCss.getValueFifth())

            }

            var unit = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())


            el.featureValUnit = unit

            domain.addValue(el)
        }
            // newDominTransition = <BasePropertyCss><unknown>this.transformTransition(domain, model)
            // newDominGradient = <BasePropertyCss><unknown>this.transformGradient(domain, model)
            // if (newDominShadow) {
            //     domain = newDominShadow
            // } else if (newDominTransition) {
            //     domain = newDominTransition
            // } else if (newDominGradient) {
            //     domain = newDominGradient
            // }

            // model.setAsMultiple()
            // model.setValues(values)
            // model.setValueSecond(domainCast.getSecondValue())
            // model.setUnitNameSecond(domainCast.getSecondUnit().name)


        return domain

    }

}
