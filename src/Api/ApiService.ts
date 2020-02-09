import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";

export default interface ApiService 
{

    getTreeTags(tag: HtmlTag) : ResponseTreeTag
    postTag(tag: HtmlTag)
    putTag(tag: HtmlTag)
    deleteTag(tag: HtmlTag)
}