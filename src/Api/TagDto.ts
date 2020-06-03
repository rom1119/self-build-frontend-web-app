import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";

export default class TagDto extends AggregateRoot
{
    id = ''
    projectId = ''
    tagName = ''
    isTextNode = false
    isClosingTag: boolean = true
    attrs: any = {}
    text = ''
    version = 1
    children: TagDto[]  = []
    parent: TagDto
    styles: StyleCss[]  = []

}