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
   
}