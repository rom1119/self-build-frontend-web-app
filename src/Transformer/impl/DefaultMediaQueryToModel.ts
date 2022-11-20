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
import MediaQueryToModel from '../MediaQueryToModel';
import MediaQueryCss from '../../MediaQuery/MediaQueryCss';
import MediaQuery from '../../Api/MediaQuery';
export default class DefaultMediaQueryToModel implements MediaQueryToModel {

    private cssFactoryFromName: CssPropertyFactoryFromName
    private unitCssFactoryFromName: UnitCssPropertyFactoryFromName
    // private styleTransformer: ModelToCss

    constructor() {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        this.unitCssFactoryFromName = new UnitCssPropertyFactoryFromName()
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }

    transform(domain: MediaQueryCss): MediaQuery {
        // var value = domain.getClearValue()
        // if (typeof value === 'object') {
        //     value = JSON.stringify(value)
        // }
        let model = new MediaQuery()
        model.id = domain.id
        model.projectId = domain.projectId
        model.version = domain.version
        model.name = domain.name

        if (typeof domain.color === 'object') {
            var valueJsonStr = JSON.stringify(domain.color)
            model.color = valueJsonStr
        } else {
            model.color = domain.color
        }
        model.colorUnitName = domain.colorUnit.name

        var values = []
        for (const valCss of domain.getValues()) {

            // valCss
            let el = new StyleCssValue(null, null)
            el.id = valCss.id
            if (valCss.mediaQueryOperatorFirst) {
                el.setValue(valCss.mediaQueryOperatorFirst.getValue())
                el.setUnitName(Named.PROP_NAME)
            }

            if (valCss.mediaType) {
                el.setValueSecond(valCss.mediaType.getValue())
                el.setUnitNameSecond(Named.PROP_NAME)

            }

            if (valCss.mediaQueryOperator) {
                el.setValueThird(valCss.mediaQueryOperator.getValue())
                el.setUnitNameThird(Named.PROP_NAME)

            }

            if (valCss.mediaFeature) {
                el.setValueFourth(valCss.mediaFeature.getValue())
                el.setUnitNameFourth(Named.PROP_NAME)

            }
            if (valCss.featureVal) {
                el.setValueFifth(valCss.featureVal)

            }
            if (valCss.orientation) {
                el.setValueSixth(valCss.orientation.getValue())
                el.setUnitNameSixth(Named.PROP_NAME)

            }
            // var color = valCss.color
            // if (typeof color === 'object') {
            //     var valueJsonStr = JSON.stringify(color)
            //     el.setValueFourth(valueJsonStr)
            // } else {
            //     el.setValueFourth(color)
            // }

            if (valCss.featureValUnit) {
                el.setUnitNameFifth(valCss.featureValUnit.name)
            }

            values.push(el)
        }

        model.values = []
        model.values = values

        console.log('mediatomodel')
        console.log(model)
        console.log(domain)
        // this.cssFactoryFromName.create(model.getKey())
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // domain.setValue(model.getValue())
        // domain.setUnit(unit)
        // domain.id = model.id

        // console.log(domain);

        return model

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
