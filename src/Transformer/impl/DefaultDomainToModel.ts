import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import HtmlTag from '../../Layout/HtmlTag';
import CssToModel from '../CssToModel';
import DefaultCssToModel from './DefaultCssToModel';
export default class DefaultDomainToModel implements DomainToModel
{

    private styleTransformer: CssToModel
    
    constructor()
    {
        this.styleTransformer = new DefaultCssToModel()
    }
    transform(domain: HtmlTag): TagDto {
        var tagName = domain.getTagName()

        let model = new TagDto()
        model.id = domain.uuid
        model.tagName = tagName
        model.projectId = domain.projectId
        model.version = domain.version

        // let domain = this.htmlTagFactory.create(model.tagName)
        // console.log('LLLLLLLLLLLLL');
        // console.log(model);

        if (domain.cssAccessor.all.length) {
            for (const style of domain.cssAccessor.all) {
                let subModel = this.styleTransformer.transform(style)
                model.styles.push(subModel)
                // domain..push(subModel)
            }
        }


        return model

    }
   
}