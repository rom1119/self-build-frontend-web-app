import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import ModelToDomain from '../ModelToDomain';
import HtmlTagFactoryFromName from '~/src/Layout/HtmlTagFactoryFromName';
import ModelToCss from '../ModelToCss';
import DefaultModelToCss from './DefaultModelToCss';
import HtmlTag from '../../Layout/HtmlTag';
import TextNode from '../../Layout/TextNode';
import HtmlNode from '../../Layout/HtmlNode';
import HtmlTagRecalculator from '~/src/Recalculator/HtmlTagRecalculator';
import BorderRecalculate from '~/src/Recalculator/HtmlTagImpl/BorderRecalculate';
import MarginRecalculate from '~/src/Recalculator/HtmlTagImpl/MarginRecalculate';
import HtmlAttr from '../../Attribute/HtmlAttr';
import ModelToSelector from '../ModelToSelector';
import Selector from '../../Api/Selector';
import PseudoSelector from '../../PseudoSelector/PseudoSelector';
import PseudoSelectorFactoryFromName from '../../Factory/PseudoSelectorFactoryFromName';
export default class DefaultModelToSelector implements ModelToSelector
{

    private htmlTagFactory: HtmlTagFactoryFromName
    private selectorFactoryFromName: PseudoSelectorFactoryFromName
    private styleTransformer: ModelToCss

    constructor()
    { 
        this.styleTransformer = new DefaultModelToCss()
        this.selectorFactoryFromName = new PseudoSelectorFactoryFromName()
    }

    transform(model: Selector, tag: HtmlTag): PseudoSelector {
        var domain = this.build(model, tag)
                    
        return domain
    }

    build(model: Selector, tag: HtmlTag): PseudoSelector
    {
        var domain = this.selectorFactoryFromName.create(model.name)

        domain.id = model.id
        domain.projectId = model.projectId
        domain.delimiter = model.delimiter
        domain.setOwner(tag)
        // domain.setValue(model.value)
        domain.setVersion(model.version)
        domain.setApi(tag.api)

    
        if (model.styles) {
            for (const style of model.styles) {
                let subModel = this.styleTransformer.transform(style)
                domain.setCss(subModel)
            }
        }

        return domain
    }
   
}