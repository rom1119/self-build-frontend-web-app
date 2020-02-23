import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import TagDto from '../Api/TagDto';
export default interface DomainToModel
{
    /**
     * transform
     */
    transform(domain: LayoutEl) : TagDto 
}