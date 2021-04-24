import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";
import TagResource from "../Css/TagResource";

export default interface SelectorApiService 
{
    appendSelector(selector: PseudoSelector): Promise<any>
    
    putSelector(selector: PseudoSelector): Promise<any>;
    deleteSelector(selector: PseudoSelector): Promise<any>
    
}