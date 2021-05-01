import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";
import LayoutEl from '../LayoutEl';
import TextNode from '../Layout/TextNode';
import HtmlNode from '../Layout/HtmlNode';
import CssResource from "../Css/CssResource";
import CssValue from '../Css/CssValue';
import PseudoSelector from "../PseudoSelector/PseudoSelector";
import TagResource from "../Css/TagResource";
import BaseSelector from '../BaseSelector';

export default interface SelectorApiService 
{
    appendSelector(selector: BaseSelector): Promise<any>
    
    putSelector(selector: BaseSelector): Promise<any>;
    deleteSelector(selector: BaseSelector): Promise<any>
    
}