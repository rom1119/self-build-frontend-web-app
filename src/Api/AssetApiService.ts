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
import DomainResource from '../DomainResource';
import AssetDomain from '../Assets/AssetDomain';

export default interface AssetApiService
{
    postAsset(arg: AssetDomain): Promise<any>
    
    putAsset(arg: AssetDomain): Promise<any>;
    deleteAsset(css: AssetDomain): Promise<any>
    
}
