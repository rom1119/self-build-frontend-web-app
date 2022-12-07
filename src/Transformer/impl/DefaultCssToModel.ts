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
import CssToModel from '../CssToModel';
import StyleCssModel from '~/types/StyleCssModel';
import CssWithTwoValues from '../../Css/MultiValuesCss/CssWithTwoValues';
import CssWithThreeValues from '~/src/Css/MultiValuesCss/CssWithThreeValues';
import BaseBorderCss from '../../Css/Border/BaseBorderCss';
import CssResource from '~/src/Css/CssResource';
import CssMultipleValue from '../../Css/CssMultipleValue';
import { BaseShadowStruct } from '~/src/Css/Shadow/BaseShadowCss';
import StyleCssValue from '../../Api/StyleCssValue';
import { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import TextShadowCss from '../../Css/Shadow/TextShadowCss';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
import BackgroundImage from '../../Css/Background/BackgroundImage';
import { BaseGradientStructVal } from '~/src/Css/Gradient/BaseGradientCss';
import LinearGradientCss, { LinearGradientDirection, LinearGradientStructVal } from '../../Css/Gradient/impl/LinearGradientCss';
import RadialGradientCss, { RadialGradientStructVal, RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import { Named } from '~/src/Unit';
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import FontFamily from '../../Css/Text/FontFamily';
import FontFamilyValDomain from '../../Fonts/FontFamilyValDomain';
import { AnimationCssStruct } from '../../Css/Animation/AnimationCss';
import AnimationCss from '../../Css/Animation/AnimationCss';
import { TransformCssStruct } from '../../Css/ThreeDimensional/TransformCss';
import TransformCss from '../../Css/ThreeDimensional/TransformCss';
import TransformTypeToCssValueModel from './TransformTypeToCssValueModel';
import CssWithFourValues from '../../Css/MultiValuesCss/CssWithFourValues';
import CssWithFiveValues from '../../Css/MultiValuesCss/CssWithFiveValues';
export default class DefaultCssToModel implements CssToModel {

    private cssFactoryFromName: CssPropertyFactoryFromName
    private unitCssFactoryFromName: UnitCssPropertyFactoryFromName

    private transformTypeToCssValueModel: TransformTypeToCssValueModel
    // private styleTransformer: ModelToCss

    private mediaQuery: BaseMediaQueryCss

    constructor() {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        this.unitCssFactoryFromName = new UnitCssPropertyFactoryFromName()
        this.transformTypeToCssValueModel = new TransformTypeToCssValueModel()
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }


    setMediaQuery(value: BaseMediaQueryCss) {
        this.mediaQuery = value;
    }

    transform(domain: BasePropertyCss): StyleCss {
        var value = domain.getClearValue()
        if (typeof value === 'object' &&
            !(domain instanceof FontFamily) &&
            !(domain instanceof AnimationCss)
        ) {
            value = JSON.stringify(value)
        }
        let model = new StyleCssModel(domain.getName(), value, domain.getUnit().name)
        model.id = domain.id

        if (domain instanceof BackgroundImage) {

            if (domain.getGradients().length > 0) {
                for (const gradient of domain.getGradients()) {
                    var child = this.transform(gradient)
                    model.getChildren().push(child)
                }

                return model

            }
            model.setResourcePath(domain.getResource())
            model.setResourceUrl(domain.getResourceUrl())
        }

        // @ts-ignore
        if ( domain.gradient != null) {
            var domainResource: CssResource = <CssResource><unknown>domain
            // @ts-ignore
            var child = this.transform(domain.gradient)
            model.getChildren().push(child)
        }

        // @ts-ignore
        if (typeof domain.getResource === 'function') {
            var domainResource: CssResource = <CssResource><unknown>domain
            model.setResourcePath(domainResource.getResource())
        }

        // @ts-ignore
        if ( domain.resourceUrl != null) {
            var domainResource: CssResource = <CssResource><unknown>domain
            // @ts-ignore
            model.setResourceUrl(domain.resourceUrl)
        }

        // @ts-ignore
        if (typeof domain.getWidth === 'function') {
            var domainCastBorder: BaseBorderCss = <BaseBorderCss><unknown>domain
            model.setValue(domainCastBorder.getClearWidth())
            model.setUnitName(domainCastBorder.getUnit().name)
        }
        // @ts-ignore
        if (typeof domain.getSecondValue === 'function') {
            var domainCast: CssWithTwoValues = <CssWithTwoValues><unknown>domain
            model.setValueSecond(domainCast.getSecondValue())
            if (domainCast.getSecondUnit()) {
                model.setUnitNameSecond(domainCast.getSecondUnit().name)

            }
        }

        // @ts-ignore
        if (typeof domain.getValues === 'function') {

            this.transformShadows(domain, model)
            this.transformTransition(domain, model)
            this.transformGradient(domain, model)
            this.transformFontFamily(domain, model)
            this.transformAnimation(domain, model)
            this.transformCssTransform(domain, model)
            model.setAsMultiple()
            // model.setValueSecond(domainCast.getSecondValue())
            // model.setUnitNameSecond(domainCast.getSecondUnit().name)
        }

        // @ts-ignore
        if (typeof domain.getThirdValue === 'function') {
            var domainCastThird: CssWithThreeValues = <CssWithThreeValues><unknown>domain
            if (typeof domainCastThird.getThirdValue() === 'object') {
                var valueJsonStr = JSON.stringify(domainCastThird.getThirdValue())
                model.setValueThird(valueJsonStr)
            } else {
                model.setValueThird(domainCastThird.getThirdValue())

            }

            model.setUnitNameThird(domainCastThird.getThirdUnit().name)
        }

        // @ts-ignore
        if (typeof domain.getFourthValue === 'function') {
            var domainCastFourth: CssWithFourValues = <CssWithFourValues><unknown>domain
            if (typeof domainCastFourth.getFourthValue() === 'object') {
                var valueJsonStr = JSON.stringify(domainCastFourth.getFourthValue())
                model.setValueFourth(valueJsonStr)
            } else {
                model.setValueFourth(domainCastFourth.getFourthValue())

            }

            model.setUnitNameFourth(domainCastFourth.getFourthUnit().name)
        }

        // @ts-ignore
        if (typeof domain.getFifthValue === 'function') {
            var domainCastFifth: CssWithFiveValues = <CssWithFiveValues><unknown>domain
            if (typeof domainCastFifth.getFifthValue() === 'object') {
                var valueJsonStr = JSON.stringify(domainCastFifth.getFifthValue())
                model.setValueFifth(valueJsonStr)
            } else {
                model.setValueFifth(domainCastFifth.getFifthValue())

            }

            model.setUnitNameFifth(domainCastFifth.getFifthUnit().name)
        }

        if (this.mediaQuery) {
            model.mediaQueryId = this.mediaQuery.id
        }
        // this.cssFactoryFromName.create(model.getKey())
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // domain.setValue(model.getValue())
        // domain.setUnit(unit)
        // domain.id = model.id

        // console.log(domain);
        this.mediaQuery = null

        return model

    }

    private transformFontFamily(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<FontFamilyValDomain>
        // console.log('transformFontFamily');

        if (domain instanceof FontFamily) {
            domainCastMultiplyVal = <CssMultipleValue<FontFamilyValDomain>><unknown>domain

            for (const valCss of domainCastMultiplyVal.getValues()) {

                let el = new StyleCssValue(valCss.getName(), Named.PROP_NAME)
                el.id = valCss.id
                el.setValueSecond(valCss.getType())
                el.setUnitNameSecond(Named.PROP_NAME)
                if (valCss.fontFace) {
                    el.setValueThird(valCss.fontFace.id)
                    el.setUnitNameThird(Named.PROP_NAME)

                }

                values.push(el)
            }

            model.setValue(null)
            model.setValues(values)
        }

    }
    private transformShadows(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TextShadowStruct>
        var domainCastMultiplyValBoxShadow: CssMultipleValue<BoxShadowStruct>
        if (domain instanceof TextShadowCss) {
            domainCastMultiplyVal = <CssMultipleValue<TextShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of domainCastMultiplyVal.getValues()) {
                valCss
                let el = new StyleCssValue(valCss.offsetX, valCss.offsetXUnit.name)
                el.id = valCss.id
                el.setValue(valCss.offsetX)
                el.setValueSecond(valCss.offsetY)
                el.setValueThird(valCss.blur)
                var color = valCss.color
                if (typeof color === 'object') {
                    var valueJsonStr = JSON.stringify(color)
                    el.setValueFourth(valueJsonStr)
                } else {
                    el.setValueFourth(color)
                }

                el.setUnitName(valCss.offsetXUnit.name)
                el.setUnitNameSecond(valCss.offsetYUnit.name)
                el.setUnitNameThird(valCss.blurUnit.name)
                el.setUnitNameFourth(valCss.colorUnit.name)

                values.push(el)
            }

            model.setValue(null)
            model.setValues(values)

        } else if (domain instanceof BoxShadowCss) {
            domainCastMultiplyValBoxShadow = <CssMultipleValue<BoxShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of domainCastMultiplyValBoxShadow.getValues()) {
                valCss
                let el = new StyleCssValue(valCss.offsetX, valCss.offsetXUnit.name)
                el.id = valCss.id
                el.setInset(valCss.inset)
                el.setValue(valCss.offsetX)
                el.setValueSecond(valCss.offsetY)
                el.setValueThird(valCss.blur)
                el.setValueFourth(valCss.spread)
                var color = valCss.color
                if (typeof color === 'object') {
                    var valueJsonStr = JSON.stringify(color)
                    el.setValueFifth(valueJsonStr)
                } else {
                    el.setValueFifth(color)
                }

                el.setUnitName(valCss.offsetXUnit.name)
                el.setUnitNameSecond(valCss.offsetYUnit.name)
                el.setUnitNameThird(valCss.blurUnit.name)
                el.setUnitNameFourth(valCss.spreadUnit.name)
                el.setUnitNameFifth(valCss.colorUnit.name)


                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)
        }

    }

    private transformCssTransform(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TransformCssStruct>
        if (domain instanceof TransformCss) {
            domainCastMultiplyVal = <CssMultipleValue<TransformCssStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of domainCastMultiplyVal.getValues()) {
                valCss
                let el = this.transformTypeToCssValueModel.transform(valCss)

                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)

        }
    }
    private transformAnimation(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<AnimationCssStruct>
        if (domain instanceof AnimationCss) {
            domainCastMultiplyVal = <CssMultipleValue<AnimationCssStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of domainCastMultiplyVal.getValues()) {
                valCss
                let el = new StyleCssValue(valCss.keyFrameName, Named.PROP_NAME)
                el.id = valCss.id

                el.setValueSecond(valCss.duration)
                el.setValueThird(valCss.timingFunction.getValue())
                el.setValueFourth(valCss.delay)
                el.setValueFifth(valCss.iterationCount)
                el.setValueSixth(valCss.direction)
                el.setValueSeventh(valCss.fillMode)
                el.setValueEighth(valCss.playState)

                if (valCss.keyFrame) {
                    el.setValueNinth(valCss.keyFrameId)
                    el.setUnitNameNinth(Named.PROP_NAME)

                }
                // var color = valCss.color
                // if (typeof color === 'object') {
                //     var valueJsonStr = JSON.stringify(color)
                //     el.setValueFourth(valueJsonStr)
                // } else {
                //     el.setValueFourth(color)
                // }

                // el.setUnitName(valCss.propertyNameUnit.name)
                el.setUnitNameSecond(valCss.durationUnit.name)
                el.setUnitNameThird(Named.PROP_NAME)
                el.setUnitNameFourth(valCss.delayUnit.name)
                el.setUnitNameFifth(Named.PROP_NAME)
                el.setUnitNameSixth(Named.PROP_NAME)
                el.setUnitNameSeventh(Named.PROP_NAME)
                el.setUnitNameEighth(Named.PROP_NAME)

                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)

        }

    }

    private transformTransition(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TransitionStruct>
        if (domain instanceof TransitionCss) {
            domainCastMultiplyVal = <CssMultipleValue<TransitionStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of domainCastMultiplyVal.getValues()) {
                valCss
                let el = new StyleCssValue(valCss.propertyName, valCss.propertyNameUnit.name)
                el.id = valCss.id
                if (valCss.all) {
                    el.setValue('all')

                } else {
                    el.setValue(valCss.getPropertyName())

                }
                el.setValueSecond(valCss.duration)
                el.setValueThird(valCss.timingFunction.getValue())
                el.setValueFourth(valCss.delay)
                // var color = valCss.color
                // if (typeof color === 'object') {
                //     var valueJsonStr = JSON.stringify(color)
                //     el.setValueFourth(valueJsonStr)
                // } else {
                //     el.setValueFourth(color)
                // }

                el.setUnitName(valCss.propertyNameUnit.name)
                el.setUnitNameSecond(valCss.durationUnit.name)
                el.setUnitNameThird(valCss.timingFunctionUnit.name)
                el.setUnitNameFourth(valCss.delayUnit.name)

                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)

        }

    }

    private transformGradient(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<LinearGradientStructVal>
        var domainCastMultiplyValRadial: CssMultipleValue<RadialGradientStructVal>

        if (domain instanceof LinearGradientCss) {
            domainCastMultiplyVal = <CssMultipleValue<LinearGradientStructVal>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);
            let direc = <LinearGradientDirection>domain.direction
            if (domain.direction.getFullValue()) {
                var el = new StyleCssValue(direc.direction, direc.directionUnit.name)
                el.id = direc.id
                el.setValue(direc.direction)
                el.setSpecialValGradient(true)
                el.setUnitName(direc.directionUnit.name)
                values.push(el)
            }


            for (const valCss of domainCastMultiplyVal.getValues()) {

                var el = new StyleCssValue(valCss.color, valCss.colorUnit.name)
                el.id = valCss.id

                el.setValue(valCss.color)
                el.setValueSecond(valCss.size)
                var color = valCss.color
                if (typeof color === 'object') {
                    var valueJsonStr = JSON.stringify(color)
                    el.setValue(valueJsonStr)
                } else {
                    el.setValue(color)
                }

                el.setUnitName(valCss.colorUnit.name)
                el.setUnitNameSecond(valCss.sizeUnit.name)

                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)

        } else if (domain instanceof RadialGradientCss) {
            domainCastMultiplyValRadial = <CssMultipleValue<RadialGradientStructVal>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-MODEL');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);
            let direc = <RadialGradientDirection>domain.direction
            if (domain.direction.getFullValue()) {
                var el = new StyleCssValue(direc.shape, Named.PROP_NAME)
                el.id = direc.id
                el.setSpecialValGradient(true)
                el.setValue(direc.shape)
                el.setValueSecond(direc.size)
                el.setValueThird(direc.xPos)
                el.setValueFourth(direc.yPos)

                el.setUnitName(Named.PROP_NAME)
                el.setUnitNameSecond(Named.PROP_NAME)
                el.setUnitNameThird(direc.xPosUnit.name)
                el.setUnitNameFourth(direc.yPosUnit.name)

                values.push(el)

            }

            for (const valCss of domainCastMultiplyValRadial.getValues()) {

                var el = new StyleCssValue(valCss.color, valCss.colorUnit.name)
                el.id = valCss.id

                el.setValue(valCss.color)
                el.setValueSecond(valCss.size)
                var color = valCss.color
                if (typeof color === 'object') {
                    var valueJsonStr = JSON.stringify(color)
                    el.setValue(valueJsonStr)
                } else {
                    el.setValue(color)
                }

                el.setUnitName(valCss.colorUnit.name)
                el.setUnitNameSecond(valCss.sizeUnit.name)

                values.push(el)
            }
            model.setValue(null)
            model.setValues(values)

        }

    }

}
