import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import BasePropertyCss from '../Css/BasePropertyCss';
import StyleCss from '../Api/StyleCss';
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import AssetDomain from '../Assets/AssetDomain';
import FontFace from '../Fonts/FontFace';
import FontFaceModel from '../../types/FontFaceModel';
export default interface FontFaceToModel
{
    /**
     * transform
     */
    transform(domain: FontFace) : FontFaceModel


}
