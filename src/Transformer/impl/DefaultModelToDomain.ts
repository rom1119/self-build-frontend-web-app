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
import DefaultModelToSelector from './DefaultModelToSelector';
import PseudoClass from '../../PseudoSelector/PseudoClass';
import PseudoElement from '~/src/PseudoSelector/PseudoElement';
export default class DefaultModelToDomain implements ModelToDomain
{

    private htmlTagFactory: HtmlTagFactoryFromName
    private styleTransformer: ModelToCss
    private selectorTransformer: ModelToSelector




    constructor()
    { 
        this.htmlTagFactory = new HtmlTagFactoryFromName()
        this.styleTransformer = new DefaultModelToCss()
        this.selectorTransformer = new DefaultModelToSelector()
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
            var tagname = model.tagName
            if (tagname == 'input') {
                tagname += '-' + model.attrs.type.value
            }
            domain = this.htmlTagFactory.create(tagname)
            domain.text  = model.text
            
            domain.isClosingTag  = model.isClosingTag
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
                    domain.updateCssPropertyWithoutModel(subModel.getName(), subModel)
                    // domain..push(subModel)
                    domain.updateModelComponent()
                }
            }
            
            if (model.selectors) {
                for (const style of model.selectors) {
                    let subModel = this.selectorTransformer.transform(style, domain)
                    // domain = <HtmlTag>domain
                    if (subModel instanceof PseudoClass) {
                        domain.pseudoClassAccessor.addNewSelector(subModel)
                    } else if (subModel instanceof PseudoElement) {
                        domain.pseudoElementAccessor.addNewSelector(subModel)

                    } else {
                        throw new Error('Can not add selector for another instance for object ' + subModel.getName())
                    }
                    // domain..push(subModel)
                    domain.updateModelComponent()
                }
            }
            
            if (model.attrs) {
                for (const attr in model.attrs) {
                    var key = model.attrs[attr].key
                    var val = model.attrs[attr].value
                    console.log(attr);
                    console.log();
                    console.log(model.attrs[attr].value);
                    domain.attributeAccessor.addNewAttribute(new HtmlAttr(key, val))
                    // domain.updateCssPropertyWithoutModel(subModel.getName(), subModel)
                    // domain..push(subModel)
                }
            }

            // this.recalculate(domain)
            
            if (model.children) {
                for (const el of model.children) {
                    this.buildRecursive(el, domain)
                }
            }

        }

        domain.uuid  = model.id
        domain.shortUUID  = model.shortUUID
        domain.version  = model.version
        domain.projectId  = model.projectId

        return domain
    }

    // private recalculate(tag: HtmlTag)
    // {
    //     this.borderRecalculator.recalculate(tag)
    //     this.marginRecalculator.recalculate(tag)
    // }
   
}