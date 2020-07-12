import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import Selector from '../Api/Selector';
export default interface SelectorToModel
{
    /**
     * transform
     */
    transform(domain: PseudoSelector) : Selector 
}