import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";

export default interface ApiService 
{
    appendSelector(selector: PseudoSelector): Promise<any>

    putSelector(selector: PseudoSelector): Promise<any>;
    putCssStyleResource(arg0: CssResource): Promise<any>;
    deleteCssStyleResource(arg0: CssResource): Promise<any>;
    getTreeTags(tag: HtmlTag) : ResponseTreeTag
    appendTagToProject(tag: HtmlNode)
    appendChild(tag: HtmlNode)
    putTag(tag: HtmlTag): Promise<any>
    putText(tag: TextNode): Promise<any>
    deleteTag(tag: HtmlNode): Promise<any>
    deleteSelector(selector: PseudoSelector): Promise<any>
    deleteCssValue(val: CssValue) : Promise<any>
}