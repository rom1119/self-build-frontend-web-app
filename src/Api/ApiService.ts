import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";

export default interface ApiService 
{
    getTreeTags(tag: HtmlTag) : ResponseTreeTag
    appendTagToProject(tag: HtmlTag)
    appendChild(tag: HtmlTag)
    putTag(tag: HtmlTag): Promise<any>
    deleteTag(tag: HtmlTag) : Promise<any>
}