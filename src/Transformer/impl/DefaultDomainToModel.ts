import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import HtmlTag from '../../Layout/HtmlTag';
import CssToModel from '../CssToModel';
import DefaultCssToModel from './DefaultCssToModel';
import TextNode from '../../Layout/TextNode';
export default class DefaultDomainToModel implements DomainToModel
{

    private styleTransformer: CssToModel
    
    constructor()
    {
        this.styleTransformer = new DefaultCssToModel()
    }
    transform(domain: LayoutEl): TagDto {
        let model = new TagDto()
        model.id = domain.uuid

        if (domain instanceof HtmlTag) {
            var tagName = domain.getTagName()
            model.tagName = tagName
            if (domain.cssAccessor.all.length) {
                for (const style of domain.cssAccessor.all) {
                    let subModel = this.styleTransformer.transform(style)
                    model.styles.push(subModel)
                    // domain..push(subModel)
                }
            }
            model.projectId = domain.projectId

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