import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";

export default class Selector extends AggregateRoot
{
    id = ''
    projectId = ''
    name = ''
    value = ''
    delimiter = ''
    version = 1
    styles: StyleCss[]  = []

}