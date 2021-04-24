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
import KeyFrame from '../Animation/KeyFrame';

export default interface KeyFrameApiService
{
    postKeyFrame(arg: KeyFrame, projectId: string): Promise<any>
    putKeyFrame(arg: KeyFrame): Promise<any>;

    deleteKeyFrame(arg: KeyFrame): Promise<any>

}
