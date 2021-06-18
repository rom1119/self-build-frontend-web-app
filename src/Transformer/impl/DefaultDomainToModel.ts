import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import HtmlTag from '../../Layout/HtmlTag';
import CssToModel from '../CssToModel';
import DefaultCssToModel from './DefaultCssToModel';
import TextNode from '../../Layout/TextNode';
import Input from '../../Layout/tag/Form/Input';
import SelectorToModel from '../SelectorToModel';
import DefaultSelectorToModel from './DefaultSelectorToModel';
import CssListAndMediaQueryAccessor from "~/src/Css/PropertyAccessor/mediaQuery/CssListAndMediaQueryAccessor";
import CssResource from '~/src/Css/CssResource';
import TagResource from '~/src/Css/TagResource';
import ImgTag from '~/src/Layout/tag/ImgTag';
import SvgTag from '~/src/Layout/tag/SvgTag';
import MediaQueryPseudoSelectorAccessor from '../../Css/MediaQueryPseudoSelectorAccessor';
import PseudoClass from '../../PseudoSelector/PseudoClass';
export default class DefaultDomainToModel implements DomainToModel
{

    private styleTransformer: CssToModel
    private selectorTransformer: SelectorToModel

    constructor()
    {
        this.styleTransformer = new DefaultCssToModel()
        this.selectorTransformer = new DefaultSelectorToModel()
    }
    transform(domain: LayoutEl, deep?: boolean): TagDto {
        let model = new TagDto()
        model.id = domain.uuid
        model.shortUUID = domain.shortUUID

        if (domain instanceof HtmlTag) {
            if (domain.visibilityHidden) {
                return null
            }
            var tagName = domain.getDomainTagName()
            model.tagName = tagName
            model.projectId = domain.projectId

            if (domain instanceof Input) {
                model.text = domain.text
                
            }
            if (domain instanceof SvgTag) {
                model.setSvgContent(domain.getSvgContent())
            }

            if (domain instanceof ImgTag) {
                model.setResourcePath(domain.srcAttr.getResource())
                model.setResourceUrl(domain.srcAttr.getResourceUrl() )
                
            }
            
            // // @ts-ignore
            // if ( domain.srcAttr) {
            //     var domainResource: TagResource = <TagResource><unknown>domain
            //     model.setResourcePath(domainResource.srcAttr.getResource())
            // }

            model.isClosingTag = domain.isClosingTag
            if (domain.cssAccessor.all.length) {
                for (const style of domain.cssAccessor.all) {
                    if (style.toSaveInApi) {
                        let subModel = this.styleTransformer.transform(style)
                        model.styles.push(subModel)

                    }
                    // domain..push(subModel)
                }
            }
            // console.log('to model')
            // console.log(domain.cssListMediaOwner.getMediaQueryCssList())
            for(var mediaCssKey in domain.cssListMediaOwner.getMediaQueryCssList()) {
            // console.log(mediaCssKey)
                var item: CssListAndMediaQueryAccessor<HtmlTag> = domain.cssListMediaOwner.getMediaQueryCssList()[mediaCssKey]
            // console.log(item.all)

                for(let cssD of item.all) {
                    if (cssD.toSaveInApi) {
                        this.styleTransformer.setMediaQuery(item.mediaQuery)
                        let subModel = this.styleTransformer.transform(cssD)
                        model.styles.push(subModel)
                        // console.log(subModel)
                        // console.log(item.mediaQuery)

                    }

                }
            }

            for(var mediaPseudoClassKey in domain.cssListMediaOwner.getMediaQueryPseudoClassList()) {
                // console.log(mediaCssKey)
                    var itemPseudoClass: MediaQueryPseudoSelectorAccessor<PseudoClass> = domain.cssListMediaOwner.getMediaQueryPseudoClassList()[mediaPseudoClassKey]
                // console.log(item.all)
    
                    for(let cssD of itemPseudoClass.all) {
                        // this.selectorTransformer.setMediaQuery(itemPseudoClass.mediaQuery)
                        let subModel = this.selectorTransformer.transform(cssD)
                        model.selectors.push(subModel)
                        // if (cssD.toSaveInApi) {
                            // console.log(subModel)
                            // console.log(item.mediaQuery)
    
                        // }
    
                    }
                }

            if (domain.pseudoClassAccessor.all.length) {
                for (const style of domain.pseudoClassAccessor.all) {
                        
                    let subModel = this.selectorTransformer.transform(style)
                    model.selectors.push(subModel)
                    // domain..push(subModel)
                }
            }

            if (domain.pseudoElementAccessor.all.length) {
                for (const style of domain.pseudoElementAccessor.all) {
                    let subModel = this.selectorTransformer.transform(style)
                    model.selectors.push(subModel)
                    // domain..push(subModel)
                }
            }
            if (domain.attributeAccessor.all.length) {
                for (const attr of domain.attributeAccessor.all) {
                    model.attrs[attr.key] = {
                        key: attr.key,
                        value: attr.value
                    }
                    // domain..push(subModel)
                }
            }

            if (deep) {
                for (const child of domain.children) {
                    var c = this.transform(child, true)
                    if (c) {
                        model.children.push(c)
                    }
                }
            }

        } else if (domain instanceof TextNode) {
            model.isTextNode = true
            model.text = domain.text
            model.projectId = domain.projectId
        }


        model.version = domain.version

        // let domain = this.htmlTagFactory.create(model.tagName)
        // console.log('LLLLLLLLLLLLL');
        // console.log(model);



        return model

    }

}
