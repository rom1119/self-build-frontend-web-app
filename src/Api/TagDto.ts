import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";
import Selector from './Selector';

export default class TagDto extends AggregateRoot
{
    id = ''
    shortUUID = ''
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
    selectors: Selector[] = []
    
    _resourcePath
    _resourceUrl


    public setResourcePath(val)
    {
        this._resourcePath = val
    }


    public getResourcePath(): string
    {
        return this._resourcePath

    }

    public setResourceUrl(val)
    {
        this._resourceUrl = val
    }


    public getResourceUrl(): string
    {
        return this._resourceUrl

    }
}