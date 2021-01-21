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
import PseudoSelector from '../../PseudoSelector/PseudoSelector';
import Selector from '../../Api/Selector';
import CssListAndMediaQueryAccessor from "~/src/Css/PropertyAccessor/mediaQuery/CssListAndMediaQueryAccessor";
import BaseSelector from "~/src/BaseSelector";
export default class DefaultSelectorToModel implements SelectorToModel
{

    private styleTransformer: CssToModel

    constructor()
    {
        this.styleTransformer = new DefaultCssToModel()
    }
    transform(domain: PseudoSelector): Selector {
        let model = new Selector()
        model.id = domain.id

        if (domain.cssAccessor.all.length) {
            for (const style of domain.cssAccessor.all) {
                if (style.toSaveInApi) {

                    let subModel = this.styleTransformer.transform(style)
                    model.styles.push(subModel)
                }
                // domain..push(subModel)
            }
        }

        for(var mediaCssKey in domain.cssListMediaOwner.getMediaQueryCssList()) {
            // console.log(mediaCssKey)
            var item: CssListAndMediaQueryAccessor<BaseSelector> = domain.cssListMediaOwner.getMediaQueryCssList()[mediaCssKey]
            // console.log(item.all)

            for(var cssD of item.all) {
                if (cssD.toSaveInApi) {
                    this.styleTransformer.setMediaQuery(item.mediaQuery)
                    let subModel = this.styleTransformer.transform(cssD)
                    model.styles.push(subModel)
                    console.log(subModel)
                    console.log(item.mediaQuery)

                }

            }
        }

        model.value = domain.value
        model.delimiter = domain.delimiter
        model.name = domain.getName()
        model.version = domain.getVersion()

        // let domain = this.htmlTagFactory.create(model.tagName)
        // console.log('LLLLLLLLLLLLL');
        // console.log(model);



        return model

    }

}
