import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import TagDto from '../Api/TagDto';
import HtmlTag from '../Layout/HtmlTag';
export default interface DomainToModel
{
    /**
     * transform
     */
    transform(domain: LayoutEl, deep?: boolean) : TagDto 
}