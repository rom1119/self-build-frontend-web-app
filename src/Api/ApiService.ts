import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";
import TagResource from "../Css/TagResource";

export default interface ApiService 
{
    putCssStyleResource(arg0: CssResource): Promise<any>;
    putTagResource(arg0: TagResource): Promise<any>;
    deleteCssStyleResource(arg0: CssResource): Promise<any>;
    deleteTagResource(arg0: CssResource): Promise<any>;
    getTreeTags(tag: HtmlTag) : ResponseTreeTag
    appendTagToProject(tag: HtmlNode)
    appendChild(tag: HtmlNode): Promise<any>
    appendChildDeep(tag: HtmlNode): Promise<any>
    putTag(tag: HtmlTag): Promise<any>
    putText(tag: TextNode): Promise<any>
    deleteTag(tag: HtmlNode): Promise<any>
    deleteCssValue(val: CssValue) : Promise<any>
}