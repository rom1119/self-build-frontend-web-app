import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import AssetDomain from '../Assets/AssetDomain';
import AssetModel from '~/types/AssetModel';
export default interface ModelToAsset
{
    setDomainAsSrcFont(arg: boolean);
    /**
     * transform
     */
    transform(model: AssetModel) : AssetDomain 
}