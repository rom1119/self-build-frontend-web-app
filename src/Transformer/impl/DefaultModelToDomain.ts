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
import HtmlAttrFactory from '~/src/Attribute/HtmlAttrFactory';
import BaseMediaQueryComponent from "~/components/BaseMediaQueryComponent";
import TagResource from '~/src/Css/TagResource';
import ImgTag from '~/src/Layout/tag/ImgTag';
import SvgTag from '~/src/Layout/tag/SvgTag';
import SelectorOwner from '../../SelectorOwner';
import UnableCreateDomainTagFromName from '../../Errors/UnableCreateDomainTagFromName';
export default class DefaultModelToDomain implements ModelToDomain
{
    private htmlTagFactory: HtmlTagFactoryFromName
    private styleTransformer: ModelToCss
    private selectorTransformer: ModelToSelector
    private attrFactory: HtmlAttrFactory

    constructor()
    {
        this.htmlTagFactory = new HtmlTagFactoryFromName()
        this.styleTransformer = new DefaultModelToCss()
        this.selectorTransformer = new DefaultModelToSelector()
        this.attrFactory = new HtmlAttrFactory()
    }

    transform(model: TagDto): LayoutEl | null {
        var domain = this.buildRecursive(model, null)

        return domain

    }

    buildRecursive(model: TagDto, parent: HtmlTag): LayoutEl | null
    {


        if (model.isTextNode) {
            var domain: TextNode = this.htmlTagFactory.createText()
            domain.uuid  = model.id
            domain.shortUUID  = model.shortUUID
            domain.version  = model.version
            domain.projectId  = model.projectId
            domain.text  = model.text
            // console.log('LLLLLLLLLLLLL');
            // console.log(model);
            if (parent) {
                parent.addChild(domain)
                domain.parent = parent
                domain.projectId = parent.projectId
                // if (parent instanceof ) {

                // }
                // domain.parent = parent
            }
            return domain
        } else {
            var tagname = model.tagName
            if (tagname == 'input') {
                tagname += '-' + model.attrs.type.value
            }
            try {
                var domainTag: HtmlTag = this.htmlTagFactory.create(tagname)

            } catch (err) {
                if (err instanceof UnableCreateDomainTagFromName) {
                    console.log('%c UnableCreateDomainTagFromName', 'background: aqua;');
                    console.log(err)
                    return null;
                }
                
            }
            console.log('build domainTag', BaseMediaQueryComponent.accessorStatic)
            domainTag.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)

            if (domainTag instanceof ImgTag) {
                // model.setResourcePath()
                // model.setResourceUrl(domainTag.getResourceUrl())

                // @ts-ignore
                domainTag.srcAttr.setResource(model.getResourcePath())
                // @ts-ignore
                domainTag.srcAttr.setResourceUrl(model.getResourceUrl())
                
            }

            if (domainTag instanceof SvgTag) {
                domainTag.setSvgContent(model.getSvgContent())
            }
        
            domainTag.uuid  = model.id
            domainTag.shortUUID  = model.shortUUID
            domainTag.version  = model.version
            domainTag.projectId  = model.projectId
            // domainTag.text  = model.text

            domainTag.isClosingTag  = model.isClosingTag
            // console.log('LLLLLLLLLLLLL');
            // console.log(model);
            

            if (model.styles) {
                for (const style of model.styles) {
                    let subModel = this.styleTransformer.transform(style)
                    if (!subModel) {
                        continue
                    }
                    // console.log(style);

                    if (subModel.mediaQueryId) {
                        domainTag.cssListMediaOwner.addCssForMedia(subModel, subModel.mediaQueryId)
                    } else {
                        if (domainTag.cssAccessor.hasCssProperty(subModel.getName())) {
                            domainTag.cssAccessor.setNewPropertyValue(subModel.getName(), subModel)

                        } else {
                            domainTag.cssAccessor.addNewProperty(subModel)

                        }

                    }
                    // domainTag..push(subModel)
                    domainTag.updateModelComponent()
                }

                domainTag.synchronizeAllCssStyles()
            }

            if (model.selectors) {
                for (const selector of model.selectors) {
                    let subModel = this.selectorTransformer.transform(selector, <SelectorOwner><unknown>domainTag)
                    if (selector.mediaQueryId) {
                        if (subModel instanceof PseudoClass) {
                            domainTag.cssListMediaOwner.addPseudoClassForMedia(subModel, selector.mediaQueryId)

                        } else if (subModel instanceof PseudoElement) {
                            domainTag.cssListMediaOwner.addPseudoElementForMedia(subModel, selector.mediaQueryId)
    
                        } else {
                            throw new Error('Can not add selector for another instance for object ' + subModel.getName())
                        }
                    } else {
                        if (subModel instanceof PseudoClass) {
                            domainTag.pseudoClassAccessor.addNewSelector(subModel)
                        } else if (subModel instanceof PseudoElement) {
                            domainTag.pseudoElementAccessor.addNewSelector(subModel)
    
                        } else {
                            throw new Error('Can not add selector for another instance for object ' + subModel.getName())
                        }

                    }
                    
                    // domainTag = <HtmlTag>domainTag
                    // domainTag..push(subModel)
                    domainTag.updateModelComponent()
                }
            }

            if (model.attrs) {
                for (const attr in model.attrs) {
                    var key = model.attrs[attr].key
                    var val = model.attrs[attr].value
                    // console.log(attr);
                    // console.log();
                    // console.log(model.attrs[attr].value);
                    var attrNew = this.attrFactory.create(key)
                    attrNew.setValue(val)


                    domainTag.attributeAccessor.addNewAttribute(attrNew)
                    // domainTag.updateCssPropertyWithoutModel(subModel.getName(), subModel)
                    // domainTag..push(subModel)
                }
            }

            // this.recalculate(domainTag)
            if (parent) {
                domainTag.parent = parent
                domainTag.projectId = parent.projectId
                parent.addChild(domainTag)
                // domainTag.parent = parent
            }

            if (model.children) {
                for (const el of model.children) {
                    this.buildRecursive(el, domainTag)
                }
            }

            return domainTag
        }


        throw Error('can not create Domain Html from model')
    }

    // private recalculate(tag: HtmlTag)
    // {
    //     this.borderRecalculator.recalculate(tag)
    //     this.marginRecalculator.recalculate(tag)
    // }

}
