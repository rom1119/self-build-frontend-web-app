import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";

export default class Selector extends AggregateRoot
{
    id = ''
    projectId = ''
    name = ''
    value = ''
    version = 1
    styles: StyleCss[]  = []

}