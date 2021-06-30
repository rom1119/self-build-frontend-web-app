import TagResource from "~/src/Css/TagResource"
import HtmlAttr from "../HtmlAttr"

export default class SrcAttr extends HtmlAttr implements TagResource
{
    public static NAME = 'src-attr'
    public static DEFAULT_ATTR = 'src'

    file: File = null
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
        if (!this.resource) {
        }
        if (!arg) {
            this.setValue(this.resource)
            this._resourceUrl = null
        } else {
            this.setValue(arg)
            this._resourceUrl = arg

        }
    }

    set value(arg: string)
    {
        this._resourceUrl = arg
        this.setValue(arg)
    }

    get value(): string
    {
        return this._value
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
        return this.resourceUrl
    }
    setResourceUrl(val: string) {
        this.resourceUrl = val
    }
}