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
            var tagName = domain.getDomainTagName()
            model.tagName = tagName
            model.projectId = domain.projectId

            if (domain instanceof Input) {
                model.text = domain.text

            }

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

                for(var cssD of item.all) {
                    if (cssD.toSaveInApi) {
                        this.styleTransformer.setMediaQuery(item.mediaQuery)
                        let subModel = this.styleTransformer.transform(cssD)
                        model.styles.push(subModel)
                        // console.log(subModel)
                        // console.log(item.mediaQuery)

                    }

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
                    model.children.push(c)
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
