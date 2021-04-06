import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";
import MediaQueryCss from '../MediaQuery/MediaQueryCss';
import FontFace from "../Fonts/FontFace";
import AssetApiService from './AssetApiService';
import AssetDomain from '../Assets/AssetDomain';
import SrcFont from '../Fonts/SrcFont';

export default interface FontFaceApiService
{
    postFontFace(arg: FontFace, projectId: string): Promise<any>
    postFontFaceSrcResource(arg: FontFace, asset: SrcFont): Promise<any>

    deleteFontFaceSrcResource(arg: FontFace, asset: SrcFont): Promise<any>

    putFontFace(arg: FontFace): Promise<any>;

    deleteFontFace(arg: FontFace): Promise<any>

}
