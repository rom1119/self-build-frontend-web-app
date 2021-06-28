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
        console.log('synchronize', this);
        
        if (this.synchronizer) {
            console.log('synchronize IF', this);
            this.synchronizer.synchronize()
        }
    }

    public setProjectId(id: string)
    {
        this.projectId = id
        for (const child of this.children) {
            if (child instanceof HtmlNode) {

                child.setProjectId(id)
            }
        }
    }

    public appendChild(node: HtmlNode)
    {
        this.children.push(node)
        if (this.api) {
            this.api.appendChild(node)
        }
        
        this.synchronize()

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

    // public getSynchronizer()
    // {
    //     return this.synchronizer
    // }

}