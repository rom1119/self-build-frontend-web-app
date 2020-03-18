import LayoutEl from '../LayoutEl';
import ApiService from '../Api/ApiService';
import HtmlTagSynchronizer from '../Synchronizer/Impl/HtmlTagSynchronizer';
import HtmlNode from './HtmlNode';
export default class TextNode extends HtmlNode
{
    isTextNode = true

    protected _text: string = "Example text"
    protected _isEdited = false

    protected synchronizer: HtmlTagSynchronizer
    api: ApiService

    public setApi(api: ApiService)
    {
        this.api = api
        this.synchronizer = new HtmlTagSynchronizer(this, api)
    }

    get text(): string
    {
        return this._text
    }
    
    set text(arg: string)
    {
        this._text = arg
        this.synchronizer.synchronize()

    }

    get isEdited() : boolean
    {
        return this._isEdited
    }

    public setNotEdited()
    {
        this._isEdited = false
    }

    public onDoubleClick() 
    {
        this._isEdited = true
    }

}