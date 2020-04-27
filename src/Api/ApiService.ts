import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";

export default interface ApiService 
{
    putCssStyle(arg0: CssResource);
    getTreeTags(tag: HtmlTag) : ResponseTreeTag
    appendTagToProject(tag: HtmlNode)
    appendChild(tag: HtmlNode)
    putTag(tag: HtmlTag): Promise<any>
    putText(tag: TextNode): Promise<any>
    deleteTag(tag: HtmlNode) : Promise<any>
}