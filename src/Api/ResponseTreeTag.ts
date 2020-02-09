import HtmlTag from "../Layout/HtmlTag";
import ResponseTag from "./TagDto";

export default interface ResponseTreeTag
{

    getListTags(tag: HtmlTag) : ResponseTag[]

}