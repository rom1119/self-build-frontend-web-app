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
export default class DefaultModelToCss implements ModelToCss
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
 
    transform(model: StyleCss): BasePropertyCss {
        var domain = this.cssFactoryFromName.create(model.getKey())
        var unit = this.unitCssFactoryFromName.create(model.getUnitName())

        var val
        if (unit instanceof RGBA) {
            val = JSON.parse(model.getValue())
        } else {
            val = model.getValue()
        }
        domain.setValue(val)
        domain.setUnit(unit)
        domain.id = model.id

        // @ts-ignore
        if (typeof domain.getWidth === 'function') {
            
            var domainCastBorder: BaseBorderCss = <BaseBorderCss><unknown>domain
            let unitBorder = this.unitCssFactoryFromName.create(model.getUnitName())
            domainCastBorder.setWidth(Number(model.getValue()), unitBorder)
            // console.log(unitBorder);
            
            domainCastBorder.setUnit(unitBorder)
            domain = domainCastBorder
            
        }
        
        // @ts-ignore
        if (typeof domain.getResource === 'function') {
            
            var domainResource: CssResource = <CssResource><unknown>domain
            domainResource.setResource(model.getResourcePath())
            
            domain = <BasePropertyCss><unknown>domainResource
            
        }

        // @ts-ignore
        if (typeof domain.getSecondValue === 'function') {
            var domainCast: CssDoubleValue = <CssDoubleValue><unknown>domain
            domainCast.setSecondValue(model.getValueSecond())
            let unitSecond = this.unitCssFactoryFromName.create(model.getUnitNameSecond())
            domainCast.setSecondUnit(unitSecond)

            domain = <BaseBorderCss>domainCast
        }

        // @ts-ignore
        if (typeof domain.getThirdValue === 'function') {
            var domainCastThird: CssTripleValue = <CssTripleValue><unknown>domain
            let unitThird = this.unitCssFactoryFromName.create(model.getUnitNameThird())
            var val
            if (unitThird instanceof RGBA) {
                val = JSON.parse(model.getValueThird())
            } else {
                val = model.getValueThird()
            }
            domainCastThird.setThirdValue(val)
            domainCastThird.setThirdUnit(unitThird)

            domain = <BaseBorderCss>domainCastThird

        }

        // @ts-ignore
        if (typeof domain.getValues === 'function') {
            

            domain =  <BasePropertyCss><unknown>this.transformShadows(domain, model)
            
            // model.setAsMultiple()
            // model.setValues(values)
            // model.setValueSecond(domainCast.getSecondValue())
            // model.setUnitNameSecond(domainCast.getSecondUnit().name)
        }
                    
        return domain

    }

    private transformShadows(domain: BasePropertyCss, model: StyleCssModel)
    {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TextShadowStruct>
        var domainCastMultiplyValBoxShadow: CssMultipleValue<BoxShadowStruct>
        if (domain instanceof TextShadowCss) {
            domainCastMultiplyVal = <CssMultipleValue<TextShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);
            
            for (const valCss of model.getValues()) {
                    valCss
                let el = new TextShadowStruct()
                    el.id = valCss.id
                    el.offsetX = parseInt(valCss.getValue())
                    el.offsetY = parseInt(valCss.getValueSecond())
                    el.blur = parseInt(valCss.getValueThird())
                    
                    var unitOffX = this.unitCssFactoryFromName.create(valCss.getUnitName())
                    var unitOffY = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValueFourth())
                    } else {
                        el.color = valCss.getValueFourth()
                    }
                    
                    el.offsetXUnit = unitOffX
                    el.offsetYUnit = unitOffY
                    el.blurUnit = unitBlur
                    el.colorUnit = unitColor
                    // console.log(el);
                    

                    domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal
            
        } else if (domain instanceof BoxShadowCss) {
            domainCastMultiplyValBoxShadow = <CssMultipleValue<BoxShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);
            
            for (const valCss of model.getValues()) {
                    valCss
                let el = new BoxShadowStruct()
                    el.id = valCss.id
                    el.inset = valCss.getInset()
                    el.offsetX = parseInt(valCss.getValue())
                    el.offsetY = parseInt(valCss.getValueSecond())
                    el.blur = parseInt(valCss.getValueThird())
                    el.spread = parseInt(valCss.getValueFourth())
                    
                    var unitOffX = this.unitCssFactoryFromName.create(valCss.getUnitName())
                    var unitOffY = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                    var unitSpread = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFifth())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValueFifth())
                    } else {
                        el.color = valCss.getValueFifth()
                    }
                    
                    el.offsetXUnit = unitOffX
                    el.offsetYUnit = unitOffY
                    el.blurUnit = unitBlur
                    el.spreadUnit = unitSpread
                    el.colorUnit = unitColor
                    // console.log(el)

                    domainCastMultiplyValBoxShadow.addValue(el)
            }

            return domainCastMultiplyValBoxShadow
        } else {
            throw Error('Not implemented method transform CssValue for object ' + domain)
        }

    }
   
}