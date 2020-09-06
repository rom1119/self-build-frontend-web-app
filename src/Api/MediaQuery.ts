import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";
import TagDto from "./TagDto";
import Selector from "./Selector";

export default class MediaQuery
{
    id
    private _name

    tags: TagDto[]  = []
    selectors: Selector[]  = []

    constructor()
    {
        
    }

    getName(): string
    {
        return this._name
    }

    
    getTags(): TagDto[]
    {
        return this.tags

    }

    public setName(val)
    {
        this._name = val
    }

}