import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";
import TagDto from "./TagDto";
import Selector from "./Selector";

export default class MediaQuery
{
    id
    projectId
    name
    version
    color
    colorUnitName

    values: StyleCssValue[]  = []
    tags: TagDto[]  = []
    selectors: Selector[]  = []

    constructor()
    {

    }



    getTags(): TagDto[]
    {
        return this.tags

    }



}
