import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
export default class DefaultDomainToModel implements DomainToModel
{
    transform(domain: LayoutEl): TagDto {
        var tagName = domain.getTagName()

        let model = new TagDto()
        model.tagName = tagName
        model.tagName = tagName

        return model

    }
   
}