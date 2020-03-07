import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import ModelToDomain from '../ModelToDomain';
import HtmlTagFactoryFromName from '~/src/Layout/HtmlTagFactoryFromName';
import ModelToCss from '../ModelToCss';
import DefaultModelToCss from './DefaultModelToCss';
import HtmlTag from '../../Layout/HtmlTag';
export default class DefaultModelToDomain implements ModelToDomain
{

    private htmlTagFactory: HtmlTagFactoryFromName
    private styleTransformer: ModelToCss

    constructor()
    {
        this.htmlTagFactory = new HtmlTagFactoryFromName()
        this.styleTransformer = new DefaultModelToCss()
    }

    transform(model: TagDto): HtmlTag {
        var domain = this.buildRecursive(model, null)
                    
        return domain

    }

    buildRecursive(model: TagDto, parent: HtmlTag): HtmlTag
    {
        let domain = this.htmlTagFactory.create(model.tagName)
        domain.uuid  = model.id
        domain.version  = model.version
        domain.projectId  = model.projectId
        // console.log('LLLLLLLLLLLLL');
        // console.log(model);
        if (parent) {
            parent.children.push(domain)
            domain.parent = parent
            // domain.parent = parent
        }

        if (model.styles) {
            for (const style of model.styles) {
                let subModel = this.styleTransformer.transform(style)
                domain.updateCssPropertyWithoutModel(subModel.getName(), subModel)
                // domain..push(subModel)
            }
        }
        
        if (model.children) {
            for (const el of model.children) {
                this.buildRecursive(el, domain)
            }
        }

        return domain
    }
   
}