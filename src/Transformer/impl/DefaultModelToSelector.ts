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
import SelectorFactoryFromName from '../../Factory/SelectorFactoryFromName';
import BaseMediaQueryComponent from "~/components/BaseMediaQueryComponent";
import KeyFrameSelector from '../../Animation/KeyFrameSelector';
import SelectorOwner from '../../SelectorOwner';
import BaseSelector from '../../BaseSelector';
import PercentKeyFrameSelector from '../../Animation/keyFrameSelectors/PercentKeyFrameSelector';
export default class DefaultModelToSelector implements ModelToSelector
{

    private htmlTagFactory: HtmlTagFactoryFromName
    private selectorFactoryFromName: SelectorFactoryFromName
    private styleTransformer: ModelToCss

    protected withKeyFrameSelector = false

    constructor()
    {
        this.styleTransformer = new DefaultModelToCss()
        this.selectorFactoryFromName = new SelectorFactoryFromName()
    }

    public setWithKeyFrameSelectors() {
        this.withKeyFrameSelector = true
    }

    transform(model: Selector, tag: SelectorOwner): BaseSelector {
        var domain = this.build(model, tag)

        return domain
    }

    build(model: Selector, tag: SelectorOwner): BaseSelector
    {

        var domain = this.selectorFactoryFromName.create(model.name)
        domain.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)

        domain.id = model.id
        domain.projectId = model.projectId
        if (domain instanceof PseudoSelector) {
            domain.delimiter = model.delimiter
        }
        if (domain instanceof PercentKeyFrameSelector) {
            domain.val = Number(model.value)

        }
        domain.setOwner(tag)
        // domain.setValue(model.value)
        domain.setVersion(model.version)
        domain.setApi(tag.api)


        if (model.styles) {
            for (const style of model.styles) {
                let subModel = this.styleTransformer.transform(style)
                if (subModel.mediaQueryId) {
                    domain.cssListMediaOwner.addCssForMedia(subModel, subModel.mediaQueryId)
                } else {
                    domain.setCss(subModel)

                }
            }
        }

        return domain
    }

}
