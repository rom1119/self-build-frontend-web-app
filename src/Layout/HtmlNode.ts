import LayoutEl from '../LayoutEl';
import ApiService from '../Api/ApiService';
import HtmlTagSynchronizer from '../Synchronizer/Impl/HtmlTagSynchronizer';
export default class HtmlNode extends LayoutEl
{
    protected _isEdited = false
    projectId: string

    protected synchronizer: HtmlTagSynchronizer
    api: ApiService

    public setApi(api: ApiService)
    {
        this.api = api
        this.synchronizer = new HtmlTagSynchronizer(this, api)
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }

    public setProjectId(id: string)
    {
        this.projectId = id
        
    }

    public appendChild(node: HtmlNode)
    {
        this.children.push(node)
        this.api.appendChild(node)
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