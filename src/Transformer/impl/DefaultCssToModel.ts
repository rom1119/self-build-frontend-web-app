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
import CssDoubleValue from '../../Css/CssDoubleValue';
import CssTripleValue from '~/src/Css/CssTripleValue';
import BaseBorderCss from '../../Css/Border/BaseBorderCss';
import CssResource from '~/src/Css/CssResource';
import CssMultipleValue from '../../Css/CssMultipleValue';
import { BaseShadowStruct } from '~/src/Css/Shadow/BaseShadowCss';
import StyleCssValue from '../../Api/StyleCssValue';
import { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import TextShadowCss from '../../Css/Shadow/TextShadowCss';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
export default class DefaultCssToModel implements CssToModel
{

    private cssFactoryFromName: CssPropertyFactoryFromName
    private unitCssFactoryFromName: UnitCssPropertyFactoryFromName
    // private styleTransformer: ModelToCss

    constructor()
    {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        this.unitCssFactoryFromName = new UnitCssPropertyFactoryFromName()
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }

    transform(domain: BasePropertyCss): StyleCss {
        var value = domain.getClearValue()
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        let model = new StyleCssModel(domain.getName(), value, domain.getUnit().name)
        model.id = domain.id

        // @ts-ignore
        if (typeof domain.getResource === 'function') {
            var domainResource: CssResource = <CssResource><unknown>domain
            model.setResourcePath(domainResource.getResource())
        }
        
        // @ts-ignore
        if (typeof domain.getWidth === 'function') {
            var domainCastBorder: BaseBorderCss = <BaseBorderCss><unknown>domain
            model.setValue(domainCastBorder.getClearWidth())
            model.setUnitName(domainCastBorder.getUnit().name)
        }
        // @ts-ignore
        if (typeof domain.getSecondValue === 'function') {
            var domainCast: CssDoubleValue = <CssDoubleValue><unknown>domain
            model.setValueSecond(domainCast.getSecondValue())
            model.setUnitNameSecond(domainCast.getSecondUnit().name)
        }
        
        // @ts-ignore
        if (typeof domain.getValues === 'function') {
            
            this.transformShadows(domain, model)
            this.transformTransition(domain, model)
            model.setAsMultiple()
            // model.setValueSecond(domainCast.getSecondValue())
            // model.setUnitNameSecond(domainCast.getSecondUnit().name)
        }

        // @ts-ignore
        if (typeof domain.getThirdValue === 'function') {
            var domainCastThird: CssTripleValue = <CssTripleValue><unknown>domain
            if (typeof domainCastThird.getThirdValue() === 'object') {
                var valueJsonStr = JSON.stringify(domainCastThird.getThirdValue())
                model.setValueThird(valueJsonStr)
            } else {
                model.setValueThird(domainCastThird.getThirdValue())

            }

            model.setUnitNameThird(domainCastThird.getThirdUnit().name)
        }
        // this.cssFactoryFromName.create(model.getKey())
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // domain.setValue(model.getValue())
        // domain.setUnit(unit)
        // domain.id = model.id

        // console.log(domain);
                    
        return model

    }

    private transformShadows(domain: BasePropertyCss, model: StyleCssModel)
    {
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

    private transformTransition(domain: BasePropertyCss, model: StyleCssModel)
    {
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
   
}