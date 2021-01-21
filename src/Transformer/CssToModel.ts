import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
export default interface CssToModel
{
    /**
     * transform
     */
    transform(domain: BasePropertyCss) : StyleCss

    setMediaQuery(value: BaseMediaQueryCss)

}
