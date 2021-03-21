import TagResource from "~/src/Css/TagResource"
import HtmlAttr from "../HtmlAttr"

export default class SrcAttr extends HtmlAttr implements TagResource
{
    public static NAME = 'src-attr'
    public static DEFAULT_ATTR = 'src'

    file: File
    protected _resource: string = ''
    protected _resourceUrl: string = ''
    
    constructor(value, owner)
    {
        super('src', value, owner)
    }

    get resource()
    {
        return this._resource
    }
    
    set resource(arg)
    {
        if (!arg) {
            this.setValue(this.resourceUrl)
        } else {
            this.setValue(arg)

        }
        this._resource = arg
    }

    get resourceUrl()
    {
        return this._resourceUrl
    }
    
    set resourceUrl(arg)
    {
        this.setValue(arg)
        if (!this.resource) {
        }
        this._resourceUrl = arg
    }

    setKey(arg: string)
    {
        this._key = arg
    }

    getId(): any {
        return this._owner.getUUID()
    }
    getResourceFile(): File {
        return this.file
    }
    
    getResource(): string {
        return this.resource
    }
    setResource(val: string) {
        this.resource = val
    }
    
    getResourceUrl(): string {
        return String(this.resourceUrl)
    }
    setResourceUrl(val: string) {
        this.resourceUrl = val
    }
}