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
            console.log(unitBorder);
            
            domainCastBorder.setUnit(unitBorder)
            domain = domainCastBorder
            
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
        

        // console.log(domain);
                    
        return domain

    }
   
}