import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
export default interface ModelToCss
{
    /**
     * transform
     */
    transform(model: StyleCss) : BasePropertyCss 
}