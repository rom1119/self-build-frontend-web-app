import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import Selector from '../Api/Selector';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import HtmlTag from '../Layout/HtmlTag';
import MediaQueryCss from '../MediaQuery/MediaQueryCss';
import MediaQuery from '../Api/MediaQuery';
export default interface ModelToMediaQuery
{
    /**
     * transform
     */
    transform(model: MediaQuery) : MediaQueryCss
}
