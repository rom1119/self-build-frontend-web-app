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