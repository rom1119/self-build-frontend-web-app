import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
export default interface DomainToModel<T extends BasePropertyCss, S extends BaseModel>
{
    /**
     * transform
     */
    transform(domain: T) : S 
}