import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import HtmlTag from '../../Layout/HtmlTag';
export default class DefaultDomainToModel implements DomainToModel
{
    transform(domain: HtmlTag): TagDto {
        var tagName = domain.getTagName()

        let model = new TagDto()
        model.tagName = tagName
        model.tagName = tagName

        return model

    }
   
}