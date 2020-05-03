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
export default class DefaultModelToDomain implements ModelToDomain
{

    private htmlTagFactory: HtmlTagFactoryFromName
    private styleTransformer: ModelToCss




    constructor()
    {
        
        
        this.htmlTagFactory = new HtmlTagFactoryFromName()
        this.styleTransformer = new DefaultModelToCss()
    }

    transform(model: TagDto): LayoutEl {
        var domain = this.buildRecursive(model, null)
                    
        return domain

    }

    buildRecursive(model: TagDto, parent: HtmlTag): LayoutEl
    {
        var domain
        if (model.isTextNode) {
            domain = this.htmlTagFactory.createText()
            domain.uuid  = model.id
            domain.version  = model.version
            domain.projectId  = model.projectId
            domain.text  = model.text
            // console.log('LLLLLLLLLLLLL');
            // console.log(model);
            if (parent) {
                parent.children.push(domain)
                domain.parent = parent
                domain.projectId = parent.projectId
                // domain.parent = parent
            }
        } else {
            domain = this.htmlTagFactory.create(model.tagName)
            domain.uuid  = model.id
            domain.version  = model.version
            domain.projectId  = model.projectId
            // console.log('LLLLLLLLLLLLL');
            // console.log(model);
            if (parent) {
                parent.children.push(domain)
                domain.parent = parent
                domain.projectId = parent.projectId
                // domain.parent = parent
            }
    
            if (model.styles) {
                for (const style of model.styles) {
                    let subModel = this.styleTransformer.transform(style)
                    domain.addNewPropertyCss(subModel)
                    // domain..push(subModel)
                }
            }
            // domain.updateModelComponent()

            // this.recalculate(domain)
            
            if (model.children) {
                for (const el of model.children) {
                    this.buildRecursive(el, domain)
                }
            }

        }

        return domain
    }

    // private recalculate(tag: HtmlTag)
    // {
    //     this.borderRecalculator.recalculate(tag)
    //     this.marginRecalculator.recalculate(tag)
    // }
   
}