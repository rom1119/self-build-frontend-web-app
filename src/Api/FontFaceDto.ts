import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";
import AssetDto from './AssetDto';

export default class FontFaceDto extends AggregateRoot
{
    projectId = ''
    name = ''

    version = 1
    src: AssetDto[]  = []

}