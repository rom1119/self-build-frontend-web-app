import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import Selector from '../Api/Selector';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import HtmlTag from '../Layout/HtmlTag';
import SelectorOwner from '../SelectorOwner';
import BaseSelector from '../BaseSelector';
export default interface ModelToSelector
{
    /**
     * transform
     */
    transform(model: Selector, tag: SelectorOwner) : BaseSelector 
    setWithKeyFrameSelectors() 
}