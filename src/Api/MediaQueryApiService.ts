import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";
import MediaQueryCss from '../MediaQuery/MediaQueryCss';

export default interface MediaQueryApiService 
{
    appendMedia(arg: MediaQueryCss, projectId: string): Promise<any>

    putMedia(arg: MediaQueryCss): Promise<any>;
    getAllForProject(projectId: string) : Promise<any>
   
    deleteMedia(arg: MediaQueryCss): Promise<any>

}