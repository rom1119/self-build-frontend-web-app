import HtmlTag from "../Layout/HtmlTag";
import TagDto from "./TagDto";

export default interface ResponseTreeTag
{

    getListTags(tag: HtmlTag) : TagDto[]

}