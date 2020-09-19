import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import Selector from '../Api/Selector';
import MediaQueryCss from '../MediaQuery/MediaQueryCss';
import MediaQuery from '../Api/MediaQuery';
export default interface MediaQueryToModel
{
    /**
     * transform
     */
    transform(domain: MediaQueryCss) : MediaQuery 
}