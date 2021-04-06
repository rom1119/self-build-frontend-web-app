import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import AssetDomain from '../Assets/AssetDomain';
import AssetModel from '~/types/AssetModel';
export default interface AssetToModel
{

    /**
     * transform
     */
    transform(domain: AssetDomain) : AssetModel


}
