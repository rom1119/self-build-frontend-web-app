import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import AssetDomain from '../Assets/AssetDomain';
import AssetModel from '~/types/AssetModel';
import FontFace from '~/src/Fonts/FontFace';
import FontFaceModel from '../../types/FontFaceModel';
export default interface ModelToFontTace
{
    /**
     * transform
     */
    transform(model: FontFaceModel) : FontFace 
}